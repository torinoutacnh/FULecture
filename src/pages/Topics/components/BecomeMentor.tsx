import React from 'react';
import { Typography, Card, Grid } from '@material-ui/core';

function BecomeMentor() {
  return (
    <Card sx={{ mt: 2 }}>
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
            <Grid direction="column" style={{ minWidth: '140px' }} display="flex">
              <Grid direction="row">
                <Typography variant="h6">Mentors</Typography>
              </Grid>
              <Grid direction="row">
                <Typography style={{ fontSize: '12px', color: 'grey', opacity: 0.7 }}>
                  Mentors of this topic
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid direction="row" display="flex" sx={{ mt: 1 }}>
            <Typography variant="body2">Become a leader mentor of this topic now!</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default BecomeMentor;
