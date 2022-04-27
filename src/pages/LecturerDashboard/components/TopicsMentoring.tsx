import { Card, CircularProgress, Grid, Stack, Typography } from '@material-ui/core';
import { StarHalf } from '@material-ui/icons';
import { useRequest } from 'ahooks';
import useAuth from 'hooks/useAuth';
import useSemester from 'hooks/useSemester';
import React from 'react';
import { getTopics } from 'redux/topic/api';

function TopicsMentoring() {
  const { user } = useAuth();
  const semester = useSemester();

  const { loading, data: topicsData = [] } = useRequest(
    () => getTopics({ semesterId: semester.semesterId, SubmitterId: user?.zipCode }),
    {
      refreshDeps: [1],
      formatResult: (res) => res.data.result
    }
  );
  return (
    <Card style={{ width: '100%' }}>
      <Stack display="flex" direction="column">
        <Grid display="flex" direction="row">
          <StarHalf style={{ color: '#379AFF' }} />
        </Grid>
        <Grid display="flex" direction="row">
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <Typography variant="subtitle2" sx={{ ml: 1 }}>
              {topicsData?.length}
            </Typography>
          )}
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="body2">Topics you are mentoring</Typography>
        </Grid>
      </Stack>
    </Card>
  );
}

export default TopicsMentoring;
