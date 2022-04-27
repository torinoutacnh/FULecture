/* eslint-disable react/prop-types */
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { useDebounceFn } from 'ahooks';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import DrawerProductForm from 'components/DrawerProductForm/DrawerProductForm';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack5';
import { CardTitle } from 'pages/Products/components/Card';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  addProductInMenus,
  deleteProductInMenu,
  getProductInMenus,
  updateProdInMenuInfo
} from 'redux/menu/api';
import { formatCurrency } from 'utils/utils';
import ProductInMenuDialog from '../components/EditProductDialog';

const ProductInMenuTab = ({ id }) => {
  const [currentCate, setCurrentCate] = React.useState(null);
  const [filters, setFilters] = React.useState(null);
  const ref = React.useRef();

  const run = ref.current?.reload;

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { categories = [] } = useSelector((state) => state.admin);

  const [currentDeleteItem, setCurrentDeleteItem] = React.useState(null);
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [isAddProduct, setIsAddProduct] = React.useState(false);

  const { run: changeProductNameFilter } = useDebounceFn(
    (value) => {
      setFilters((prev) => ({ ...prev, 'product-name': value }));
    },
    {
      wait: 500
    }
  );

  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, 'cat-id': currentCate }));
  }, [currentCate]);

  const addProductToMenuHandler = (datas) =>
    addProductInMenus(+id, datas)
      .then(() =>
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        })
      )
      .then(() => {
        setIsAddProduct(false);
        setCurrentProduct(null);
      })
      .then(run)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const updateProdInMenu = (values) =>
    updateProdInMenuInfo(id, currentProduct.product_id, values)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .then(() => setCurrentProduct(null))
      .then(run)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variantF: 'error'
        });
      });

  const onDelete = () =>
    deleteProductInMenu(id, currentDeleteItem.product_id)
      .then((res) => {
        enqueueSnackbar(`Xóa thành công `, {
          variant: 'success'
        });
      })
      .then(run)
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));

  return (
    <Box flex={1}>
      <ProductInMenuDialog
        updateMode={!isAddProduct}
        open={currentProduct}
        onClose={() => setCurrentProduct(null)}
        data={currentProduct}
        onSubmit={isAddProduct ? addProductToMenuHandler : updateProdInMenu}
      />
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(false)}
        onDelete={onDelete}
        title={
          <>
            {translate('common.confirmDeleteTitle')}{' '}
            <strong>{currentDeleteItem?.product_name}</strong>
          </>
        }
      />

      <Box as={Card} p={2}>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <DrawerProductForm
            onSubmit={(ids, data) => {
              setIsAddProduct(true);
              setCurrentProduct(data[0]);
            }}
            trigger={
              <Button size="small" startIcon={<Icon icon={plusFill} />}>
                Thêm sản phẩm
              </Button>
            }
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 450,
                '& ul': { padding: 0 }
              }}
              component="nav"
              aria-label="select category"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Có {categories.length} Danh mục
                </ListSubheader>
              }
            >
              <ListItemButton
                key="list-button-all"
                selected={currentCate === ''}
                onClick={() => setCurrentCate('')}
              >
                <ListItemText primary="Tất cả" />
              </ListItemButton>
              {categories?.map(({ cate_id, cate_name }) => (
                <ListItemButton
                  key={`list-button-${cate_id}`}
                  selected={currentCate === cate_id}
                  onClick={() => setCurrentCate(cate_id)}
                >
                  <ListItemText primary={cate_name} />
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box mt={2}>
              <Stack justifyContent="space-between" mb={2} direction="row" spacing={2}>
                <TextField
                  onChange={(e) => changeProductNameFilter(e.target.value)}
                  size="small"
                  label="Tên sản phẩm"
                  name="product-name"
                />
              </Stack>

              <ResoTable
                ref={ref}
                filters={filters}
                getData={(params) => getProductInMenus(id, params)}
                rowKey="product_id"
                onEdit={setCurrentProduct}
                onDelete={setCurrentDeleteItem}
                columns={[
                  {
                    title: 'Mã sản phẩm',
                    dataIndex: 'code'
                  },
                  {
                    title: 'Hình ảnh',
                    dataIndex: 'pic_url',
                    render: (src, { product_name }) => (
                      <Avatar
                        alt={product_name}
                        src={src}
                        variant="square"
                        style={{ width: '54px', height: '54px', zIndex: 1 }}
                      />
                    )
                  },
                  {
                    title: 'Tên sản phẩm',
                    dataIndex: 'product_name'
                  },
                  {
                    title: 'Giá',
                    dataIndex: 'price1',
                    render: (value) => <Typography>{formatCurrency(value)}</Typography>
                  },
                  {
                    title: 'Danh mục',
                    dataIndex: 'cate_name',
                    render: (cate) => <Chip label={cate} />
                  },
                  {
                    title: 'Cố định giá',
                    dataIndex: 'is_fixed_price',
                    render: (isFixed) => (
                      <Label color={isFixed ? 'success' : 'default'}>
                        {isFixed ? 'Cố định' : 'Không'}
                      </Label>
                    )
                  }
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductInMenuTab;
