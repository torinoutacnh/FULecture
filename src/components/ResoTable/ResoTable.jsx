/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import React, { useCallback } from 'react';

import {
  Checkbox,
  CircularProgress,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Box,
  useMediaQuery,
  Stack,
  Divider,
  Tooltip,
  Radio
} from '@material-ui/core';
import get from 'lodash/get';
import { useAntdTable } from 'ahooks';
import { makeStyles, withStyles } from '@material-ui/styles';
import Icon from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trashIcon from '@iconify/icons-eva/trash-outline';
import editIcon from '@iconify/icons-eva/edit-outline';
import EmptyContent from 'components/EmptyContent';
import { useSnackbar } from 'notistack5';

import { getCellValue } from './utils';

const StickyLeftTableCell = withStyles((theme) => ({
  head: {
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    minWidth: '50px',
    left: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal,
    backgroundColor: theme.palette.primary.main
  }
}))(TableCell);

const StickyRightTableCell = withStyles((theme) => ({
  head: {
    // color: theme.palette.common.white,
    right: 0,
    position: 'sticky',
    zIndex: theme.zIndex.modal
  },
  body: {
    minWidth: '50px',
    right: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  }
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left'
  },
  actionColumn: {
    minWidth: '70px',
    width: '70px',
    justifyContent: 'flex-end'
  },
  stickyLeft: {
    width: '60px',
    position: 'sticky',
    left: (props) => props.left ?? '0'
    // borderRight: `1px solid ${theme.palette.grey[400]}`
  },
  stickyRight: {
    textAlign: 'right',
    width: '60px',
    position: 'sticky',
    right: (props) => props.right ?? '0'
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  },
  body: {}
}));

