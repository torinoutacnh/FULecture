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
  DialogActions
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

import { topicColumns } from './config';
import SearchApprovingForm from './SearchApprovingForm';

import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';

export default function TopicApproving() {
  const [filters, setFilters] = useState();

  const navigate = useNavigate();
  const tableRef = useRef();

  const semester = useSemester();

  return (
    <Page title="Dashboard: Approve Topic | FCMS">
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
                        navigate(PATH_DASHBOARD.topics.TopicApproving);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Approve Topics
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row">
                    <Typography variant="h5" gutterBottom>
                      Topics need approve of {semester?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchApprovingForm onChange={setFilters} />
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
      </Container>
    </Page>
  );
}
