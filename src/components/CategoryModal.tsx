import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Slider
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useRequest } from 'ahooks';
import useLocales from 'hooks/useLocales';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { getCategoyById } from 'redux/category/api';
import { TCategory } from 'types/category';
import { InputField } from './form';
import LoadingAsyncButton from './LoadingAsyncButton/LoadingAsyncButton';

type Props = DialogProps & {
  cate_id?: number | null;
  onAdd?: (data: TCategory) => Promise<any>;
  onEdit?: (data: TCategory) => Promise<any>;
  onClose: () => any;
};

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

const CategoryModal: React.FC<Props> = ({ open, cate_id, onClose, onAdd, onEdit }) => {
  const { translate } = useLocales();
  const isUpdate = !!cate_id;

  const form = useForm<TCategory>();

  const { loading, run, data } = useRequest(() => getCategoyById(cate_id!), {
    manual: true,
    refreshDeps: [cate_id],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (cate_id) {
      run();
    }
  }, [cate_id, run]);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const submitHandler = (values: TCategory) =>
    (isUpdate ? onEdit!(values) : onAdd!(values)).finally(() => {
      if (onClose) {
        onClose();
      }
    });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        {isUpdate ? translate('categories.editTitle') : translate('categories.addTitle')}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormProvider {...form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  name="cate_name"
                  label={translate('categories.table.cateName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  name="cate_name_eng"
                  label={translate('categories.table.cateNameEn')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
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
          </FormProvider>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton variant="contained" onClick={form.handleSubmit(submitHandler)}>
          {isUpdate ? translate('common.update') : translate('common.create')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