const ResoTable = (
  {
    columns = [],
    dataSource = null,
    pagination = true,
    filters = null,
    onEdit = null,
    onDelete = null,
    rowKey = 'id',
    checkboxSelection = false,
    onChangeSelection = () => null,
    scroll = null,
    showAction = true,
    disabledSelections = [],
    ...props
  },
  ref = null
) => {
  const { getData } = props || {};
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [_selectedIds, setSelectedIds] = React.useState(checkboxSelection?.selection ?? []);
  const [_anchorEl, setAnchorEl] = React.useState(null);
  const [_openMenu, setOpenMenu] = React.useState(null);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const openEditMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeEditMenu = () => {
    setAnchorEl(null);
  };

  const {
    tableProps,
    search,
    loading,
    data,
    pagination: { changeCurrent, changePageSize }
  } = useAntdTable(
    (params) => {
      if (dataSource) return Promise.resolve(dataSource);
      return getData({
        ...params.filters,
        ...filters,
        page: params.current,
        limit: params.pageSize
      });
    },
    {
      defaultPageSize: 10,
      defaultParams: [{ current: 1, pageSize: 10 }],
      formatResult: (res) => ({
        total: dataSource ? dataSource.length : res.data.count,
        list: dataSource ?? res.data?.result ?? [],
        success: true
      }),
      // onError: (error) =>
      //   enqueueSnackbar(get(error, 'message', 'Some thing wrong'), {
      //     variant: 'error'
      //   }),
      refreshDeps: [dataSource, filters]
    }
  );
  const { current, pageSize, total } = tableProps?.pagination ?? {};

  React.useImperativeHandle(ref, () => ({
    reload: () => search?.submit()
  }));

  React.useEffect(() => {
    if (typeof onChangeSelection === 'function') {
      // TH default selection chua co trong list data
      const selectionData = data?.list.filter((d) => _selectedIds.includes(d[rowKey]));
      // data
      onChangeSelection(_selectedIds, selectionData);
    }
  }, [_selectedIds, onChangeSelection, data?.list, rowKey]);

  const handleEdit = useCallback(
    (data) => {
      if (typeof onEdit === 'function') {
        onEdit(data);
      }
      closeEditMenu();
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (data) => {
      if (typeof onDelete === 'function') {
        onDelete(data);
      }
      closeEditMenu();
    },
    [onDelete]
  );

  const onSelectAllClick = React.useCallback(
    (e) => {
      if (e.target.checked) {
        const updatedIds = [..._selectedIds];
        data?.list?.forEach((d) => {
          if (!_selectedIds.includes(d[rowKey])) {
            updatedIds.push(d[rowKey]);
          }
        });
        setSelectedIds(updatedIds);
      } else {
        setSelectedIds([]);
      }
    },
    [_selectedIds, data?.list, rowKey]
  );

  const handleClick = React.useCallback(
    (event, name) => {
      const selectedIndex = _selectedIds.indexOf(name);
      let newSelected = [];

      if (checkboxSelection?.type === 'radio') {
        if (selectedIndex === -1) {
          newSelected = [name];
        } else {
          newSelected = [];
        }
      } else if (selectedIndex === -1) {
        newSelected = newSelected.concat(_selectedIds, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(_selectedIds.slice(1));
      } else if (selectedIndex === _selectedIds.length - 1) {
        newSelected = newSelected.concat(_selectedIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          _selectedIds.slice(0, selectedIndex),
          _selectedIds.slice(selectedIndex + 1)
        );
      }

      setSelectedIds(newSelected);
    },
    [_selectedIds, checkboxSelection?.type]
  );

  const tableHeader = React.useMemo(() => {
    const headers = [...columns];

    const tableHeaders = [];

    if (checkboxSelection) {
      const checkAllCurrentData = data?.list?.every((item) => _selectedIds.includes(item[rowKey]));
      const checkIndeterminateCurrentData =
        _selectedIds.filter((id) => data?.list.some((d) => d[rowKey] === id)).length > 0 &&
        !checkAllCurrentData;
      tableHeaders.push(
        <StickyLeftTableCell className={classes.stickyLeft} padding="checkbox">
          {checkboxSelection?.type === 'checkbox' && (
            <Checkbox
              indeterminate={checkIndeterminateCurrentData}
              checked={data?.list?.length > 0 && checkAllCurrentData}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          )}
        </StickyLeftTableCell>
      );
    }

    headers.forEach((header, index) => {
      const CellComp = TableCell;
      tableHeaders.push(
        <CellComp
          className={[classes.root, header.fixed === 'right' ? classes.stickyRight : ''].join(' ')}
          key={`header_${index}`}
          align={header.alignRight ? 'right' : 'left'}
          sx={{ left: checkboxSelection ? '64px' : 0 }}
        >
          <TableSortLabel hideSortIcon>
            <Typography variant="body1" noWrap>
              {getCellValue(header.title, null, header)}
            </Typography>
          </TableSortLabel>
        </CellComp>
      );
    });

    if (showAction) {
      tableHeaders.push(
        <StickyRightTableCell
          className={[classes.root, classes.actionColumn].join(' ')}
          key="column-action"
        >
          <TableSortLabel hideSortIcon>
            <Typography variant="body2" noWrap>
              Actions
            </Typography>
          </TableSortLabel>
        </StickyRightTableCell>
      );
    }

    return <TableRow>{tableHeaders}</TableRow>;
  }, [
    columns,
    checkboxSelection,
    showAction,
    data?.list,
    _selectedIds,
    classes.stickyLeft,
    classes.root,
    classes.stickyRight,
    classes.actionColumn,
    onSelectAllClick,
    rowKey
  ]);

  const tableBodyContent = React.useMemo(() => {
    if (!data) return;
    const isSelected = (key) => _selectedIds.indexOf(key) !== -1;
    const isDisabled = (key) => disabledSelections.findIndex((value) => value == key) !== -1;

    const body = [...columns];
    const tableBodys = [];
    data?.list.forEach((data, idx) => {
      const bodyRow = body.map((column, index) => {
        const CellComp = TableCell;

        let cell;

        if (typeof column.render === 'function') {
          cell = column.render(get(data, column.dataIndex, '-'), data) ?? '-';
        } else {
          cell = (
            <Typography variant="subtitle2" noWrap>
              {column.dataIndex === 'index' ? idx + 1 : get(data, column.dataIndex, '-')}
            </Typography>
          );
        }

        return (
          <CellComp
            className={[
              index === 0 ? classes.stickyLeft : classes.body,
              column.fixed === 'right' && classes.stickyRight
            ].join(' ')}
            left={checkboxSelection ? '64px' : 0}
            key={`${column.title}-${data[rowKey]}`}
          >
            {cell}
          </CellComp>
        );
      });

      if (checkboxSelection) {
        const isItemSelected = isSelected(data[rowKey]);
        const disabled = isDisabled(data[rowKey]);
        bodyRow.unshift(
          <TableCell className={classes.stickyLeft} padding="checkbox">
            {checkboxSelection?.type === 'checkbox' ? (
              <Checkbox
                disabled={disabled}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': data[rowKey] }}
              />
            ) : (
              <Radio
                disabled={disabled}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': data[rowKey] }}
              />
            )}
          </TableCell>
        );
      }

      if (showAction) {
        const ActionCell = mdUp ? (
          <StickyRightTableCell>
            <Stack direction="row" justifyContent="flex-end">
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(data)} sx={{ color: 'red' }}>
                  <Icon icon={trashIcon} />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Edit">
                <IconButton onClick={() => handleEdit(data)}>
                  <Icon icon={editIcon} />
                </IconButton>
              </Tooltip>
            </Stack>
          </StickyRightTableCell>
        ) : (
          <StickyRightTableCell key={`edit-cell-${data[rowKey]}`}>
            <IconButton
              onClick={(e) => {
                openEditMenu(e);
                setOpenMenu(data[rowKey]);
              }}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
            >
              <Icon icon={moreVerticalFill} />
            </IconButton>
            <Menu
              anchorEl={_anchorEl}
              MenuListProps={{
                'aria-labelledby': 'edit-menu'
              }}
              onClose={(e) => {
                closeEditMenu(e);
                setOpenMenu(null);
              }}
              open={data[rowKey] === _openMenu}
              key={`menu-edit-${data[rowKey]}`}
              id={`menu-edit-${data[rowKey]}`}
            >
              <MenuItem onClick={() => handleDelete(data)} sx={{ color: 'red' }}>
                <ListItemIcon>
                  <Icon icon={trashIcon} />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleEdit(data)}>
                <ListItemIcon>
                  <Icon icon={editIcon} />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
            </Menu>
          </StickyRightTableCell>
        );

        bodyRow.push(ActionCell);
      }

      tableBodys.push(
        <TableRow
          onClick={(event) => checkboxSelection && handleClick(event, data[rowKey])}
          role="checkbox"
        >
          {bodyRow}
        </TableRow>
      );
    });
    return tableBodys;
  }, [
    data,
    columns,
    _selectedIds,
    disabledSelections,
    checkboxSelection,
    showAction,
    classes.stickyLeft,
    classes.body,
    classes.stickyRight,
    rowKey,
    mdUp,
    _anchorEl,
    _openMenu,
    handleDelete,
    handleEdit,
    handleClick
  ]);

  return (
    <Container style={{ padding: 0 }}>
      <TableContainer sx={{ maxHeight: scroll?.y, maxWidth: scroll?.x }}>
        <Table stickyHeader>
          <TableHead>{tableHeader}</TableHead>

          <TableBody>
            {loading ? (
              <TableRow style={{ height: '150px' }}>
                <CircularProgress
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                  }}
                />
              </TableRow>
            ) : (
              tableBodyContent
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading && !data?.list?.length && (
        <Box width="100%">
          <EmptyContent
            title="No records found!"
            sx={{
              width: '100%'
            }}
          />
        </Box>
      )}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          {...{ rowsPerPage: pageSize, count: total, page: current - 1 }}
          onPageChange={(_, page) => changeCurrent(page + 1)}
          onRowsPerPageChange={(e) => changePageSize(e.target.value)}
        />
      )}
    </Container>
  );
};

export default React.forwardRef(ResoTable);
