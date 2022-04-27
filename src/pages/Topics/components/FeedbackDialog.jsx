import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

function FeedbackDialog(props, { currentTopic }) {
  const { title, children, openDialog, setOpenDialog } = props;
  return (
    <Dialog open={openDialog} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="subtitle2">Feedback for this topic</Typography>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default FeedbackDialog;
