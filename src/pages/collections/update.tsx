import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@material-ui/core';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack5';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { updateCollection } from 'redux/collections/api';
import { addProductInMenus } from 'redux/menu/api';
import { TCollection } from 'types/collection';
import CollectionInfoTab from './tabs/CollectionInfoTab';
import ProductInCollectionTab from './tabs/ProductInCollectionTab';

enum TabType {
  COLLECTION_INFO = 'COLLETION_INFO',
  PRODUCT_COLLECTION = 'PRODUCT_COLLECTION'
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

const UpdateCollectionPage = () => {
  const { translate } = useLocales();
  const { state } = useLocation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = React.useState<TabType>(TabType.COLLECTION_INFO);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<Partial<TCollection>>({
    defaultValues: {
      ...state
    }
  });

  const onUpdateCollection = (values: TCollection) =>
    updateCollection(+id, values)
      .then(() =>
        enqueueSnackbar(translate('common.201'), {
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
      value: TabType.COLLECTION_INFO,
      label: translate('collections.createInfo'),
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <CollectionInfoTab onSubmit={form.handleSubmit(onUpdateCollection)} />
    },
    {
      value: TabType.PRODUCT_COLLECTION,
      label: translate('collections.productTab'),
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <ProductInCollectionTab id={id} onSubmit={form.handleSubmit(onUpdateCollection)} />
    }
  ];

  return (
    <FormProvider {...form}>
      <Page title={translate('collections.editTitle')}>
        <Box px={2} mx="auto">
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              {translate('collections.updateTitle')}
            </Typography>
            <Button size="small" color="error" variant="outlined">
              {translate('common.delete')}
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

export default UpdateCollectionPage;
