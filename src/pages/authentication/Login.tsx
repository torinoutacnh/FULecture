import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@material-ui/core';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import AuthWithSocial from '../../components/authentication/AuthFirebaseSocial';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  backgroundImage: `url('/static/illustrations/login-banner.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover'
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  backgroundColor: 'white'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography
            variant="h3"
            sx={{ px: 8, mt: 10, textAlign: 'center', color: '#FE8E00' }}
            style={{ fontSize: 28 }}
          >
            FPT Capstone Management System
          </Typography>
          <img
            width="400px"
            height="400px"
            src="/static/illustrations/round-logo.png"
            alt="login"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mb: 5 }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              padding: 50,
              borderRadius: 15,
              boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
              justifyContent: 'space-arround'
            }}
          >
            <Box sx={{ flexGrow: 1, mb: 4 }} style={{}}>
              <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Login to F-CMS
              </Typography>
            </Box>

            {/* <Tooltip title={capitalCase(method)}>
              <Box
                component="img"
                src={`/static/auth/ic_${method}.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip> */}

            <AuthWithSocial />
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
