import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Typography, Card, Grid, CircularProgress, Stack } from '@material-ui/core';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';

import { getTeamById } from 'redux/teams/api';
import { PATH_DASHBOARD } from 'routes/paths';

import { TTeam } from '../../../types/Team';

function AssignTeamList({ teamId }: any) {
  const [currentTeam, setCurrentTeam] = useState<TTeam>(null);
  const { data, run, loading } = useRequest(() => getTeamById(teamId!), {
    refreshDeps: [teamId],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });

  useEffect(() => {
    if (teamId) {
      run();
    }
  }, [teamId]);

  useEffect(() => {
    if (data) {
      setCurrentTeam(data);
    }
  }, [data]);

  return (
    <Card sx={{ mt: 2 }}>
      <Grid
        direction="row"
        display="flex"
        style={{
          minHeight: '200px',
          padding: '10px',
          overflow: 'scroll'
        }}
      >
        <Grid direction="column" display="flex">
          <Grid direction="row" display="flex">
            <Grid direction="column" display="flex" xs={9} style={{ minWidth: '140px' }}>
              <Grid direction="row">
                <Typography variant="subtitle1">Assign Team : {currentTeam?.name}</Typography>
              </Grid>
              <Grid direction="row">
                <Typography style={{ fontSize: '12px', color: 'grey', opacity: 0.7 }}>
                  Team currently matched to this topic
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {loading ? (
            <CircularProgress size={30} />
          ) : (
            <>
              {currentTeam != null ? (
                <>
                  <Stack direction="row" display="flex" height="200px" overflow="scroll">
                    {currentTeam?.students?.map((data) => (
                      <Grid
                        display="flex"
                        style={{ margin: '20px' }}
                        justifyContent="center"
                        value={data.code}
                        key={data.code}
                      >
                        <Card
                          style={{
                            borderRadius: '26px'
                          }}
                          component="span"
                          sx={{ width: 250, height: 130, p: 2, boxShadow: 16 }}
                          spacing={5}
                        >
                          <Typography sx={{ mt: 1 }} variant="subtitle1">
                            {data?.name}
                          </Typography>
                          <Typography sx={{ mt: 1 }} variant="body1">
                            {data?.code}
                          </Typography>

                          {currentTeam?.leader?.code === data?.code ? (
                            <Typography
                              sx={{ mt: 1 }}
                              style={{
                                backgroundColor: '#F64E60',
                                color: 'white',
                                textAlign: 'center',
                                width: '76px',
                                height: '26px',
                                borderRadius: '10px'
                              }}
                            >
                              Leader
                            </Typography>
                          ) : (
                            <Typography
                              sx={{ mt: 1 }}
                              style={{
                                backgroundColor: '#19C5BD',
                                color: 'white',
                                textAlign: 'center',
                                width: '76px',
                                height: '26px',
                                borderRadius: '10px'
                              }}
                            >
                              Member
                            </Typography>
                          )}
                        </Card>
                      </Grid>
                    ))}
                  </Stack>
                </>
              ) : (
                <Typography sx={{ mt: 2 }} variant="subtitle1">
                  This topic still wait for matching team!
                </Typography>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
export default AssignTeamList;
