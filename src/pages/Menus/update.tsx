import { Box, Button, Stack, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { Icon } from '@iconify/react';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack5';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundStore from '@iconify/icons-ic/round-store';

import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { addProductInMenus, updateMenuInfo } from 'redux/menu/api';
import Page from 'components/Page';
import { convertDateToStr, convertStrToDate } from 'utils/utils';
import MenuInfoTab from './tabs/MenuInfoTab';
import ProductInMenuTab from './tabs/ProductInMenuTab';
import StoreApplyTab from './tabs/StoreApplyTab';

enum TabType {
  MENU_INFO = 'MENUINFO',
  STORE_APPLY = 'STORE_APPLY',
  PRODUCT_MENU = 'PRODUCT_MENU'
}

function TabPanel(props: any) {
  const { children, hidden, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 2 }}>{children}</Box>
    </div>
  );
}

const UpdateMenuPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = React.useState<TabType>(TabType.MENU_INFO);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      ...state,
      from: convertStrToDate(get(state, ['time_from_to', '0'], null), 'HH:mm').toDate(),
      to: convertStrToDate(get(state, ['time_from_to', '1'], null), 'HH:mm').toDate()
    }
  });

  const onUpdateMenu = (updateMenu: any) =>
    updateMenuInfo(+id, updateMenu)
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

  const MENU_TABS = [
    {
      value: TabType.MENU_INFO,
      label: 'Thông tin chung',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Stack direction="column" mt={2} spacing={2}>
          <MenuInfoTab onSubmit={form.handleSubmit(onUpdateMenu)} />
          <ProductInMenuTab id={id} />
        </Stack>
      )
    },
    {
      value: TabType.STORE_APPLY,
      label: 'Cửa hàng áp dụng',
      icon: <Icon icon={roundStore} width={20} height={20} />,
      component: <StoreApplyTab />
    }
  ];

  return (
    <FormProvider {...form}>
      <Page title="Cập nhật thực đơn">
        <Box px={2} mx="auto">
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              Cập nhật thực đơn
            </Typography>
            <Button size="small" color="error" variant="outlined">
              Xóa
            </Button>
          </Stack>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {MENU_TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
          <Box mt={2}>
            {MENU_TABS.map((tab, index) => {
              const isMatched = tab.value === currentTab;
              return (
                <TabPanel key={tab.value} index={index} hidden={!isMatched}>
                  {tab.component}
                </TabPanel>
              );
            })}
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateMenuPage;
