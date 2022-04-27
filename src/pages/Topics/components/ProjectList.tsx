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
  CircularProgress
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState, useEffect, useMemo } from 'react';
import { AssignmentTurnedInOutlined } from '@material-ui/icons';
import { getTopics } from 'redux/topic/api';
import { TTopic } from 'types/topic';
import { PATH_DASHBOARD } from 'routes/paths';
import { height } from '@material-ui/system';
import { TProjects } from '../../../types/projects';
import useAuth from '../../../hooks/useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useSemester from '../../../hooks/useSemester';

function ProjectList() {
  const { user } = useAuth();
  const { semester } = useSemester();
  const {
    run,
    loading,
    data: projectsData = []
  } = useRequest(
    () =>
      getTopics({
        HaveProjects: true,
        submitterId: user?.zipCode,
        semesterId: semester?.semesterId
      }),
    {
      manual: true,
      formatResult: (res) => res.data.result
    }
  );

  useMemo(() => {
    if (semester?.semesterId) {
      run();
    }
  }, [semester?.semesterId]);

  return (
    <Card sx={{ width: '100%', background: '#FDE7EA', color: '#B7313F' }}>
      <CardTitle>
        <Typography variant="subtitle1">Topic Applications</Typography>
      </CardTitle>

      <Grid sx={{ overflow: 'scroll' }}>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {projectsData.length !== 0 ? (
              <List sx={{ height: '300px' }}>
                {projectsData?.map((data) => (
                  <ListItem style={{ minHeight: '90px' }} key={data} divider>
                    <Grid
                      display="flex"
                      direction="row"
                      style={{ width: '100%' }}
                      justifyContent="space-between"
                    >
                      <Grid xs={10} display="flex" direction="column">
                        <Grid display="flex" direction="row">
                          <Grid display="flex" direction="column">
                            <Typography
                              variant="subtitle1"
                              style={{ wordWrap: 'break-word', width: '220px' }}
                            >
                              {data?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid display="flex" direction="row">
                          <Typography variant="body2">{data?.code}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        xs={2}
                        display="flex"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          style={{
                            fontSize: '14px',
                            width: '24px',
                            height: '20px',
                            background: '#F54155',
                            borderRadius: '4px',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: '20px'
                          }}
                        >
                          {data.projects?.length}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Grid>
                <Typography variant="subtitle1">You do not have applications now!</Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Card>
  );
}

export default ProjectList;
