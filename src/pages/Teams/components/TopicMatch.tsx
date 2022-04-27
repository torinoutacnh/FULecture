import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { MoreHoriz } from '@material-ui/icons';

function TopicMatch() {
  return (
    <Grid
      direction="row"
      display="flex"
      style={{
        minHeight: '90px',
        backgroundColor: '#FFF4DE',
        color: '#FFAC29',
        width: '96%',
        padding: '20px',
        borderRadius: '10px',
        marginLeft: '2%',
        alignItems: 'center'
      }}
    >
      <MoreHoriz />
      <Typography sx={{ ml: 1 }} variant="body1">
        Awaiting for topic match
      </Typography>
    </Grid>
  );
}

export default TopicMatch;
