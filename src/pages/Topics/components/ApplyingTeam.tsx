import { Card, Grid, Typography, IconButton, Divider } from '@material-ui/core';
import React from 'react';
import { MoodOutlined, MoodBadOutlined } from '@material-ui/icons';

function ApplyingTeam({ currentApplication }: any) {
  return (
    <Card sx={{ mt: 2 }}>
      <Grid
        direction="column"
        display="flex"
        style={{
          minHeight: '250px',
          padding: '10px',
          maxHeight: '250px'
        }}
      >
        <Grid direction="row">
          <Typography variant="h6">Applying teams</Typography>
        </Grid>
        <Grid direction="row">
          <Typography style={{ fontSize: '12px', color: 'grey', opacity: 0.7 }}>
            Consider approve team to topic
          </Typography>
        </Grid>
        {currentApplication?.length > 0 ? (
          <Grid overflow="scroll">
            {currentApplication?.map((data) => (
              <Grid
                direction="row"
                value={data.ProjectId}
                key={data.ProjectId}
                sx={{ mt: 2 }}
                display="flex"
                style={{ minHeight: '50px' }}
                alignItems="center"
              >
                <Grid direction="column" xs={9}>
                  <Grid direction="row">
                    <Typography variant="body2">{data?.name}</Typography>
                  </Grid>
                  <Grid direction="row" display="flex">
                    <Typography
                      variant="subtitle2"
                      style={{ color: 'grey', opacity: 0.9, fontWeight: 'bold' }}
                    >
                      {data?.team?.code}:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1 }}
                      style={{ color: 'grey', opacity: 0.8 }}
                    >
                      {data?.team?.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid direction="column" sx={{ ml: 2 }} xs={4}>
                  <Grid direction="row">
                    <IconButton
                      style={{
                        borderRadius: '10px',
                        backgroundColor: '#C9F7F5',
                        color: '#19C5BD',
                        width: '55px',
                        height: '36px'
                      }}
                    >
                      <MoodOutlined />
                    </IconButton>
                    <IconButton
                      sx={{ ml: 1 }}
                      style={{
                        borderRadius: '10px',
                        backgroundColor: '#FFE2E5',
                        color: '#F76474',
                        width: '55px',
                        height: '36px'
                      }}
                    >
                      <MoodBadOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ mt: 1 }} variant="subtitle2">
            This topic does not have assigning team now!
          </Typography>
        )}
      </Grid>
    </Card>
  );
}

export default ApplyingTeam;
