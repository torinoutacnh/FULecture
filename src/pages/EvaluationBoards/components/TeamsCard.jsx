import { Card, CircularProgress, Grid, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Products/components/Card';
import React from 'react';
import { useParams } from 'react-router';
import { getEvaluationBoardById } from 'redux/EvaluationBoards/api';

function TeamsCard() {
  const { id } = useParams();
  const { data, run, loading } = useRequest(() => getEvaluationBoardById(id), {
    refreshDeps: [id],
    formatResult: (res) => res.data
  });

  return (
    <Card sx={{ mt: 4 }}>
      <CardTitle>
        <Typography variant="subtitle1">Evaluation statistic</Typography>
      </CardTitle>
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Stack display="flex" direction="column">
          <Grid display="flex" direction="row" sx={{ mt: 1 }}>
            <Grid>
              <Typography variant="body2">Teams: </Typography>
            </Grid>
            <Grid display="flex" direction="column" sx={{ ml: 2 }}>
              <Typography variant="body2">{data.teams}</Typography>
            </Grid>
          </Grid>
          <Grid display="flex" direction="row">
            <Grid>
              <Typography variant="body2">Councils: </Typography>
            </Grid>
            <Grid display="flex" direction="column" sx={{ ml: 2 }}>
              <Typography variant="body2">{data.councils}</Typography>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Card>
  );
}

export default TeamsCard;
