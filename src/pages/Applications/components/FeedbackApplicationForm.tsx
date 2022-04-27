import { Button, Stack, Grid } from '@material-ui/core';
import { InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { useRequest } from 'ahooks';
import { getLecturerById } from 'redux/lecturers/api';
import moment from 'moment';

import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { addTopicFeedback } from 'redux/feedback/api';
import { TTopicFeedback } from 'types/topicFeedback';
import { useSnackbar } from 'notistack5';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProjects } from 'types/Projects';
import { approveProject, rejectProject } from '../../../redux/Projects/api';

function FeedbackApplicationForm({ currentApplication }: any) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<TProjects>();

  const { data: lecturer, loading } = useRequest(() => getLecturerById(user.email!), {
    refreshDeps: [user.email],
    formatResult: (res) => res.data
  });
  const { handleSubmit } = methods;

  const onApprove = () => {
    const applicationId = currentApplication?.projectId;
    console.log(applicationId);
    return approveProject(applicationId, methods.getValues('comment'))
      .then((res) => {
        enqueueSnackbar(`Approve successfully! `, {
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

  const onReject = () => {
    const applicationId = currentApplication?.projectId;

    return rejectProject(applicationId, methods.getValues('comment'))
      .then((res) => {
        enqueueSnackbar(`Reject successfully! `, {
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
      <Stack direction="column" spacing={2} sx={{ mt: 2 }} style={{ width: '100%' }}>
        <InputField
          sx={{
            width: '100%'
          }}
          id="outlined-multiline-static"
          multiline
          rows={4}
          name="comment"
          variant="outlined"
          label="Comment..."
        />
        <Grid display="flex" direction="row" sx={{ pt: 4 }}>
          <LoadingAsyncButton
            onClick={handleSubmit(onApprove)}
            type="submit"
            style={{ minWidth: '80px' }}
            variant="contained"
          >
            Approve
          </LoadingAsyncButton>
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={handleSubmit(onReject)}
            type="submit"
            style={{ minWidth: '80px' }}
          >
            Reject
          </Button>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

export default FeedbackApplicationForm;
