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
import { useRequest } from 'ahooks';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { getTeamById } from 'redux/teams/api';
import { TTeam } from 'types/Team';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from './form';
import LoadingAsyncButton from './LoadingAsyncButton/LoadingAsyncButton';

type Props = DialogProps & {
  teamId?: number | null;
  onAdd?: (data: TTeam) => Promise<any>;
  onEdit?: (data: TTeam) => Promise<any>;
  onClose: () => any;
};

const defaultData = {
  teamId: 0,
  code: '',
  name: '',
  email: ''
};

const TeamModal: React.FC<Props> = ({ open, teamId, onClose, onAdd, onEdit }) => {
  const isUpdate = !!teamId;

  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Vui lòng nhập Code'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập Email'),
    name: Yup.string().required('Vui lòng nhập Tên')
  });

  const form = useForm<TTeam>({
    resolver: yupResolver(validationSchema)
  });

  const { loading, run, data } = useRequest(() => getTeamById(teamId!), {
    manual: true,
    refreshDeps: [teamId],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (teamId) {
      run();
    } else {
      form.reset(defaultData);
    }
  }, [teamId, run]);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const submitHandler = (values: TTeam) =>
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
export default TeamModal;
