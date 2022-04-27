/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Container,
  Card,
  Grid,
  Stack,
  Button,
  useTheme,
  Box,
  Typography,
  CircularProgress
} from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack5';
import { editTopic, getTopicById } from 'redux/topic/api';
import { InputField } from 'components/form';
import { useSelector } from 'redux/store';
import useSemester from 'hooks/useSemester';
import { getLecturerById } from 'redux/lecturers/api';
import { PATH_DASHBOARD } from 'routes/paths';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RightForm from './components/RightForm';
import MiddleForm from './components/MiddleForm';
import Page from '../../components/Page';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import useDashboard from '../../hooks/useDashboard';
import { TTopic } from '../../types/topic';
import useSettings from '../../hooks/useSettings';

const UpdateTopic = () => {
  const { id }: any = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { semester } = useSemester();
  const [context, setContext] = useState<any>('');
  const [problem, setProblem] = useState<any>('');
  const [proposedSolution, setProposedSolution] = useState<any>('');
  const [theory, setTheory] = useState<any>('');
  const [output, setOutput] = useState<any>('');
  const [technology, setTechnology] = useState<any>('');

  const { data, run, loading } = useRequest(() => getTopicById(id!), {
    refreshDeps: [id],
    formatResult: (res) => res.data
  });

  const { data: lecturer } = useRequest(() => getLecturerById(user?.email!), {
    refreshDeps: [user?.email],
    formatResult: (res) => res.data
  });
  useEffect(() => {
    if (id) {
      run();
    } else {
      form.reset(data);
    }
  }, [id, run]);

  useEffect(() => {
    if (data) {
      form.reset(data);
      setContext(data.context);
      setProblem(data.problem);
      setProposedSolution(data.proposedSolution);
      setTheory(data.theory);
      setOutput(data.output);
      setTechnology(data.technology);
    }
  }, [data]);

  const [isUpdate, setIsUpdate] = useState(true);

  console.log('data', data);

  useEffect(() => {
    if (
      data?.status === 1 ||
      data?.status === 2 ||
      data?.status === null ||
      data?.status === undefined
    ) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [data?.status]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please input name'),
    code: Yup.string().required('Please input code'),
    note: Yup.string().required('Please input note'),
    abtract: Yup.string().required('Please input abstract'),
    description: Yup.string().required('Please input description'),
    attachment: Yup.string().required('Please upload attachment'),
    keywords: Yup.string().required('Please input keywords'),
    minMember: Yup.string().required('Please input min members'),
    maxMembers: Yup.string().required('Please input max members'),
    departmentId: Yup.string().required('Please select department'),
    companyId: Yup.string().required('Please select company')
  });
  const form = useForm<TTopic>({ resolver: yupResolver(validationSchema) });
  const { handleSubmit } = form;

  const onSubmit = (values: TTopic) => {
    values.submitterId = lecturer?.lecturerId!;
    values.semesterId = semester?.semesterId!;
    values.submitByStudent = false;
    values.context = context;
    values.problem = problem;
    values.proposedSolution = proposedSolution;
    values.theory = theory;
    values.output = output;
    values.technology = technology;
    if (isUpdate === true) {
      values.status = 1;
    } else {
      values.status = data?.status;
    }

    return editTopic(id, values)
      .then((res) => {
        enqueueSnackbar(`Update topic successful!`, {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.topics.submitted);
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...form}>
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
            Update
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Update Topic">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {loading ? (
            <CircularProgress sx={{ margin: 'auto' }} />
          ) : (
            <Box px={2} mx="auto">
              <Typography px={1} variant="h3" component="h4" gutterBottom>
                Update Topic
              </Typography>
              <Box display="flex">
                <MiddleForm
                  isUpdate={isUpdate}
                  context={context}
                  setContext={setContext}
                  problem={problem}
                  setProblem={setProblem}
                  proposedSolution={proposedSolution}
                  setProposedSolution={setProposedSolution}
                  theory={theory}
                  setTheory={setTheory}
                  output={output}
                  setOuput={setOutput}
                  technology={technology}
                  setTechnology={setTechnology}
                  currentTopic={data}
                />
                <RightForm isUpdate={isUpdate} />
              </Box>
            </Box>
          )}
        </Container>
      </Page>
    </FormProvider>
  );
};

export default UpdateTopic;
