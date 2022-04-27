/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Container, Stack, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack5';
import { CardTitle } from 'pages/Products/components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import storeApi from 'redux/store/api';
import StoreForm from './components/StoreForm';
import { storeSchemaBuilder } from './utils';

const CreateStorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {}
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) =>
    storeApi
      .create(values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <FormProvider {...methods}>
      <Page title="Tạo cửa hàng">
        <Container maxWidth="lg">
          <Box px={2} mx="auto">
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              {translate('pages.stores.addBtn')}
            </Typography>
            <Box display="flex">
              <Card>
                <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>
                <StoreForm />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button onClick={() => navigate(-1)} variant="outlined">
                    {translate('common.cancel')}
                  </Button>
                  <LoadingAsyncButton
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    variant="contained"
                  >
                    {translate('common.save')}
                  </LoadingAsyncButton>
                </Stack>
              </Card>
            </Box>
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default CreateStorePage;
