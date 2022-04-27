import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState, useEffect } from 'react';
import { AssignmentTurnedInOutlined } from '@material-ui/icons';
import { getTopics } from 'redux/topic/api';
import { TTopic } from 'types/topic';
import { PATH_DASHBOARD } from 'routes/paths';

function TopicNeedEvaluate() {
  const [topicsEvaluate, setTopicsEvaluate] = useState<TTopic>();
  const { data: topicsEvaluateData = [] } = useRequest(
    () => getTopics({ HaveTopicEvaluates: false }),
    {
      refreshDeps: [1],
      formatResult: (res) => res.data.result
    }
  );

  useEffect(() => {
    if (topicsEvaluateData) {
      setTopicsEvaluate(topicsEvaluateData);
    }
  }, [topicsEvaluateData]);
  return (
    <Card sx={{ width: '30%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Topics need Evaluate</Typography>
      </CardTitle>

      <CardContent sx={{ overflow: 'scroll' }}>
        <List sx={{ height: '400px' }}>
          {topicsEvaluate?.map((data) => (
            <ListItem
              style={{ height: '100px' }}
              key={data}
              divider
              secondaryAction={
                <IconButton href={`${PATH_DASHBOARD.topics.topicDetail}/${data.topicId}`}>
                  <AssignmentTurnedInOutlined />
                </IconButton>
              }
            >
              <Grid display="flex" direction="column">
                <Grid display="flex" direction="row">
                  <Grid display="flex" direction="column">
                    <Typography variant="subtitle1">Topic name: {data.name}</Typography>
                    <Typography variant="body2">Topic code: {data.code}</Typography>
                  </Grid>
                </Grid>
                <Grid display="flex" direction="row">
                  <Typography variant="body2">Lecturer: {data.lecturerSubmiter.name}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopicNeedEvaluate;
