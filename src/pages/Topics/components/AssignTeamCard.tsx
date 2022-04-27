import React, { useState, useEffect } from 'react';
import { useRequest } from 'ahooks';
import { Typography, Card, Grid, CircularProgress } from '@material-ui/core';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';

import { getTeamById } from 'redux/teams/api';
import { PATH_DASHBOARD } from 'routes/paths';

import { TTeam } from '../../../types/Team';

function AssignTeamCard({ teamId }: any) {
  const { data, run, loading } = useRequest(() => getTeamById(teamId!), {
    refreshDeps: [teamId],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (teamId) {
      run();
    }
  }, [teamId]);

  return (
    <Card style={{ marginLeft: '20px' }} sx={{ mt: 2 }}>
      <Grid
        direction="row"
        display="flex"
        style={{
          minHeight: '200px',
          padding: '10px'
        }}
      >
        <Grid direction="column" display="flex">
          <Grid direction="row" display="flex">
            <Grid direction="column" display="flex" xs={9} style={{ minWidth: '140px' }}>
              <Grid direction="row">
                <Typography variant="h6">Assign Team</Typography>
              </Grid>
              <Grid sx={{ mt: 0.5 }} direction="row" style={{ maxWidth: '130px' }}>
                <Typography style={{ fontSize: '12px', color: 'grey', opacity: 0.7 }}>
                  Team currently matched to this topic
                </Typography>
              </Grid>
            </Grid>
            {/* {data != null ? (
              <Grid direction="column" display="flex" xs={3}>
                <LoadingAsyncButton
                  href={`${PATH_DASHBOARD.teams.teamDetail}/${data?.teamId}`}
                  style={{
                    minWidth: '80px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#E1F0FF',
                    color: '#3498FF',
                    textAlign: 'center',
                    lineHeight: '36px',
                    fontSize: '12px'
                  }}
                >
                  More
                </LoadingAsyncButton>
              </Grid>
            ) : (
              ''
            )} */}
          </Grid>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              {data != null ? (
                <>
                  <Grid direction="row" display="flex" sx={{ mt: 2 }} alignItems="center">
                    <Grid direction="column" xs={3} display="flex" justifyContent="center">
                      <Typography variant="body2">Team: </Typography>
                    </Grid>
                    <Grid
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      xs={9}
                      sx={{ ml: 2 }}
                    >
                      <Typography variant="subtitle2">{data?.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid direction="row" display="flex" sx={{ mt: 2 }} alignItems="center">
                    <Grid direction="column" xs={3} display="flex" justifyContent="center">
                      <Typography variant="body2">Code: </Typography>
                    </Grid>
                    <Grid
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      xs={8}
                      sx={{ ml: 2 }}
                    >
                      <Typography variant="body2">{data?.code}</Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid direction="row" display="flex" sx={{ mt: 2 }}>
                    <Typography variant="body2">Members: </Typography>

                    <Grid
                      direction="column"
                      display="flex"
                      justifyContent="center"
                      xs={9}
                      sx={{ ml: 2 }}
                    >
                      {data?.students?.map(({ studentId, name }: any) => (
                        <Typography key={studentId} variant="subtitle2">
                          {name}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid> */}
                </>
              ) : (
                <Typography sx={{ mt: 2 }} variant="body2">
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
export default AssignTeamCard;
