import { Button, Stack } from '@material-ui/core';
import { InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { useRequest } from 'ahooks';
import { getLecturerById } from 'redux/lecturers/api';
import moment from 'moment';

import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addTopicFeedback } from 'redux/feedback/api';
import { TTopicFeedback } from 'types/topicFeedback';
import { useSnackbar } from 'notistack5';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from '../../../hooks/useSemester';
import { getLecturerGroups } from '../../../redux/LecturerGroups/api';

function FeedbackForm({ currentTopic, handleClose, setOpen }: any) {
  const { user } = useAuth();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<TTopicFeedback>();

  const { data: lecturer, loading } = useRequest(() => getLecturerById(user?.email), {
    refreshDeps: [user?.email],
    formatResult: (res) => res.data
  });

  const { handleSubmit } = methods;

  const onApprove = (values: TTopicFeedback) => {
    values.approverId = lecturer?.lecturerId;
    values.topicId = currentTopic?.topicId;
    values.createdAt = new Date();
    values.isApprove = true;

    return addTopicFeedback(values)
      .then((res) => {
        enqueueSnackbar(`Review successfully `, {
          variant: 'success'
        });
        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(`Error`, {
          variant: 'error'
        });
      });
  };

  const onReject = (values: TTopicFeedback) => {
    values.approverId = lecturer?.lecturerId;
    values.topicId = currentTopic?.topicId;
    values.createdAt = new Date();
    values.isApprove = false;

    return addTopicFeedback(values)
      .then((res) => {
        enqueueSnackbar(`Review successfully `, {
          variant: 'success'
        });
        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(`Error`, {
          variant: 'error'
        });
      });
  };
  return (
    <FormProvider {...methods}>
      <InputField
        sx={{
          width: '100%'
        }}
        id="outlined-multiline-static"
        multiline
        rows={6}
        name="content"
        variant="outlined"
        label="Review here..."
      />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {/* <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
          Save
        </LoadingAsyncButton> */}
        <LoadingAsyncButton
          style={{ width: '90px' }}
          onClick={handleSubmit(onApprove)}
          type="submit"
          variant="contained"
        >
          Approve
        </LoadingAsyncButton>
        <LoadingAsyncButton
          style={{ width: '90px' }}
          color="error"
          onClick={handleSubmit(onReject)}
          type="submit"
          variant="contained"
        >
          Reject
        </LoadingAsyncButton>
        <Button variant="outlined" onClick={() => setOpen(false)} style={{ width: '90px' }}>
          Close
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default FeedbackForm;
