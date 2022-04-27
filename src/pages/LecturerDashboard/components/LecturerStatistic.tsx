import { Card, CircularProgress, Grid, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import useAuth from 'hooks/useAuth';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useEffect } from 'react';
import { getLecturerDepartments } from 'redux/LecturerDepartment/api';
import { getTopics } from 'redux/topic/api';
import { getSemesters } from '../../Topics/components/SelectedListApi';

function LecturerStatistic() {
  const { user } = useAuth();

  const { loading: departmentLoading, data: departmentData = [] } = useRequest(
    () => getLecturerDepartments({ lectureId: user?.zipCode }),
    {
      formatResult: (res) => res.data.result
    }
  );

  const { loading: semesterLoading, data: semesterData = [] } = useRequest(() => getSemesters(), {
    formatResult: (res) => res.data.result
  });

  const { loading: topicLoading, data: topicsData = [] } = useRequest(
    () => getTopics({ SubmitterId: user?.zipCode }),
    {
      formatResult: (res) => res.data.result
    }
  );

  return (
    <Card style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Lecturer statistic</Typography>
      </CardTitle>
      <Stack display="flex" direction="column">
        {topicLoading || semesterLoading || departmentLoading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Typography variant="body1">Semesters: {semesterData?.length}</Typography>
            <Typography variant="body1">Deparments: {departmentData?.length}</Typography>
            <Typography variant="body1">Total Projects: {topicsData?.length}</Typography>
          </>
        )}
      </Stack>
    </Card>
  );
}

export default LecturerStatistic;
