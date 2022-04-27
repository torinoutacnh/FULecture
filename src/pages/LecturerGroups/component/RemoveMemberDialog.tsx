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

function RemoveMemberDialog({ visibleRemoveDialog, closeRemoveMemberDialog }) {
  return (
    <Grid>
      <Dialog
        open={visibleRemoveDialog}
        onClose={closeRemoveMemberDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Force Remove</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove this member?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRemoveMemberDialog}>Close</Button>
          <Button onClick={closeRemoveMemberDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default RemoveMemberDialog;
