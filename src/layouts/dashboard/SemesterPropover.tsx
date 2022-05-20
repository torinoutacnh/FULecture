import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useRef, useState, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@material-ui/core';
import navigation2Outline from '@iconify/icons-eva/navigation-2-outline';
import { useRequest } from 'ahooks';
import { getSemesters } from 'redux/semester/api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'redux/store';
import { getSemesterState } from 'redux/slices/semester';
// routes
import { DateRangeOutlined } from '@material-ui/icons';

import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { MIconButton } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import { SemesterState } from '../../types/semester';
import { DEFAULT_VALUES } from '../../pages/Products/type';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSemester from '../../hooks/useSemester';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: PATH_DASHBOARD.user.profile
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.user.account
  }
];

// ----------------------------------------------------------------------

export default function SemesterPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { semester, chooseSemester } = useSemester();
  const { run, data: semestersData = [] } = useRequest(() => getSemesters({ page: 1, limit: 10 }), {
    formatResult: (res) => res.data.result
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const choseSemester = (semester: any) => {
    chooseSemester(semester);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout?.();
      if (isMountedRef.current) {
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };
  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleOpen}
        variant="outlined"
        startIcon={<DateRangeOutlined />}
      >
        {semester != null ? semester.name : 'Choose Semester'}
      </Button>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 180 }}
      >
        {semestersData?.map((semester: any) => (
          <MenuItem
            key={semester.semesterId}
            onClick={() => choseSemester(semester)}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {semester.name}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
