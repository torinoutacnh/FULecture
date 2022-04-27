import { Card, Grid, Stack, Typography, IconButton, CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { CardTitle } from 'pages/Products/components/Card';

import { useRequest } from 'ahooks';
import { getTeamById } from 'redux/teams/api';

function WeeklyReportListMember({ projectId, teamId }) {
  const {
    data: teamData,
    run,
    loading
  } = useRequest(() => getTeamById(teamId), {
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
      <CardTitle>
        <Typography variant="h6">Team members</Typography>
      </CardTitle>
      <Grid direction="row" display="flex" sx={{ mt: 1 }}>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Stack direction="column" display="flex">
            {teamData?.students?.map((data) => (
              <Grid
                display="flex"
                style={{ margin: '20px' }}
                justifyContent="center"
                value={data.code}
                key={data.code}
              >
                <Card
                  component="span"
                  sx={{ width: 250, p: 2 }}
                  spacing={5}
                  style={{ minHeight: '150px', borderRadius: '26px' }}
                >
                  <Typography sx={{ mt: 1 }} variant="subtitle1">
                    {data?.name}
                  </Typography>
                  <Typography sx={{ mt: 1 }} variant="body1">
                    {data?.code}
                  </Typography>
                  <Typography sx={{ mt: 1 }} variant="body2">
                    {data?.email}
                  </Typography>
                  {data?.tagSkill !== null ? (
                    <Typography
                      sx={{ mt: 0.5 }}
                      style={{ color: 'grey', fontSize: '12px', opacity: '0.9' }}
                    >
                      {data?.tagSkill?.split(';').join('  ')}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ mt: 0.5 }}
                      style={{ color: 'grey', fontSize: '12px', opacity: '0.9' }}
                    >
                      No tag skills
                    </Typography>
                  )}
                  <Grid display="flex" direction="row" justifyContent="space-between">
                    <Grid item>
                      {teamData?.leader?.code === data?.code ? (
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
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Stack>
        )}
      </Grid>
    </Card>
  );
}

export default WeeklyReportListMember;
