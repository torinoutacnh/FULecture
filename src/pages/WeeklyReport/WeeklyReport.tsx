import {
  Breadcrumbs,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography
} from '@material-ui/core';
import {
  AssessmentOutlined,
  DateRangeOutlined,
  GrainOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import { useRequest } from 'ahooks';
import Page from 'components/Page';
import useSemester from 'hooks/useSemester';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getWeeklyReportById, getWeeklyReports } from 'redux/WeeklyReport/api';
import { PATH_DASHBOARD } from 'routes/paths';
import TaskCompleted from './components/TaskCompleted';
import TaskInprogress from './components/TaskInprogress';
import { getProjectsById } from '../../redux/Projects/api';
import TaskNextWeek from './components/TaskNextWeek';
import UrgentIssues from './components/UrgentIssues';
import CommentFields from './components/CommentFields';

function WeeklyReport() {
  const { id } = useParams();
  // const { studentName } = useParams();
  const navigate = useNavigate();
  const { semester } = useSemester();
  const [currentReport, setCurrentReport] = useState();

  // const {
  //   data: reportData,
  //   run: reportRun,
  //   loading: reportLoading
  // } = useRequest(() => getWeeklyReportById(id), {
  //   refreshDeps: [id],
  //   formatResult: (res) => {
  //     console.log(res.data);
  //     return res.data.result;
  //   }
  // });

  useEffect(() => {
    getWeeklyReportById(id).then((res) => {
      setCurrentReport(res.data);
    });
  }, [id]);

  // const { data: projectData } = useRequest(() => getProjectsById(pId), {
  //   refreshDeps: [d],
  //   formatResult: (res) => {
  //     console.log(res.data);
  //     return res.data;
  //   }
  // });
  console.log('reportData', currentReport);
  // console.log('projectData', projectData);
  return (
    <Page>
      <Container>
        <Stack display="flex" direction="column">
          <Grid role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={() => {
                  navigate(PATH_DASHBOARD.root);
                }}
              >
                <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                Semester
              </Link>
              <Link sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="#">
                <DateRangeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                {semester?.name}
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="#"
                onClick={() => {
                  navigate(PATH_DASHBOARD.projects.list);
                }}
              >
                <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                Project
              </Link>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                Weekly Reports
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Card sx={{ mt: 2 }}>
            <Stack display="flex" direction="row" justifyContent="space-between">
              <Grid display="flex" direction="column">
                <Typography variant="h5" sx={{ ml: 2, mt: 2, mb: 2 }}>
                  Weekly Status Report
                </Typography>
                <Typography variant="subtitle1" sx={{ ml: 2, mt: 2, mb: 2 }}>
                  Student: {currentReport?.reportBy}
                </Typography>
              </Grid>
              <Grid display="flex" direction="column" sx={{ mr: 2 }}>
                <Grid display="flex" direction="row" spacing={2} justifyContent="center">
                  <Typography variant="h5" sx={{ ml: 2, mt: 2, mb: 2 }}>
                    Week {currentReport?.week}
                  </Typography>
                </Grid>
                <Grid display="flex" direction="row" spacing={2}>
                  <Typography variant="subtitle1" sx={{ ml: 2, mt: 2, mb: 2 }}>
                    From: {new Date(currentReport?.from).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 2, mt: 2, mb: 2 }}>
                    To: {new Date(currentReport?.to).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Card>

          <Grid sx={{ mt: 2 }} container display="flex" direction="column" spacing={2}>
            <Grid item xs={8}>
              <TaskCompleted currentReport={currentReport} />
            </Grid>
            <Grid item xs={8}>
              <TaskInprogress currentReport={currentReport} />
            </Grid>
            <Grid item xs={8}>
              <TaskNextWeek currentReport={currentReport} />
            </Grid>
            <Grid item xs={8}>
              <UrgentIssues currentReport={currentReport} />
            </Grid>
            <Grid item xs={8}>
              <CommentFields currentReport={currentReport} />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default WeeklyReport;
