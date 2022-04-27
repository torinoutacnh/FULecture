import { Grid, Typography } from '@material-ui/core';
import { SentimentSatisfiedAltOutlined } from '@material-ui/icons';
import React from 'react';

function FirstFeedback() {
  return (
    <Grid
      direction="row"
      width="94%"
      display="flex"
      style={{
        minHeight: '100px',
        backgroundColor: '#E1F0FF',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        color: '#379AFF',
        marginTop: '20px',
        marginLeft: '3%'
      }}
    >
      <SentimentSatisfiedAltOutlined xs={2} style={{ fontSize: '30' }} />
      <Typography xs={10} sx={{ ml: 1 }} variant="body2">
        Be the first one to feedback for this topic
      </Typography>
    </Grid>
  );
}

export default FirstFeedback;
