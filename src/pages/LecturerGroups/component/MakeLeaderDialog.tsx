import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core';
import React from 'react';

function MakeLeaderDialog({ visibleMakeLeaderDialog, closeMakeLeaderDialog }) {
  return (
    <Grid>
      <Dialog
        open={visibleMakeLeaderDialog}
        onClose={closeMakeLeaderDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Make Leader</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Make this member to be leader of LecturerGroup?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMakeLeaderDialog}>Close</Button>
          <Button onClick={closeMakeLeaderDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MakeLeaderDialog;
