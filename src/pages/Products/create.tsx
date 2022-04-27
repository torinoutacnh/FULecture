/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography, useTheme } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import { getCbn } from 'utils/utils';
import { ProductTypeEnum } from 'types/product';

import Page from '../../components/Page';

import MiddleForm from './components/MiddleForm';
import RightForm from './components/RightForm';
import { PRODUCT_MASTER } from '../../constraints';
import { createMasterProd } from '../../redux/product/api';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import useDashboard from '../../hooks/useDashboard';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import { DEFAULT_VALUES, UpdateProductForm, validationSchema } from './type';
import { transformProductForm } from './utils';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm<UpdateProductForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      variants: [
        {
          optName: 'size',
          values: []
        }
      ]
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: UpdateProductForm) => {
    console.log(`values`, values);

    return createMasterProd(transformProductForm(values))
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
  };

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Box px={2} mx="auto">
          <Typography px={1} variant="h3" component="h4" gutterBottom>
            Tạo dòng sản phẩm
          </Typography>
          <Box display="flex">
            <MiddleForm />
            <RightForm />
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
