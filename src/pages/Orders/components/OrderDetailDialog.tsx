import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  styled,
  Typography
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { getOrderDetail } from 'redux/order/api';
import Icon from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { fDate } from 'utils/formatTime';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import { formatCurrency } from 'utils/utils';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  orderId: number;
};

const OrderSummaryItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  '& > h6': {
    width: '40%',
    marginRight: '1rem'
  },
  '& > p': {
    width: '60%',
    textAlign: 'left'
  }
});

const OrderDetailDialog: React.FC<Props> = ({ open, onClose, orderId }) => {
  const { translate } = useLocales();

  const { data, loading } = useRequest(() => getOrderDetail(orderId), {
    refreshDeps: [orderId]
  });

  const orderItemColumns = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price: any) => <Typography>{formatCurrency(price)}</Typography>
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Giảm giá',
      dataIndex: 'quantity'
    },
    {
      title: 'Thanh toán',
      dataIndex: 'quantity'
    }
  ];

  if (loading) return <CircularProgress />;

  const buildSummaryItem = (title: any, value: any) => (
    <OrderSummaryItem item xs={12} sm={6}>
      <Typography variant="subtitle1">{title}:</Typography>
      <Typography variant="body2">{value}</Typography>
    </OrderSummaryItem>
  );
  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Chi tiết đơn hàng</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <Icon icon={closeFill} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4} rowSpacing={2}>
          {buildSummaryItem(translate('pages.orders.table.invoice'), 'Nguyen Van A')}
          {buildSummaryItem(
            translate('pages.orders.table.address'),
            '854 Tạ Quang Bửu P5 Q8 TPHCM'
          )}
          {buildSummaryItem(translate('pages.orders.table.totalAmount'), formatCurrency(700000))}
          {buildSummaryItem(translate('pages.orders.table.custPhone'), '01231231232')}
          {buildSummaryItem(translate('pages.orders.table.discount'), `-${formatCurrency(20000)}`)}
          {buildSummaryItem(translate('pages.orders.table.cashier'), `Ngan`)}
          {buildSummaryItem(
            translate('pages.orders.table.finalAmount'),
            `${formatCurrency(680000)}`
          )}
          {buildSummaryItem(translate('pages.orders.table.store'), `Cua hang Quan 1`)}
          {buildSummaryItem(translate('pages.orders.table.note'), `Da rieng`)}
          {buildSummaryItem(translate('pages.orders.table.orderTime'), `${fDate(new Date())}`)}
          {buildSummaryItem(
            translate('pages.orders.table.orderType'),
            <Label color="success">Giao hàng</Label>
          )}
        </Grid>

        <Box mt={2}>
          <ResoTable columns={orderItemColumns} dataSource={[]} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
