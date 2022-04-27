import { Button, Stack, Container, useTheme, Typography, Box } from '@material-ui/core';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { FormProvider, useForm } from 'react-hook-form';

import React, { useState, useEffect } from 'react';
import useDashboard from 'hooks/useDashboard';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack5';
import { getStudentInTeams, qualifiedStudentInTeam } from 'redux/StudentInTeams/api';

import Page from 'components/Page';
import useSettings from 'hooks/useSettings';
import { useRequest } from 'ahooks';

import MentorReviewForm from './MentorReviewForm';
import { getTopicById, getTopicNoTypeById } from '../../../redux/topic/api';
import useSemester from '../../../hooks/useSemester';
import { getTeams } from '../../../redux/teams/api';
import { TQualifiedData } from './qualifiedData';

function MentorReview() {
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();
  const [comment, setComment] = useState<any>('');
  const [conclusion, setConclusion] = useState<any>('');
  const { id } = useParams();
  const { teamId } = useParams();
  const methods = useForm<any>();
  const { handleSubmit } = methods;
  const { themeStretch } = useSettings();
  const { semester } = useSemester();
  const { enqueueSnackbar } = useSnackbar();
  const [listApproveStudent, setListApproveStudent] = useState([]);

  const {
    data: currentTopic,
    loading: topicLoading,
    run: topicRun
  } = useRequest(() => getTopicNoTypeById(id!), {
    refreshDeps: [id],
    formatResult: (res) => res.data
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

  const handleChange = (event) => {
    const student = {
      studentId: Number.parseInt(event.target.name, 10),
      name: event.target.value,
      isQualified: event.target.checked
    };
    if (
      listApproveStudent.find(
        (value) => value.studentId === Number.parseInt(event.target.name, 10)
      ) != null
    ) {
      listApproveStudent.splice(
        listApproveStudent.indexOf(
          listApproveStudent.find(
            (value) => value.studentId === Number.parseInt(event.target.name, 10)
          )
        ),
        1,
        student
      );
    } else {
      listApproveStudent.push(student);
    }
  };
  useEffect(() => {
    if (currentTopic) {
      getStudentInTeam();
    }
  }, [currentTopic]);
  useEffect(() => {
    if (id) {
      topicRun();
    }
  }, [id]);

  useEffect(() => {
    if (studentInTeamData[0]) {
      methods.reset(studentInTeamData);
      setComment(studentInTeamData[0].comment);
      setConclusion(studentInTeamData[0].conclusion);
    }
  }, [studentInTeamData]);

  console.log('currentTopic', currentTopic);

  const onSubmit = (values: TQualifiedData) => {
    values.comment = comment;
    values.conclusion = conclusion;
    values.studentList = listApproveStudent;
    values.semesterId = semester?.semesterId;
    values.teamId = Number.parseInt(teamId, 10);
    console.log('values  ', values);
    return qualifiedStudentInTeam(values)
      .then(() => {
        enqueueSnackbar(`Qualified student successful!`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      });
  };
  return (
    <FormProvider {...methods}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Close
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Save
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Mentor Review">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Box px={2} mx="auto">
            <Typography px={1} variant="h6" component="h4" gutterBottom>
              Mentor Review Form
            </Typography>
            <Box display="flex">
              <MentorReviewForm
                comment={comment}
                setComment={setComment}
                conclusion={conclusion}
                setConclusion={setConclusion}
                currentTopic={currentTopic}
                handleChange={handleChange}
              />
            </Box>
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
}

export default MentorReview;
