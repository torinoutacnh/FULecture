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
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { getLecturerGroupById } from 'redux/LecturerGroups/api';
import { TLecturerGroup } from 'types/LecturerGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from './form';
import LoadingAsyncButton from './LoadingAsyncButton/LoadingAsyncButton';

type Props = DialogProps & {
  LecturerGroupId?: number | null;
  onAdd?: (data: TLecturerGroup) => Promise<any>;
  onEdit?: (data: TLecturerGroup) => Promise<any>;
  onClose: () => any;
};

const defaultData = {
  LecturerGroupId: 0,
  code: '',
  name: '',
  email: ''
};

const LecturerGroupModal: React.FC<Props> = ({ open, LecturerGroupId, onClose, onAdd, onEdit }) => {
  const isUpdate = !!LecturerGroupId;

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Vui lòng nhập Code'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
    name: Yup.string().required('Vui lòng nhập Tên')
  });

  const form = useForm<TLecturerGroup>({
    resolver: yupResolver(validationSchema)
  });

  const { loading, run, data } = useRequest(() => getLecturerGroupById(LecturerGroupId!), {
    manual: true,
    refreshDeps: [LecturerGroupId],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (LecturerGroupId) {
      run();
    } else {
      form.reset(defaultData);
    }
  }, [LecturerGroupId, run]);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const submitHandler = (values: TLecturerGroup) =>
    (isUpdate ? onEdit!(values) : onAdd!(values)).finally(() => {
      if (onClose) {
        onClose();
      }
    });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        {isUpdate ? 'Cập Nhật thông tin LecturerGroup' : 'Thêm LecturerGroup'}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormProvider {...form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputField fullWidth required name="code" label="LecturerGroup Id" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField fullWidth required name="name" label="Department Id" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField fullWidth required name="email" label="Semester Id" />
              </Grid>
            </Grid>
          </FormProvider>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Hủy
        </Button>
        <LoadingAsyncButton variant="contained" onClick={form.handleSubmit(submitHandler)}>
          {isUpdate ? 'Cập Nhật' : 'Tạo'}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default LecturerGroupModal;
