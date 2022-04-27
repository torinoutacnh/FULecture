/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack5';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import { getProdById, updateProdById } from '../../redux/product/api';
import MiddleForm from './components/MiddleForm';
import RightForm from './components/RightForm';
import { DEFAULT_VALUES, UpdateProductForm, validationSchema } from './type';
import { transformProductData, transformProductForm } from './utils';

const UpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { data, loading } = useRequest(() => getProdById(id), {
    formatResult: (res) => res.data
  });

  const defaultValues = {
    ...DEFAULT_VALUES,
    ...transformProductData(data)
  };

  const form = useForm<UpdateProductForm>({
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (data) {
      reset({ ...transformProductData(data) });
    }
  }, [data, reset]);

  const onSubmit = (values: UpdateProductForm) =>
    updateProdById(id, transformProductForm(values))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius={1}
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider<UpdateProductForm> {...form}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: 'white',
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
        <Box px={4}>
          <Typography variant="h3" component="h2" gutterBottom>
            Cập nhật sản phẩm
          </Typography>
        </Box>
        <Box display="flex" px={2}>
          <MiddleForm updateMode={false} />
          <RightForm />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateProduct;
