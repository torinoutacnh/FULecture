import React, { useRef, useState, useEffect } from 'react';
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
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined } from '@material-ui/icons';
import Icon from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';
import { deleteTopicById, editTopic, getTopics } from 'redux/topic/api';
import { useSnackbar } from 'notistack5';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useSelector } from 'redux/store';

import useSemester from 'hooks/useSemester';
import TopicProgressLabel from './components/TopicProgressLabel';

import { topicColumns } from './config';
import SearchTopicForm from './SearchTopicForm';

import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';

export default function Topics() {
  const [filters, setFilters] = useState();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const tableRef = useRef();

  return (
    <Page title="Dashboard: Topic | FCMS">
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
                        navigate(PATH_DASHBOARD.topics.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Topics
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.topics.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      All Topics
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row">
                    <Typography variant="h5" gutterBottom>
                      Topics of {semester?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {new Date(semester.inProgressDate).getTime() > new Date().getTime() ? (
                <Grid
                  direction="column"
                  xs={2}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <Tooltip describeChild title="Lecturer can only create topic in assigning phase">
                    <Button
                      onClick={() => {
                        navigate(PATH_DASHBOARD.topics.addTopic);
                      }}
                      variant="contained"
                      startIcon={<Icon icon={plusFill} />}
                    >
                      Add Topic
                    </Button>
                  </Tooltip>
                </Grid>
              ) : (
                console.log('date', new Date().getTime())
              )}
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchTopicForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              showAction={false}
              getData={getTopics}
              filters={filters}
              columns={topicColumns}
              rowKey="topicId"
            />
          </Stack>
        </Card>
        <Card sx={{ mt: 3 }} style={{ padding: '1em' }}>
          <Stack container dislay="flex" direction="row">
            <Grid xs={6} dislay="flex" direction="column">
              <Grid container alignItems="center">
                <Grid xs={2} item>
                  <TopicProgressLabel status={1} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Topic is waiting for review and approve
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{ mt: 1 }} container direction="row">
                <Grid xs={2} item>
                  <TopicProgressLabel status={2} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Topic is rejected by approver
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={6} dislay="flex" direction="column">
              <Grid container>
                <Grid xs={2} item>
                  <TopicProgressLabel status={3} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Topic is approved by approver
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1 }} direction="row">
                <Grid xs={2} item>
                  <TopicProgressLabel status={4} />
                </Grid>
                <Grid xs={8} item alignItems="center">
                  <Typography style={{ fontSize: '14px', color: 'grey' }}>
                    : Topic has assigned team and qualified to start
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
