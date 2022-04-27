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
  Typography,
  CircularProgress,
  Link
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState, useEffect, useMemo } from 'react';
import { getTopics } from 'redux/topic/api';
import { TTopic } from 'types/topic';
import useAuth from 'hooks/useAuth';
import { PATH_DASHBOARD } from 'routes/paths';

import TopicProgressLabel from './TopicProgressLabel';
import useSemester from '../../../hooks/useSemester';

function TopicProgressList() {
  const { user } = useAuth();

  const { semester } = useSemester();
  const {
    run,
    loading,
    data: ProjectsData = []
  } = useRequest(
    () => getTopics({ semesterId: semester?.semesterId, SubmitterId: user?.zipCode }),
    {
      formatResult: (res) => res.data.result
    }
  );

  useMemo(() => {
    if (semester?.semesterId) {
      run();
    }
  }, [semester?.semesterId]);

  return (
    <Card sx={{ width: '100%', background: 'white' }}>
      <CardTitle>
        <Typography variant="subtitle1">Topic Progress</Typography>
      </CardTitle>

      <Grid sx={{ overflow: 'scroll' }}>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {ProjectsData?.length !== 0 ? (
              <List sx={{ height: '250px  ' }}>
                {ProjectsData?.map((data) => (
                  <ListItem style={{ minHeight: '120px' }} key={data} divider>
                    <Grid
                      display="flex"
                      direction="row"
                      style={{ width: '100%', minHeight: '120px' }}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid xs={9} display="flex" direction="column">
                        <Grid display="flex" direction="row" style={{ width: '100%' }}>
                          <Grid display="flex" direction="column" spacing={2}>
                            <Grid display="flex" direction="row">
                              <Link
                                variant="subtitle1"
                                href={`${PATH_DASHBOARD.topics.topicDetail}/${data?.topicId}`}
                              >
                                <Typography
                                  style={{
                                    minHeight: '26px',
                                    lineHeight: '26px',
                                    paddingLeft: '5px',
                                    paddingRight: '5px',
                                    maxWidth: '240px',
                                    wordWrap: 'break-word',
                                    color: '#004175'
                                  }}
                                  variant="subtitle1"
                                >
                                  {data?.name}
                                </Typography>
                              </Link>
                            </Grid>
                            <Grid display="flex" direction="row" style={{ paddingLeft: '5px' }}>
                              <Typography
                                style={{ color: 'grey', opacity: '0.9', fontSize: '13px' }}
                              >
                                {data?.code}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid xs={3} display="flex" direction="column">
                        <TopicProgressLabel status={data?.status} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="subtitle1">You do not have topics now!</Typography>
            )}
          </>
        )}
      </Grid>
    </Card>
  );
}

export default TopicProgressList;
