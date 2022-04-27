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
import {
  HomeOutlined,
  WhatshotOutlined,
  DateRangeOutlined,
  ErrorOutlined,
  HelpOutline
} from '@material-ui/icons';
import Icon from '@iconify/react';

import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';
import { deleteTopicById, editTopic, getTopics } from 'redux/topic/api';
import { useSnackbar } from 'notistack5';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useSelector } from 'redux/store';
import useSemester from 'hooks/useSemester';

import { topicColumns } from '../config';
import SearchTopicForm from '../SearchTopicForm';

import { PATH_DASHBOARD } from '../../../routes/paths';

import Page from '../../../components/Page';
import useAuth from '../../../hooks/useAuth';
import SearchSubmittedForm from '../SearchSubmittedForm';
import TopicProgressLabel from './TopicProgressLabel';

export default function Topics() {
  const [filters, setFilters] = useState();

  const { user } = useAuth();
  const navigate = useNavigate();
  const tableRef = useRef();
  const [isAction, setIsAction] = useState();

  const [currentDeleteItem, setCurrentDeleteItem] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const { semester } = useSemester();

  useEffect(() => {
    if (new Date() > new Date(semester?.inProgressDate)) {
      setIsAction(false);
    } else {
      setIsAction(true);
    }
  }, [semester]);

  const editTopic = ({ topicId }) => navigate(`/${PATH_DASHBOARD.topics.updateTopic}/${topicId}`);

  const onDelete = () => {
    if (currentDeleteItem.status === 1 || currentDeleteItem.status === 2) {
      deleteTopicById(currentDeleteItem.topicId)
        .then(tableRef.current?.reload)
        .then((res) => {
          enqueueSnackbar('Delete successfully!', {
            variant: 'success'
          });
        })
        .catch((err) => {
          enqueueSnackbar('Error!', {
            variant: 'error'
          });
        })
        .finally(() => setCurrentDeleteItem(null));
    } else {
      enqueueSnackbar('Can not delete approved topic!', {
        variant: 'error'
      });
    }
  };
  return (
    <Page title="Dashboard: Topic | FCMS">
      <Dialog
        open={currentDeleteItem}
        onClose={() => setCurrentDeleteItem(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Are you sure?</Typography>
          <Typography variant="body2">You won't be able to revert this!</Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setCurrentDeleteItem(null)} variant="text" color="secondary">
            Cancel
          </Button>
          <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
            Yes, delele it!
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
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
                      Submitted Topics
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row" alignItems="center">
                    <Typography variant="h5">My topics in {semester?.name}</Typography>
                    <Tooltip
                      sx={{ ml: 2 }}
                      describeChild
                      title="List of topics are submitted by lecturer in this semester."
                    >
                      <HelpOutline fontSize="small" />
                    </Tooltip>
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
            <SearchSubmittedForm onChange={setFilters} />
            <ResoTable
              onEdit={editTopic}
              onDelete={setCurrentDeleteItem}
              ref={tableRef}
              pagination
              getData={getTopics}
              filters={filters}
              columns={topicColumns}
              rowKey="topicId"
              showAction={isAction}
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
