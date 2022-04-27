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

function TopicNeedApprove() {
  const [topicsApprove, setTopicsApprove] = useState<TTopic>();
  const { data: topicsApproveData = [] } = useRequest(() => getTopics({ status: 0 }), {
    refreshDeps: [1],
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    if (topicsApproveData) {
      setTopicsApprove(topicsApproveData);
    }
  }, [topicsApproveData]);
  return (
    <Card sx={{ width: '30%', color: '#A97818', backgroundColor: '#FFF4DE' }}>
      <CardTitle>
        <Typography variant="subtitle1">Topics need approve</Typography>
      </CardTitle>

      <CardContent sx={{ overflow: 'scroll' }}>
        <List sx={{ height: '400px' }}>
          {topicsApprove?.map((data) => (
            <ListItem
              style={{ height: '90px' }}
              key={data}
              divider
              secondaryAction={
                <IconButton href={`${PATH_DASHBOARD.topics.topicDetail}/${data.topicId}`}>
                  <AssignmentTurnedInOutlined style={{ color: '#A97818' }} />
                </IconButton>
              }
            >
              <Grid display="flex" direction="column">
                <Grid display="flex" direction="row">
                  <Grid display="flex" direction="column">
                    <Typography
                      style={{
                        height: '26px',
                        lineHeight: '26px',
                        paddingLeft: '5px',
                        paddingRight: '5px'
                      }}
                      variant="subtitle1"
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        height: '26px',
                        lineHeight: '26px',
                        backgroundColor: '#A97818',
                        color: 'white',
                        borderRadius: '4px',
                        paddingLeft: '5px',
                        paddingRight: '5px'
                      }}
                    >
                      {data?.department?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid display="flex" direction="row">
                  <Typography
                    style={{
                      height: '26px',
                      lineHeight: '26px',
                      paddingLeft: '5px',
                      paddingRight: '5px'
                    }}
                    variant="body2"
                  >
                    {data.lecturerSubmiter.name}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default TopicNeedApprove;
