import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@material-ui/core';
import React from 'react';
import Icon from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { Card } from 'pages/Products/components/Card';
import SeachProductForm from 'pages/Products/SeachProductForm';
import { productColumns } from 'pages/Products/config';
import { getAllProduct } from 'redux/product/api';
import ResoTable from '../ResoTable/ResoTable';
import LoadingAsyncButton from '../LoadingAsyncButton/LoadingAsyncButton';

const ModalProductForm = ({ trigger, onSubmit, selected = [] }) => {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState(null);

  const [selectedProductIds, setSelectedProductIds] = React.useState(selected);
  const [selectedProducts, setSelectedProduct] = React.useState([]);

  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleSubmit = () =>
    Promise.resolve(onSubmit && onSubmit(selectedProductIds, selectedProducts)).then(() =>
      setOpen(false)
    );

  const handleChangeSelection = React.useCallback((ids, data) => {
    setSelectedProductIds(ids);
    setSelectedProduct(data);
  }, []);

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick })}
      <Dialog anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box display="flex" flexDirection="column" maxHeight="80vh">
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              borderBottom={1}
              borderColor="grey.300"
              textAlign="right"
            >
              <Typography variant="h6">Thêm sản phẩm vào thực đơn</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)}>
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1}>
            <SeachProductForm onChange={setFilters} />
          </Box>
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                checkboxSelection={{
                  selection: selectedProductIds
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="product_id"
                getData={getAllProduct}
                onChangeSelection={handleChangeSelection}
                filters={filters}
                columns={productColumns}
              />
            </Stack>
          </Box>
          <Box
            p={2}
            borderTop={1}
            borderColor="grey.300"
            component={Paper}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">
              Đã chọn <strong>{selectedProductIds.length}</strong> sản phẩm
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <LoadingAsyncButton onClick={handleSubmit} variant="contained">
                Thêm
              </LoadingAsyncButton>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalProductForm;
