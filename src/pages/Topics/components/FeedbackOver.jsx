import { Grid, Typography } from '@material-ui/core';
import { BlockRounded } from '@material-ui/icons';
import React from 'react';

function FeedbackOver() {
  return (
    <Grid
      direction="row"
      width="94%"
      display="flex"
      style={{
        minHeight: '100px',
        backgroundColor: '#FFF4DE',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        color: '#FFAC29',
        marginTop: '20px',
        marginLeft: '3%'
      }}
    >
      <BlockRounded xs={2} style={{ fontSize: '30' }} />
      <Typography xs={10} sx={{ ml: 1 }} variant="body2">
        Feedback session is over!
      </Typography>
    </Grid>
  );
}

export default FeedbackOver;
