/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Container, IconButton, Stack, Tooltip, Typography } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { getMenus } from 'redux/menu/api';
import { TOrder } from 'types/order';
import OrderDetailDialog from './components/OrderDetailDialog';
import OrderSearchForm from './SearchOrderForm';

const OrderListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const [filters, setFilters] = useState(null);

  const [detailOrder, setDetailOrder] = useState<number | null>(null);

  const orderColumns = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: translate('pages.orders.table.invoice'),
      dataIndex: 'invoiceId'
    },
    {
      title: translate('pages.orders.table.quantity'),
      dataIndex: 'quantity'
    },
    {
      title: translate('pages.orders.table.finalAmount'),
      dataIndex: 'finalAmount'
    },
    {
      title: translate('pages.orders.table.paymentType'),
      dataIndex: 'paymentType'
    },
    {
      title: translate('pages.orders.table.orderTime'),
      dataIndex: 'orderTime'
    },
    {
      title: translate('pages.orders.table.orderType'),
      dataIndex: 'orderType'
    },
    {
      title: translate('pages.orders.table.status'),
      dataIndex: 'status'
    },
    {
      title: translate('pages.orders.table.cashier'),
      dataIndex: 'cashierName'
    },
    {
      title: translate('pages.orders.table.detail'),
      fixed: 'right',
      render: (_: any, order: TOrder) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setDetailOrder(1)}>
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      {detailOrder && (
        <OrderDetailDialog
          orderId={detailOrder}
          open={Boolean(detailOrder)}
          onClose={() => setDetailOrder(null)}
        />
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Danh sách đơn hàng
          </Typography>
          <Button
            onClick={() => {
              //   navigate('/menus/create');
            }}
            variant="contained"
            // startIcon={<Icon icon={plusFill} />}
          >
            Xuất file
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <OrderSearchForm />
            <ResoTable
              showAction={false}
              filters={filters}
              rowKey="menu_id"
              getData={(params: any) => getMenus(params)}
              columns={orderColumns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default OrderListPage;
