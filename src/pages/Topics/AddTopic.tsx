/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import {
  Container,
  Card,
  Grid,
  Stack,
  Button,
  useTheme,
  Box,
  Typography,
  CircularProgress,
  Tooltip
} from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router';
import { useRequest } from 'ahooks';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack5';
import { addTopic, getTopics } from 'redux/topic/api';
import { getLecturerById } from 'redux/lecturers/api';
import { InputField } from 'components/form';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from 'hooks/useSemester';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorOutlined } from '@material-ui/icons';
import moment from 'moment';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { topicColumns } from './config';
import RightForm from './components/RightForm';
import MiddleForm from './components/MiddleForm';

import Page from '../../components/Page';

import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import useDashboard from '../../hooks/useDashboard';
import { TTopic } from '../../types/topic';
import useSettings from '../../hooks/useSettings';
import { SemesterState } from '../../types/semester';
import UploadFileDialog from './components/UploadFileDialog';

const AddTopic = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [context, setContext] = useState<any>('');
  const [problem, setProblem] = useState<any>('');
  const [proposedSolution, setProposedSolution] = useState<any>('');
  const [theory, setTheory] = useState<any>('');
  const [output, setOutput] = useState<any>('');
  const [technology, setTechnology] = useState<any>('');
  const { semester }: any = useSemester();
  const [open, setOpen] = useState<any>(false);
  const [fileData, setFileData] = useState<any>();

  const { data: lecturer, loading } = useRequest(() => getLecturerById(user?.email!), {
    refreshDeps: [user?.email],
    formatResult: (res) => res.data
  });

  // Cai nay de import exel file
  const onUpload = (values: any) =>
    axios
      .get(values.preview, { responseType: 'blob' })
      .then((response) => {
        const file = new File([response.data], values.path);
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(response.data);

          fileReader.onload = (e: any) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, { type: 'buffer' });

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);
            console.log('data', data);

            resolve(data);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });

        return promise.then((d: any) => {
          setContext(d[0].Context);
          setTechnology(d[0].Technology);
          setOutput(d[0].Output);
          setProblem(d[0].Problem);
          setTheory(d[0].Theory);
          setProposedSolution(d[0].ProposedSolution);
          setFileData(d[0]);
          methods.setValue('name', d[0].Title, { shouldValidate: true });
          methods.setValue('code', d[0].Code, { shouldValidate: true });
          methods.setValue('note', d[0].Note, { shouldValidate: true });
          methods.setValue('description', d[0].Description, { shouldValidate: true });
          methods.setValue('abtract', d[0].Abtract, { shouldValidate: true });
          methods.setValue('taskpackage1', d[0].taskPackage1, { shouldValidate: true });
          methods.setValue('keywords', d[0].keyWords, { shouldValidate: true });
          methods.setValue('taskpackage2', d[0].taskPackage2, { shouldValidate: true });
          methods.setValue('taskpackage3', d[0].taskPackage3, { shouldValidate: true });
          methods.setValue('taskpackage4', d[0].taskPackage4, { shouldValidate: true });
          methods.setValue('taskpackage5', d[0].taskPackage5, { shouldValidate: true });
        });
      })
      .then((res) =>
        enqueueSnackbar('Import success', {
          variant: 'success'
        })
      )
      .catch((err) => {
        enqueueSnackbar('ERROR', {
          variant: 'error'
        });
        console.log(`err`, err);
      });
  const {
    run: getTopicsData,
    data: topicsData,
    loading: topicLoading
  } = useRequest(
    () => getTopics({ submitterId: user?.zipCode, semesterId: semester?.semesterId }),
    {
      refreshDeps: [user?.zipCode],
      formatResult: (res) => res.data.result
    }
  );
  useEffect(() => {
    if (user?.zipCode) {
      getTopicsData();
    }
  }, [user]);

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

  const methods = useForm<TTopic>({ resolver: yupResolver(validationSchema) });
  const { handleSubmit } = methods;

  const onSubmit = (values: TTopic) => {
    values.createDate = new Date();
    values.submitterId = lecturer?.lecturerId!;
    values.semesterId = semester?.semesterId!;
    values.submitByStudent = false;
    values.status = 1;
    values.context = context;
    values.problem = problem;
    values.proposedSolution = proposedSolution;
    values.theory = theory;
    values.output = output;
    values.technology = technology;
    console.log('values  ', values);
    return addTopic(values)
      .then((res) => {
        enqueueSnackbar(`Create topic successful!`, {
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
    <FormProvider {...methods}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {topicsData?.length >= semester?.maxProject ? (
            <Tooltip describeChild title="You have reached the maximum number of topics!">
              <ErrorOutlined color="error" />
            </Tooltip>
          ) : (
            ''
          )}
          {topicLoading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Button onClick={() => navigate(-1)} variant="outlined">
                Close
              </Button>

              {topicsData?.length < semester?.maxProject ? (
                <LoadingAsyncButton
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  variant="contained"
                >
                  Save
                </LoadingAsyncButton>
              ) : (
                <LoadingAsyncButton
                  disabled={true}
                  onClick={handleSubmit(onSubmit)}
                  type="submit"
                  variant="contained"
                >
                  Save
                </LoadingAsyncButton>
              )}
            </>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page title="Create Topic">
        <UploadFileDialog open={open} onAdd={onUpload} onClose={() => setOpen(false)} />
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Box px={2} mx="auto">
            <Grid display="flex" direction="row" justifyContent="space-between">
              <Typography px={1} variant="h3" component="h4" gutterBottom>
                Create Topic
              </Typography>
              <Grid display="flex" direction="row" alignItems="center">
                <Typography variant="subtitle2" color="error">
                  Lecturer can only create topic before{' '}
                  {moment(new Date(semester.inProgressDate)).format('DD MMMM, YYYY')}
                </Typography>
                {/* <Button
                  sx={{ ml: 2 }}
                  style={{ width: '110px', height: '40px' }}
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Import File
                </Button> */}
              </Grid>
            </Grid>

            <Box display="flex">
              <MiddleForm
                isUpdate={true}
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
                fileData={fileData}
              />
              <RightForm isUpdate={true} />
            </Box>
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default AddTopic;
