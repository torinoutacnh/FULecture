import { Avatar, Card, Grid, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { TTeam } from 'types/Team';

const Members = ({ currentTeam }) => {
  console.log('crteam----', currentTeam);
  return (
    <Card
      style={{
        width: '96%',
        margin: '2%',
        boxShadow: '20',
        height: '300px',
        padding: '20px'
      }}
    >
      <Grid display="flex" direction="row">
        <Grid display="flex" direction="column">
          <Grid display="flex" direction="row">
            <Typography variant="h5">Members</Typography>
          </Grid>
          <Grid display="flex" direction="row">
            <Typography style={{ fontSize: '12px', color: 'grey', opacity: '0.7' }}>
              Student in this team
            </Typography>
          </Grid>
        </Grid>
      </Grid>
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
    </Card>
  );
};

export default Members;
