import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { CardTitle } from 'pages/Products/components/Card';
import React from 'react';
import moment from 'moment';
import { height } from '@material-ui/system';
import useSemester from 'hooks/useSemester';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@material-ui/lab';

function FlowTimeLine() {
  const semester = useSemester();

  return (
    <Card style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Flow Timeline</Typography>
        <Typography style={{ fontSize: '12px', color: 'grey', opacity: '0.7' }}>
          Keep track of {semester?.name}
        </Typography>
      </CardTitle>
      <Grid style={{ height: '300px', overflow: 'scroll' }}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {moment(new Date(semester?.assingningDate)).format('DD MMMM, YYYY')}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={new Date() > new Date(semester?.assingningDate) ? 'primary' : 'grey'}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent variant="subtitle1" sx={{ color: '#004175' }}>
              Assigning phase
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent variant="subtitle1" sx={{ color: '#004175' }}>
              In-progress phase
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={new Date() > new Date(semester?.inProgressDate) ? 'primary' : 'grey'}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              {moment(new Date(semester?.inProgressDate)).format('DD MMMM, YYYY')}
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {moment(new Date(semester?.finishedDate)).format('DD MMMM, YYYY')}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={new Date() > new Date(semester?.finishedDate) ? 'primary' : 'grey'}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent variant="subtitle1" sx={{ color: '#004175' }}>
              Finished
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    </Card>
  );
}

export default FlowTimeLine;
