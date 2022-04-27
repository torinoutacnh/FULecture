import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Topics/components/Card';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router';
import { getEvaluationBoardById } from 'redux/EvaluationBoards/api';

function EvaluationBoardCard() {
  const { id } = useParams();
  const { data, run, loading } = useRequest(() => getEvaluationBoardById(id), {
    refreshDeps: [id],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });
  console.log('data', data);
  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Evaluation Time</Typography>
      </CardTitle>
      <Stack display="flex" direction="column">
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <Grid display="flex" direction="row" sx={{ mt: 1 }}>
              <Grid>
                <Typography variant="body2">Begin: </Typography>
              </Grid>
              <Grid display="flex" direction="column" sx={{ ml: 1 }}>
                <Typography variant="body2">
                  {moment(new Date(data?.startTime)).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="body2">
                  {new Date(data?.startTime).toLocaleTimeString()}
                </Typography>
              </Grid>
            </Grid>
            <Grid display="flex" direction="row">
              <Grid>
                <Typography variant="body2">End: </Typography>
              </Grid>
              <Grid display="flex" direction="column" sx={{ ml: 1 }}>
                <Typography variant="body2">
                  {moment(new Date(data?.endTime)).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="body2">
                  {new Date(data?.endTime).toLocaleTimeString()}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}{' '}
      </Stack>
    </Card>
  );
}

export default EvaluationBoardCard;
