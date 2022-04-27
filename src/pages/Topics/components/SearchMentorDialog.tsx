import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  TextField,
  Typography
} from '@material-ui/core';
import { AddOutlined, Search, SearchOutlined } from '@material-ui/icons';
import { LoadingButton } from '@material-ui/lab';
import { useRequest } from 'ahooks';
import { AutoCompleteField, InputField } from 'components/form';
import { useSnackbar } from 'notistack5';
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addLecturerGroupMember } from 'redux/LecturerGroupMember/api';
import { getLecturers, searchLecturer } from 'redux/lecturers/api';
import { TLecturerGroupMember } from 'types/LecturerGroupMember';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useAuth from '../../../hooks/useAuth';

function SearchMentorDialog({ visibleAddMentorDialog, closeAddMentorDialog, mentorGroupId }) {
  const { user } = useAuth();
  const { run, data: lecturerData = [] } = useRequest(
    () => getLecturers({ mySelfId: user!.zipCode }),
    {
      formatResult: (res) => res.data.result
    }
  );
  const { enqueueSnackbar } = useSnackbar();

  const [mentorAddId, setMentorAddId] = useState<any>();

  useEffect(() => {
    run();
  }, [user]);

  useEffect(() => {
    if (lecturerData.length !== 0) {
      run();
    }
  }, [lecturerData.length]);

  const methods = useForm<TLecturerGroupMember>();
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    values.lecturerId = values.lecturer.lecturerId;
    values.lecturerGroupId = mentorGroupId;
    values.isLeader = false;
    values.weight = 0;
    console.log('values', values);

    return addLecturerGroupMember(values)
      .then((res) => {
        enqueueSnackbar(`Add mentor successfully! `, {
          variant: 'success'
        });
        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      });
  };
  return (
    <FormProvider {...methods}>
      <Dialog fullWidth maxWidth="sm" open={visibleAddMentorDialog} onClose={closeAddMentorDialog}>
        <DialogTitle>
          <Typography variant="subtitle1">Add mentors to this topic</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <AutoCompleteField
                name="lecturer"
                size="medium"
                options={lecturerData}
                fullWidth
                getOptionLabel={(option: any) => `${option.name} (${option.email})`}
                defaultValue={null}
                label="Co-Mentor"
                placeholder="Add Co-Mentor"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeAddMentorDialog}>
            Close
          </Button>
          <LoadingAsyncButton variant="contained" onClick={methods.handleSubmit(onSubmit)}>
            Add
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

export default SearchMentorDialog;
