/* eslint-disable camelcase */
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Chip, Container, Stack, Typography } from '@material-ui/core';
// components
import { useNavigate } from 'react-router-dom';

import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { PATH_DASHBOARD } from 'routes/paths';
import Label from 'components/Label';
import useLocales from 'hooks/useLocales';
import { getStores } from 'redux/store/api';
import StoreSearchForm from './components/StoreSearchForm';

const StoreListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const [filters, setFilters] = useState(null);

  const columns = [
    {
      title: translate('pages.stores.table.storeCode'),
      dataIndex: 'store_code'
    },
    {
      title: translate('pages.stores.table.name'),
      dataIndex: 'name'
    },
    {
      title: translate('pages.stores.table.shortName'),
      dataIndex: 'short_name'
    },
    {
      title: translate('pages.stores.table.openTime'),
      dataIndex: 'open_time'
    },
    {
      title: translate('pages.stores.table.closeTime'),
      dataIndex: 'close_time'
    },
    {
      title: translate('pages.stores.table.isAvailable'),
      dataIndex: 'is_available',
      render: (isAvai) => (
        <Label color={isAvai ? 'success' : 'default'}>
          {isAvai ? translate('common.available') : translate('common.notAvailable')}
        </Label>
      )
    }
  ];

  return (
    <Page title={`Dashboard ${translate('pages.stores.listTitle')} | Reso Sales`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('pages.stores.listTitle')}
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.stores.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('pages.stores.addBtn')}
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <StoreSearchForm onChange={setFilters} />
            <ResoTable
              filters={filters}
              rowKey="id"
              onEdit={(stores) =>
                navigate(`${PATH_DASHBOARD.stores.root}/${stores.id}`, { state: stores })
              }
              getData={getStores}
              columns={columns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default StoreListPage;
