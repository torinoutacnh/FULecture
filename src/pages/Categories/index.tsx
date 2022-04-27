/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Container, Stack, Typography } from '@material-ui/core';
import CategoryModal from 'components/CategoryModal';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack5';
import { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory, getCategories } from 'redux/category/api';
import { TCategory } from 'types/category';
import { TTableColumn } from 'types/table';

const CategoryListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);

  const columns: TTableColumn<TCategory>[] = [
    {
      title: translate('categories.table.cateName'),
      dataIndex: 'cate_name',
      fixed: 'left'
    },
    {
      title: translate('categories.table.cateNameEn'),
      dataIndex: 'cate_name_eng',
      fixed: 'left'
    },
    {
      title: translate('categories.table.position'),
      dataIndex: 'position'
    }
  ];

  const addCategoryHander = (values: TCategory) =>
    addCategoy(values)
      .then(() =>
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        })
      )
      .then(() => setUpdateCateId(null))
      .then(tableRef.current?.reload)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const editCategoryHander = (values: TCategory) =>
    editCategory(updateCateId!, values)
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const deleteCategoryHander = () =>
    deleteCategoyById(currentDeleteItem?.cate_id!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page title="Dashboard: Danh mục | Sale Reso">
      <CategoryModal
        open={formModal}
        cate_id={updateCateId}
        onClose={() => setFormModal(false)}
        onAdd={addCategoryHander}
        onEdit={editCategoryHander}
      />
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteCategoryHander}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.cate_name}</strong>
          </>
        }
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('categories.list')}
          </Typography>
          <Button
            onClick={() => {
              setFormModal(true);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('categories.addBtn')}
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
              ref={tableRef}
              onEdit={(cate: TCategory) => {
                setUpdateCateId(cate.cate_id);
                setFormModal(true);
              }}
              onDelete={(cate: TCategory) => setCurrentDeleteItem(cate)}
              rowKey="cate_id"
              getData={getCategories}
              columns={columns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default CategoryListPage;
