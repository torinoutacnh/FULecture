/* eslint-disable camelcase */
import React, { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Stack,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { PATH_DASHBOARD } from 'routes/paths';
import Page from 'components/Page';
// components
import { useNavigate } from 'react-router-dom';
import ResoTable from 'components/ResoTable/ResoTable';
//
import { productColumns } from './config';
import SeachProductForm from './SeachProductForm';
import { deleteProdById, getAllProduct } from '../../redux/product/api';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [filters, setFilters] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [currentDeleteItem, setCurrentDeleteItem] = useState(null);

  const editProuct = ({ product_id }) => navigate(`/${PATH_DASHBOARD.products.root}/${product_id}`);

  const onDelete = () =>
    deleteProdById(currentDeleteItem.product_id)
      .then((res) => {
        enqueueSnackbar('Xóa thành công', {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại', {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Dialog
        open={currentDeleteItem}
        onClose={() => setCurrentDeleteItem(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận xóa <strong>{currentDeleteItem?.product_name}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xác nhận xóa sản phẩm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCurrentDeleteItem(null)} variant="text" color="secondary">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
            Xác nhận
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Dòng sản phẩm
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.products.newProduct);
            }}
            variant="contained"
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm sản phẩm
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SeachProductForm onChange={setFilters} />

            <ResoTable
              pagination
              getData={getAllProduct}
              onEdit={editProuct}
              onDelete={setCurrentDeleteItem}
              filters={filters}
              columns={productColumns}
              rowKey="product_id"
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
