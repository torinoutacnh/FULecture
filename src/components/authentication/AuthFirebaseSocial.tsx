import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Grid, Button, Divider, Typography } from '@material-ui/core';
// hooks
import { LoadingButton } from '@material-ui/lab';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack5';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const { loginWithGoogle, user, error } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle?.();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error === 'Account is Invalid') {
      enqueueSnackbar(error, {
        variant: 'error'
      });
    }
  }, [error]);

  // const handleLoginFaceBook = async () => {
  //   try {
  //     await loginWithFaceBook?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLoginTwitter = async () => {
  //   try {
  //     await loginWithTwitter?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <LoadingButton
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLoginGoogle}
      >
        <Icon icon={googleFill} style={{ marginRight: 10 }} />

        <span>Login with Google</span>
      </LoadingButton>
    </>
  );
}
