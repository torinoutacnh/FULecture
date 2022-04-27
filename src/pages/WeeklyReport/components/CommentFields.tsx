import { Card, Grid, Stack, TextField, Typography, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';
import { CardTitle } from 'pages/Products/components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useRequest } from 'ahooks';
import { getLecturerById } from 'redux/lecturers/api';
import { editWeeklyReport, getWeeklyReports, editComment } from 'redux/WeeklyReport/api';
import { useSnackbar } from 'notistack5';
import { get } from 'lodash';
import { InputField } from 'components/form';
import { TWeeklyReport } from '../../../types/WeeklyReport';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';

function CommentFields({ currentReport }: any) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState(null);
  const [commentNumber, setCommentNumber] = useState<number>(1);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = () =>
    editComment(currentReport?.id, user?.email, `${commentValue!}`)
      .then(() => {
        enqueueSnackbar(`Message sent!`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], err);
        console.log(err);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Mentors Comment</Typography>
      </CardTitle>
      <Stack sx={{ mt: 2 }} display="flex" direction="column" justifyContent="space-evenly">
        <Grid sx={{ mb: 2 }}>
          <TextField
            required
            fullWidth
            multiline
            rows={3}
            label="Mentor Comment"
            onChange={(event) => setCommentValue(event.target.value)}
          />
        </Grid>

        <LoadingAsyncButton style={{ width: '160px' }} onClick={onSubmit} variant="contained">
          Submit
        </LoadingAsyncButton>
      </Stack>
    </Card>
  );
}

export default CommentFields;
