import {
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { MoreVertOutlined, HighlightOffOutlined, EmojiFlagsOutlined } from '@material-ui/icons';
import RemoveMemberDialog from './RemoveMemberDialog';
import MakeLeaderDialog from './MakeLeaderDialog';

const options = ['bye bye', 'Atria'];

const ITEM_HEIGHT = 48;
function MoreVertMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [visibleRemoveDialog, setVisibleRemoveDialog] = useState(false);

  const [visibleMakeLeaderDialog, setMakeLeaderDialog] = useState(false);

  const openRemoveMemberDialog = () => {
    setVisibleRemoveDialog(true);
  };
  const closeRemoveMemberDialog = () => {
    setVisibleRemoveDialog(false);
  };
  const openMakeLeaderDialog = () => {
    setMakeLeaderDialog(true);
  };
  const closeMakeLeaderDialog = () => {
    setMakeLeaderDialog(false);
  };

  return (
    <Grid>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch'
          }
        }}
      >
        <MenuList>
          <MenuItem onClick={() => openMakeLeaderDialog()}>
            <ListItemIcon>
              <EmojiFlagsOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Make Leader</Typography>
          </MenuItem>
          <MenuItem onClick={() => openRemoveMemberDialog()}>
            <ListItemIcon>
              <HighlightOffOutlined fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Force Remove</Typography>
          </MenuItem>
          <RemoveMemberDialog
            visibleRemoveDialog={visibleRemoveDialog}
            closeRemoveMemberDialog={closeRemoveMemberDialog}
          />
          <MakeLeaderDialog
            visibleMakeLeaderDialog={visibleMakeLeaderDialog}
            closeMakeLeaderDialog={closeMakeLeaderDialog}
          />
        </MenuList>
      </Menu>
    </Grid>
  );
}

export default MoreVertMenu;
