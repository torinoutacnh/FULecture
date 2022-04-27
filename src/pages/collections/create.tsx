import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  MenuItem,
  Slider,
  Stack,
  Typography
} from '@material-ui/core';
import { InputField, SelectField, UploadImageField } from 'components/form';
import * as yup from 'yup';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useLocales from 'hooks/useLocales';
import { TFunction } from 'i18next';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useNavigate } from 'react-router';
import useDashboard from 'hooks/useDashboard';
import { get, unionBy } from 'lodash';

import Page from 'components/Page';
import Icon from '@iconify/react';
import searchIcon from '@iconify/icons-eva/search-outline';
import EmptyContent from 'components/EmptyContent';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import { TCollection } from 'types/collection';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { createCollection } from 'redux/collections/api';
import { useSnackbar } from 'notistack5';

import AddProductTable from './AddProductTable';

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const collectionSchema = (translate: TFunction) =>
  yup.object({
    name: yup.string().required(translate('common.required', { name: 'Bộ sưu tập' }))
  });

const CreateCollectionPage = () => {
  const { translate } = useLocales();
  const form = useForm<Partial<TCollection>>({
    defaultValues: {
      name: '',
      banner_url: '',
      description: ''
    },
    resolver: yupResolver(collectionSchema(translate))
  });
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { stores } = useSelector((state: RootState) => state.admin);

  const {
    handleSubmit,
    formState: { isDirty, errors }
  } = form;

  const onSubmit = (values: any) =>
    createCollection(values)
      .then(() =>
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const [products, setProducts] = useState<any[]>([]);

  const handleRemoveProd = (prodId: number) => {
    setProducts((prev) => prev.filter(({ product_id }) => product_id !== prodId));
  };

  const handleAddProd = (ids: number[], selectedProds: any[]) => {
    const allSelectedProds = unionBy(products, selectedProds, 'product_id');
    const updateSelectedProds = allSelectedProds.filter(({ product_id }: { product_id: number }) =>
      ids.includes(product_id)
    );
    setProducts(updateSelectedProds);
  };

  return (
    <Page title="Tạo bộ sưu tập">
      <Box px={4}>
        <Typography variant="h3" component="h2" gutterBottom>
          {translate('collections.addBtn')}
        </Typography>
      </Box>
      <Box px={2}>
        <FormProvider {...form}>
          <DashboardNavLayout
            onOpenSidebar={() => setNavOpen(true)}
            sx={{
              backgroundColor: 'white',
              boxShadow: 1
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">
                {translate('common.cancel')}
              </Button>
              <LoadingAsyncButton
                disabled={!isDirty}
                onClick={handleSubmit(onSubmit, console.log)}
                type="submit"
                variant="contained"
              >
                {translate('common.save')}
              </LoadingAsyncButton>
            </Stack>
          </DashboardNavLayout>
          <Stack spacing={2}>
            <Card>
              <CardTitle mb={2} variant="subtitle1">
                {translate('collections.createInfo')}
              </CardTitle>
              <Grid spacing={2} container>
                <Grid item xs={4}>
                  <UploadImageField.Avatar
                    label={translate('collections.table.banner_url')}
                    name="banner_url"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        size="small"
                        fullWidth
                        name="name"
                        label={translate('collections.table.collectionName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        size="small"
                        fullWidth
                        name="name_eng"
                        label={translate('collections.table.collectionNameEn')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <SelectField
                        fullWidth
                        label={translate('collections.table.store')}
                        size="small"
                        name="store_id"
                      >
                        {stores?.map(({ id, name }: any) => (
                          <MenuItem value={Number(id)} key={`cate_select_${id}`}>
                            {name}
                          </MenuItem>
                        ))}
                      </SelectField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        size="small"
                        rows={4}
                        multiline
                        fullWidth
                        name="description"
                        label={translate('collections.table.description')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom>
                        {translate('collections.table.position')}
                      </Typography>
                      <Box px={4}>
                        <Controller
                          name="position"
                          render={({ field }) => (
                            <Slider
                              sx={{ width: '100%' }}
                              aria-label="Custom marks"
                              defaultValue={0}
                              step={1}
                              valueLabelDisplay="auto"
                              marks={marks}
                              {...field}
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
            <Card>
              <CardTitle mb={2} variant="subtitle1">
                {translate('collections.productInCollection')}
              </CardTitle>
              <Stack spacing={1} direction="row">
                <InputField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon={searchIcon} />
                      </InputAdornment>
                    )
                  }}
                  name="search"
                  label="Tìm sản phẩm"
                  fullWidth
                  size="small"
                />
                <ModalProductForm
                  selected={products?.map(({ product_id }) => product_id)}
                  onSubmit={handleAddProd}
                  trigger={<Button variant="outlined">{translate('common.create')}</Button>}
                />
              </Stack>
              <Box mt={2}>
                {!products?.length ? (
                  <EmptyContent title="Chưa có sản phẩm nào được thêm" />
                ) : (
                  <AddProductTable onRemove={handleRemoveProd} data={products} />
                )}
              </Box>
            </Card>
          </Stack>
        </FormProvider>
      </Box>
    </Page>
  );
};

export default CreateCollectionPage;
