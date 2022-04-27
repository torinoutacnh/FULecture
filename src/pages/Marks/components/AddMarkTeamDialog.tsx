import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  InputAdornment,
  Grid
} from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Label from '../../../components/Label';

export default function AddMarkTeamDialog({ open, teamData, onClose, onSubmit }: any) {
  const submitHandler = (values: any) => onSubmit!(values);
  const [percent, setPercent] = useState<Number>(25);

  useEffect(() => {
    if (teamData) {
      setPercent(Number.parseFloat(100 / teamData?.length).toFixed(1));
    }
  }, [teamData]);

  const form = useForm<any>();
  return (
    <FormProvider {...form}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Contribution of team members</DialogTitle>
        <DialogContent>
          {teamData?.map(({ student: { studentId, name } }: any) => (
            <Grid key={studentId} display="flex" direction="column">
              <InputField
                autoFocus
                name={name}
                margin="dense"
                defaultValue={percent}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
                label={name}
                variant="standard"
              />
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingAsyncButton variant="contained" onClick={form.handleSubmit(submitHandler)}>
            Submit
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
