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
import { getMenus } from 'redux/menu/api';
import { renderDayMenu } from 'utils/utils';
import { PATH_DASHBOARD } from 'routes/paths';
import Label from 'components/Label';
import MenuSearchForm from './components/MenuSearchForm';

export const menuColumns = [
  {
    title: 'Tên thực đơn',
    dataIndex: 'menu_name',
    fixed: 'left'
  }
];

const MenusPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(null);
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Thực đơn
          </Typography>
          <Button
            onClick={() => {
              navigate('/menus/create');
            }}
            variant="contained"
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm Thực đơn
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <MenuSearchForm onChange={setFilters} />
            <ResoTable
              filters={filters}
              rowKey="menu_id"
              onEdit={(menu) =>
                navigate(`${PATH_DASHBOARD.menus.root}/${menu.menu_id}`, { state: menu })
              }
              getData={getMenus}
              columns={menuColumns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default MenusPage;
