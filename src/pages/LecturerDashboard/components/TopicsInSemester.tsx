import { Card, CircularProgress, Grid, Stack, Typography } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';
import { useRequest } from 'ahooks';
import useSemester from 'hooks/useSemester';
import React, { useState } from 'react';
import { getTopics } from 'redux/topic/api';
import { TTopic } from 'types/topic';

function TopicsInSemester() {
  const semester = useSemester();

  const { loading, data: topicsData = [] } = useRequest(
    () => getTopics({ semesterId: semester.semesterId }),
    {
      refreshDeps: [1],
      formatResult: (res) => res.data.result
    }
  );

  return (
    <Card style={{ width: '100%', backgroundColor: '#E1F0FF', color: '#379AFF' }}>
      <Stack display="flex" direction="column">
        <Grid display="flex" direction="row">
          <Assignment />
        </Grid>

        <Grid display="flex" direction="row">
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <Typography variant="body2" sx={{ ml: 1 }}>
              {' '}
              {topicsData?.length}
            </Typography>
          )}
        </Grid>

        <Grid display="flex" direction="row">
          <Typography variant="body2">Total topics in this semester</Typography>
        </Grid>
      </Stack>
    </Card>
  );
}

export default TopicsInSemester;
