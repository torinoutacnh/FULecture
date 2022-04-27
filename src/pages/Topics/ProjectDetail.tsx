import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router';
import {
  AttachFile,
  HomeOutlined,
  WhatshotOutlined,
  GrainOutlined,
  DateRangeOutlined,
  Assignment,
  HelpOutlined
} from '@material-ui/icons';
import {
  Container,
  IconButton,
  Breadcrumbs,
  Typography,
  Link,
  Card,
  Stack,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Tooltip
} from '@material-ui/core';
import { getTopicNoTypeById } from 'redux/topic/api';
import { getProjects } from 'redux/Projects/api';
import { TProjects } from 'types/Projects';
import useSemester from 'hooks/useSemester';
import { useSnackbar } from 'notistack5';
import { CardTitle } from 'pages/Products/components/Card';
import EvidenceCard from 'pages/Evidences/EvidenceCard';

import AssignTeamCard from './components/AssignTeamCard';
import Page from '../../components/Page';

import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import { TTopic } from '../../types/topic';

import useAuth from '../../hooks/useAuth';
import ProcessChart from './components/ProcessChart';
import MentorsTopicCard from './components/MentorsTopicCard';
import { getWeeklyReports } from '../../redux/WeeklyReport/api';
import WeeklyReport from '../WeeklyReport/WeeklyReport';
import WeeklyReportListMember from './components/WeeklyReportListMember';
import WeeklyTableCard from './components/WeeklyTableCard';
import { getStudentInTeams } from '../../redux/StudentInTeams/api';

const ProjectDetail = () => {
  const { user } = useAuth();
  // get semester object form local storage
  const { semester } = useSemester();

  const { id }: any = useParams();
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState<TTopic>();
  const [currentProject, setCurrentProject] = useState<any>();

  const { data, run, loading } = useRequest(() => getTopicNoTypeById(id!), {
    refreshDeps: [id],
    formatResult: (res) => res.data
  });

  const { data: projectsData = [] } = useRequest(() => getProjects({ topicId: id!, status: 3 }), {
    refreshDeps: [id],
    formatResult: (res) => res.data.result
  });

  const {
    run: getStudentInTeam,
    loading: studentInTeamLoading,
    data: studentInTeamData = []
  } = useRequest(
    () =>
      getStudentInTeams({ semesterId: semester.semesterId, teamId: currentTopic?.team?.teamId }),
    {
      refreshDeps: [id],
      formatResult: (res) => res.data.result
    }
  );

  useEffect(() => {
    if (projectsData) {
      setCurrentProject(projectsData[0]);
    }
  }, [projectsData]);

  useEffect(() => {
    if (currentTopic) {
      getStudentInTeam();
    }
  }, [currentTopic]);

  useEffect(() => {
    if (id) {
      run();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setCurrentTopic(data);
    }
  }, [data]);

  return (
    <Page title="FCMS | Project Detail">
      <Container style={{ margin: '20px', minWidth: '90%' }}>
        <Stack display="flex" direction="row">
          <Grid direction="row" display="flex" xs={8} sx={{ ml: 1 }}>
            <Grid item>
              <Grid direction="column">
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
                      Projects
                    </Link>
                    <Typography
                      variant="body2"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="text.primary"
                    >
                      <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      {currentTopic?.name}
                    </Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Grid display="flex" direction="row" sx={{ mt: 2 }}>
          <Typography variant="h5">Project Detail</Typography>
        </Grid>

        <Stack direction="row" mt={5}>
          <Grid
            direction="column"
            xs={9}
            spacing={6}
            style={{
              alignContent: 'flex-start',
              backgroundColor: 'white',
              borderRadius: '10px'
            }}
          >
            <Card sx={{ padding: 3 }}>
              <Grid display="flex" direction="row">
                <Grid direction="column" xs={7} sx={{ pl: 2 }}>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <>
                      <Grid direction="row">
                        <Typography
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                          variant="h6"
                        >
                          {currentTopic?.name}
                        </Typography>
                      </Grid>
                      <Grid direction="row">
                        <Typography variant="body1" style={{ opacity: 0.6, marginTop: '6px' }}>
                          {currentTopic?.code}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>

                <Grid
                  display="flex"
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  xs={2}
                >
                  {studentInTeamLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <>
                      {studentInTeamData[0]?.comment || studentInTeamData[0]?.conclusion ? (
                        <Tooltip
                          describeChild
                          title="Mentors review and evaluate students before thesis defense"
                        >
                          <>
                            {console.log('studentinteamData: ', studentInTeamData)}
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={true}
                              style={{
                                width: 110,
                                height: 36,
                                borderRadius: '10px'
                              }}
                              href={`${PATH_DASHBOARD.projects.mentorReview}/${currentTopic?.topicId}/${currentTopic?.team?.teamId}`}
                            >
                              <Assignment style={{ fontSize: 16 }} />
                              <Typography sx={{ fontSize: 14 }} variant="subtitle1">
                                Review
                              </Typography>
                            </Button>
                          </>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          describeChild
                          title="Mentors review and evaluate students before thesis defense"
                        >
                          <>
                            {console.log('studentinteamData: ', studentInTeamData)}
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={false}
                              style={{
                                width: 110,
                                height: 36,
                                borderRadius: '10px'
                              }}
                              href={`${PATH_DASHBOARD.projects.mentorReview}/${currentTopic?.topicId}/${currentTopic?.team?.teamId}`}
                            >
                              <Assignment style={{ fontSize: 16 }} />
                              <Typography sx={{ fontSize: 14 }} variant="subtitle1">
                                Review
                              </Typography>
                            </Button>
                          </>
                        </Tooltip>
                      )}
                    </>
                  )}
                </Grid>
                <Grid
                  display="flex"
                  direction="row"
                  xs={2}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Tooltip describeChild title="Download attachment of this topic">
                    <Button
                      id="attachment"
                      style={{
                        width: 110,
                        height: 36,
                        color: '#3498FF',
                        backgroundColor: '#E1F0FF',
                        borderRadius: '10px'
                      }}
                      href={currentTopic?.attachment}
                    >
                      <AttachFile style={{ fontSize: 16 }} />
                      <Link
                        style={{ color: '#3498FF', textDecoration: 'none', fontSize: 14 }}
                        href={currentTopic?.attachment}
                      >
                        Attachment
                      </Link>
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Card>
            {currentProject !== null ? (
              <Card sx={{ mt: 2 }}>
                <CardTitle>
                  <Typography variant="h6">Process Chart</Typography>
                </CardTitle>
                <ProcessChart project={currentTopic?.departmentId} />
              </Card>
            ) : (
              ''
            )}

            <WeeklyTableCard
              projectId={currentProject?.projectId}
              teamId={currentTopic?.team?.teamId}
            />
            <EvidenceCard projectId={currentProject?.projectId} />
          </Grid>

          {/* Right column */}

          <Grid direction="column" xs={4}>
            <MentorsTopicCard groupId={currentTopic?.mentorGroupId} />
            <AssignTeamCard teamId={currentTopic?.team?.teamId} />
            <WeeklyReportListMember
              projectId={currentProject?.projectId}
              teamId={currentTopic?.team?.teamId}
            />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
};

export default ProjectDetail;
