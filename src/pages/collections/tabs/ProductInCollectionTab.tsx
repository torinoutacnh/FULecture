/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import DrawerProductForm from 'components/DrawerProductForm/DrawerProductForm';
import EmptyContent from 'components/EmptyContent';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack5';
import React, { useState } from 'react';
import { productCollectionApi } from 'redux/collections/api';
import { TProductBase } from 'types/product';
import { formatCurrency } from 'utils/utils';

const ProductCard = ({ product, onEdit, onDelete, translate }: any) => (
  <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <CardMedia
      sx={{ height: '151px', width: '100%', objectFit: 'cover' }}
      image={`https://minimals.cc/static/mock-images/products/product_${
        product.product_name.length % 12
      }.jpg`}
      title="Live from space album cover"
    />
    <CardContent sx={{ flex: '1 0 auto', px: 1, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" pr={2} noWrap>
          {product.product_name}
        </Typography>
        <Typography component="span" variant="body1">
          {formatCurrency(product.price1)}
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: 'flex-end', py: 2 }}>
      <Button onClick={onDelete} size="small" color="error">
        {translate('common.delete')}
      </Button>
    </CardActions>
  </Card>
);

const DEFAULT_SIZE = 10;

// eslint-disable-next-line react/prop-types
const ProductInCollectionTab = ({ id, onAddProduct }: any) => {
  const api = productCollectionApi(id);
  const { translate } = useLocales();
  const [prodNameFilter, setProdNameFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const {
    data: response,
    loading,
    run
  } = useRequest(() => api.get({ 'product-name': prodNameFilter, page, size: DEFAULT_SIZE }), {
    formatResult: (res) => res.data,
    refreshDeps: [prodNameFilter, page],
    debounceInterval: 500
  });

  const data = response?.data;
  const totalPage = response?.metadata ? Math.floor(response?.metadata.total / DEFAULT_SIZE) : 1;

  const [currentDeleteItem, setCurrentDeleteItem] = React.useState<any>(null);
  const [currentProduct, setCurrentProduct] = React.useState<TProductBase | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = () =>
    api
      .delete(Number(currentDeleteItem!.product_id))
      .then((res) => {
        enqueueSnackbar(translate('common.201'), {
          variant: 'success'
        });
      })
      .then(run)
      .catch((err) => {
        enqueueSnackbar(translate('common.error'), {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));

  const addProductToCollection = (data: any) =>
    api
      .create(data)
      .then(() =>
        enqueueSnackbar('common.201', {
          variant: 'success'
        })
      )
      .then(run)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Box flex={1}>
      {currentDeleteItem && (
        <Dialog
          open={!!currentDeleteItem}
          onClose={() => setCurrentDeleteItem(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {translate('common.confirmDeleteTitle')}{' '}
            <strong>{currentDeleteItem.product_name}</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {translate('common.confirmDeleteTitle')}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCurrentDeleteItem(null)} variant="text" color="secondary">
              {translate('common.cancel')}
            </Button>
            <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
              {translate('common.update')}
            </LoadingAsyncButton>
          </DialogActions>
        </Dialog>
      )}
      <Box component={Card} p={2}>
        <Stack justifyContent="space-between" mb={2} direction="row" spacing={2}>
          <TextField
            onChange={(e) => setProdNameFilter(e.target.value)}
            size="small"
            label="Tên sản phẩm"
            name="product-name"
          />
          <DrawerProductForm
            disabledSelections={data?.map((prod) => prod.product_id)}
            onSubmit={(ids: any, data: any) => addProductToCollection(ids)}
            trigger={<Button variant="contained">{translate('common.addMore')}</Button>}
          />
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid py={2} container spacing={3}>
              {data && data?.length !== 0 ? (
                data?.map((pro: any) => (
                  <Grid key={pro.product_id} item xs={4} md={3}>
                    <ProductCard
                      onEdit={() => setCurrentProduct(pro)}
                      onDelete={() => setCurrentDeleteItem(pro)}
                      product={pro}
                      translate={translate}
                    />
                  </Grid>
                ))
              ) : (
                <EmptyContent title="Chưa có sản phẩm nào" />
              )}
            </Grid>
            <Box textAlign="right" py={2}>
              <Pagination
                page={page}
                onChange={(_, page) => setPage(page)}
                showFirstButton
                showLastButton
                count={totalPage}
                color="primary"
                sx={{
                  '& .MuiPagination-ul': {
                    justifyContent: 'flex-end'
                  }
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductInCollectionTab;
