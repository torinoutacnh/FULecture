import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
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
import React, { useState, useEffect, useMemo } from 'react';
import { AddCommentOutlined, AssignmentTurnedInOutlined } from '@material-ui/icons';
import { getTopics } from 'redux/topic/api';
import { TTopic } from 'types/topic';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from '../../../hooks/useSemester';

function TopicNeedFeedback() {
  const [topicsFeedback, setTopicsFeedback] = useState<TTopic>();
  const { semester } = useSemester();
  const {
    run,
    loading,
    data: topicsFeedbackData = []
  } = useRequest(() => getTopics({ status: 1, semesterId: semester.semesterId }), {
    refreshDeps: [1],
    formatResult: (res) => res.data.result
  });

  useMemo(() => {
    if (semester?.semesterId) {
      run();
    }
  }, [semester?.semesterId]);

  return (
    <Card sx={{ background: '#F1EAFE', color: '#2D1A54' }} style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Approve Topic</Typography>
      </CardTitle>
      {topicsFeedbackData?.length !== 0 ? (
        <Grid sx={{ overflow: 'scroll' }}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <List sx={{ height: '400px' }}>
              {topicsFeedbackData?.map((data) => (
                <ListItem
                  style={{ minHeight: '90px', color: '#2D1A54' }}
                  key={data}
                  divider
                  secondaryAction={
                    <IconButton href={`${PATH_DASHBOARD.topics.topicDetail}/${data.topicId}`}>
                      <AddCommentOutlined style={{ color: '#2D1A54' }} />
                    </IconButton>
                  }
                >
                  <Grid display="flex" direction="column">
                    <Grid display="flex" direction="row">
                      <Grid display="flex" direction="column">
                        <Typography
                          noWrap={false}
                          style={{
                            minHeight: '26px',
                            width: '190px',
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            wordWrap: 'break-word'
                          }}
                          variant="subtitle1"
                        >
                          {/* {data?.name} */}
                          asdasv
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            maxWidth: '160px',
                            minHeight: '26px',
                            lineHeight: '26px',
                            backgroundColor: '#8950FC',
                            color: 'white',
                            borderRadius: '4px',
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            wordWrap: 'break-word'
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
                          paddingRight: '5px',
                          maxWidth: '150px',
                          wordWrap: 'break-word'
                        }}
                        variant="body2"
                      >
                        {data?.lecturerSubmiter?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      ) : (
        <Typography variant="subtitle2">No topic to aprrove now!</Typography>
      )}
    </Card>
  );
}

export default TopicNeedFeedback;
