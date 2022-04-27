import React, { useRef, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip
} from '@material-ui/core';
import { useNavigate } from 'react-router';
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined, HelpOutline } from '@material-ui/icons';
import Icon from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';
import { deleteTopicById, editTopic, getTopics } from 'redux/topic/api';
import { useSnackbar } from 'notistack5';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useSelector } from 'redux/store';
import useSemester from 'hooks/useSemester';
import { ApplicationColumns } from './config';
import SearchApplicationForm from './SearchApplicationForm';
import ApplicationStatus from './components/ApplicationStatus';
import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';
import { getProjects } from '../../redux/Projects/api';

export default function Applications() {
  const [filters, setFilters] = useState();

  const navigate = useNavigate();
  const tableRef = useRef();

  const { semester } = useSemester();

  return (
    <Page title="Dashboard: Applications | FCMS">
      <Container>
        <Stack
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={4}
          spacing={4}
        >
          <Grid display="column" xs={12}>
            <Grid display="flex" direction="row">
              <Grid direction="column" xs={10}>
                <Grid role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.semester.root);
                      }}
                    >
                      <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Semester
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.root);
                      }}
                    >
                      <DateRangeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      {semester?.name}
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.applications.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Applications
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row" alignItems="center">
                    <Typography variant="h5">Applications of {semester?.name}</Typography>
                    <Tooltip
                      sx={{ ml: 2 }}
                      describeChild
                      title="List applications of student teams applying to join capstone project."
                    >
                      <HelpOutline fontSize="small" />
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchApplicationForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              showAction={false}
              getData={getProjects}
              filters={filters}
              columns={ApplicationColumns}
              rowKey="ProjectId"
            />
          </Stack>
        </Card>
        <Card sx={{ mt: 3 }} style={{ padding: '1em' }}>
          <Stack container dislay="flex" direction="row">
            <Grid xs={6} dislay="flex" direction="column">
              <Grid container alignItems="center">
                <Grid xs={2} item>
                  <ApplicationStatus status={1} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Application is waiting for approving
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ mt: 1 }} container direction="row">
                <Grid xs={2} item>
                  <ApplicationStatus status={2} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Application is canceled by students
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={6} dislay="flex" direction="column">
              <Grid container>
                <Grid xs={2} item>
                  <ApplicationStatus status={3} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Application is approved by mentor
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }} direction="row">
                <Grid xs={2} item>
                  <ApplicationStatus status={4} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Application is rejected by mentor
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
