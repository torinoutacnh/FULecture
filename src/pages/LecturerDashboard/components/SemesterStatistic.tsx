import { Card, Grid, Stack, Typography } from '@material-ui/core';
import useSemester from 'hooks/useSemester';
import { CardTitle } from 'pages/Products/components/Card';
import moment from 'moment';
import React from 'react';

function SemesterStatistic() {
  const semester = useSemester();
  return (
    <Card style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Semester Statistic</Typography>
      </CardTitle>
      <Stack display="flex" direction="column">
        <Grid display="flex" direction="row">
          <Typography variant="subtitle2">Semester: </Typography>
          <Typography sx={{ ml: 1, color: '#004175' }} variant="subtitle2">
            {semester.name}
          </Typography>
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="subtitle2">Assining: </Typography>
          <Typography sx={{ ml: 1, color: '#004175' }} variant="subtitle2">
            {moment(new Date(semester.assingningDate)).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="subtitle2">In-progress: </Typography>
          <Typography sx={{ ml: 1, color: '#004175' }} variant="subtitle2">
            {moment(new Date(semester.inProgressDate)).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="subtitle2">Finished: </Typography>
          <Typography sx={{ ml: 1, color: '#004175' }} variant="subtitle2">
            {moment(new Date(semester.finishedDate)).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="subtitle2">Max topics: </Typography>
          <Typography sx={{ ml: 1, color: '#004175' }} variant="subtitle2">
            {semester.maxProject}
          </Typography>
        </Grid>
      </Stack>
    </Card>
  );
}

export default SemesterStatistic;
