import { Container, Grid, Stack, Breadcrumbs, Link, Typography, Card } from '@material-ui/core';
import ProjectList from 'pages/Topics/components/ProjectList';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  HomeOutlined,
  WhatshotOutlined,
  DateRangeOutlined,
  Announcement
} from '@material-ui/icons';
import TopicNeedFeedback from 'pages/Topics/components/TopicNeedFeedbacks';
import { TLecturerDepartment } from 'types/lecturerDepartment';
import { useRequest } from 'ahooks';
import { setLocalStorage } from 'utils/utils';

import Page from '../../components/Page';
import FlowTimeLine from './components/FlowTimeLine';
import QuickAction from './components/QuickAction';
import { PATH_DASHBOARD } from '../../routes/paths';
import TopicProgressList from '../Topics/components/TopicProgressList';
import TopicsInSemester from './components/TopicsInSemester';
import TopicsMentoring from './components/TopicsMentoring';
import useAuth from '../../hooks/useAuth';
import { getLecturerDepartments } from '../../redux/LecturerDepartment/api';
import AnnouncementBoard from './components/AnnouncementBoard';
import LecturerStatistic from './components/LecturerStatistic';
import SemesterStatistic from './components/SemesterStatistic';
import LecturerRole from './components/LecturerRole';

function LecturerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    run,
    loading,
    data: LecturerDepartmentData
  } = useRequest(() => getLecturerDepartments({ lectureId: user?.zipCode, isApprover: true }), {
    refreshDeps: [1],
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    run();
  }, [user]);

  return (
    <Page title="Dashboard | FCMS">
      <Container style={{ minWidth: '95%' }}>
        <Stack display="flex" direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Stack>
        <Stack
          display="flex"
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          style={{ width: ' 100%' }}
        >
          <Grid display="flex" direction="column" xs={4.5}>
            <Grid display="flex" direction="row" style={{ padding: '5px' }}>
              {/* {LecturerDepartmentData?.length > 0 ? <TopicNeedFeedback /> : ''} */}
              <AnnouncementBoard />
            </Grid>
            <Grid display="flex" direction="row" style={{ padding: '5px' }} sx={{ mt: 3 }}>
              <TopicProgressList />
            </Grid>
          </Grid>
          <Grid display="flex" direction="column" xs={3}>
            <Grid display="flex" direction="row">
              <QuickAction />
            </Grid>
            <Grid display="flex" direction="row" style={{ marginTop: '20px' }}>
              <FlowTimeLine />
            </Grid>
          </Grid>
          <Grid display="flex" direction="column" xs={3}>
            <Grid display="flex" direction="row" style={{ padding: '5px' }}>
              <Grid display="flex" direction="column">
                <TopicsInSemester />
              </Grid>
              <Grid display="flex" direction="column" sx={{ ml: 2 }}>
                <TopicsMentoring />
              </Grid>
            </Grid>
            <Grid display="flex" direction="row" style={{ padding: '5px', marginTop: '20px' }}>
              <SemesterStatistic />
            </Grid>
            <Grid display="flex" direction="row" style={{ padding: '5px' }}>
              <LecturerRole />
            </Grid>
            {/* <Grid display="flex" direction="row" style={{ padding: '5px', marginTop: '20px' }}>
              <LecturerStatistic />
            </Grid> */}
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}
export default LecturerDashboard;
