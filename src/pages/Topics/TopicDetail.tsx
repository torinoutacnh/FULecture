import React, { useState, ChangeEvent, useRef, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router';
import {
  AttachFile,
  InfoOutlined,
  PeopleAltOutlined,
  PersonOutlineRounded,
  DescriptionOutlined,
  HomeOutlined,
  WhatshotOutlined,
  GrainOutlined,
  DateRangeOutlined,
  AddOutlined,
  AssignmentTurnedIn,
  AssignmentLate,
  Delete
} from '@material-ui/icons';
import {
  Container,
  IconButton,
  Breadcrumbs,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Card,
  Stack,
  Grid,
  Divider,
  CircularProgress
} from '@material-ui/core';
import { getTopicNoTypeById, deleteTopicById, approveTopic, rejectTopic } from 'redux/topic/api';
import { getProjects } from 'redux/Projects/api';

import useSemester from 'hooks/useSemester';
import { useSnackbar } from 'notistack5';
import { get } from 'lodash';
import { getLecturerDepartments } from 'redux/LecturerDepartment/api';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { QuillEditor } from 'components/editor';
import { getLecturerGroups } from 'redux/LecturerGroups/api';

import { InputField } from 'components/form';
import Feedback from './components/Feedback';
import AssignTeamCard from './components/AssignTeamCard';
import Page from '../../components/Page';

import { PATH_DASHBOARD } from '../../routes/paths';
import SearchMentorDialog from './components/SearchMentorDialog';
import useAuth from '../../hooks/useAuth';
import MentorsTopicCard from './components/MentorsTopicCard';
import TopicProgressLabel from './components/TopicProgressLabel';
import { CardTitle } from './components/Card';
import FeedbackOver from './components/FeedbackOver';

const TopicDetail = () => {
  const { user } = useAuth();
  // get semester object form local storage
  const { semester } = useSemester();
  const { enqueueSnackbar } = useSnackbar();
  const [visibleAddMentorDialog, setVisibleAddMentorDialog] = useState(false);

  const openAddMentorDialog = () => {
    setVisibleAddMentorDialog(true);
  };
  const closeAddMentorDialog = () => {
    setVisibleAddMentorDialog(false);
  };
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<any>();
  const [isApprove, setIsApprove] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);

  console.log(currentTopic?.context);

  const { data, run, loading } = useRequest(() => getTopicNoTypeById(id!), {
    refreshDeps: [id],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    getLecturerDepartments({ lectureId: user?.zipCode, isApprover: true }).then((res) => {
      res.data?.result?.map(({ departmentId }: any) => {
        if (currentTopic?.departmentId === departmentId) {
          setIsApprove(true);
        }
      });
    });
  }, [user, currentTopic]);

  const { loading: applicationLoading, data: applicationsData = [] } = useRequest(
    () => getProjects({ topicId: id!, status: 1 }),
    {
      refreshDeps: [id],
      formatResult: (res) => res?.data?.result
    }
  );
  const {
    data: reviewerData,
    loading: reviewerLoading,
    run: reviewerRun
  } = useRequest(
    () =>
      getLecturerGroups({
        semesterId: semester.semesterId,
        type: 3,
        departmentId: currentTopic?.departmentId
      }),
    {
      formatResult: (res) => res?.data?.result[0]
    }
  );

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

  useEffect(() => {
    if (
      reviewerData?.lecturerGroupMembersDetails?.find(
        (value) => value.lecturerId === user?.zipCode
      ) !== undefined
    ) {
      setIsReviewer(true);
    }
  }, [reviewerData]);

  useEffect(() => {
    if (currentTopic?.departmentId) reviewerRun();
  }, [currentTopic?.departmentId]);

  const handleApprove = (topicId: number) =>
    approveTopic(topicId)
      .then(() =>
        enqueueSnackbar(`Approve Success!`, {
          variant: 'success'
        })
      )
      .then((res) => {
        run();
        setCurrentTopic(data);
      })
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], err);
        console.log(err);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const handleReject = (topicId: number) =>
    rejectTopic(topicId)
      .then(() =>
        enqueueSnackbar(`Reject Success!`, {
          variant: 'success'
        })
      )
      .then((res) => {
        run();
        setCurrentTopic(data);
      })
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], err);
        console.log(err);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openMentorDialog, setOpenMentorDialog] = React.useState(false);

  const deleteTopic = (id: any) =>
    deleteTopicById(id)
      .then(() =>
        enqueueSnackbar(`Remove Successful!`, {
          variant: 'success'
        })
      )
      .then((response) => {
        navigate(PATH_DASHBOARD.topics.submitted);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });

  return (
    <Page title="FCMS | Topic Detail">
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
                        navigate(PATH_DASHBOARD.topics.submitted);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Topics
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

          <Grid xs={4} display="flex" justifyContent="flex-end">
            <Grid
              display="flex"
              xs={10}
              spacing={1.5}
              direction="row"
              container
              justifyContent="space-evenly"
            >
              {isApprove === true &&
              currentTopic?.status === 1 &&
              new Date(semester.inProgressDate) > new Date() ? (
                <>
                  <Grid>
                    <LoadingAsyncButton
                      variant="contained"
                      style={{ width: '90px' }}
                      onClick={() => handleApprove(currentTopic?.topicId)}
                    >
                      <AssignmentTurnedIn style={{ fontSize: '16px', marginRight: '5px' }} />
                      Approve
                    </LoadingAsyncButton>
                  </Grid>
                  <Grid>
                    <LoadingAsyncButton
                      style={{ width: '90px' }}
                      onClick={() => handleReject(currentTopic.topicId)}
                      variant="contained"
                      color="error"
                    >
                      <AssignmentLate style={{ fontSize: '16px', marginRight: '5px' }} />
                      Reject
                    </LoadingAsyncButton>
                  </Grid>
                </>
              ) : (
                ''
              )}

              {currentTopic?.submitterId === user?.zipCode && currentTopic?.status === 1 ? (
                <Grid>
                  <LoadingAsyncButton
                    style={{ width: '90px' }}
                    onClick={() => {
                      handleClickOpen();
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    <Delete style={{ fontSize: '16px', marginRight: '5px' }} />
                    Dump
                  </LoadingAsyncButton>
                </Grid>
              ) : (
                ''
              )}

              <Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
                  <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Remove Topic
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>Are you sure to remove this topic?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Cancel
                    </Button>
                    <LoadingAsyncButton
                      variant="contained"
                      color="error"
                      onClick={() => deleteTopic(currentTopic?.topicId)}
                    >
                      Yes, remove it!
                    </LoadingAsyncButton>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Grid display="flex" direction="row" sx={{ mt: 2 }}>
          <Typography variant="h5">Topic Detail</Typography>
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
            <Card sx={{ padding: 4 }}>
              <Grid display="flex" direction="row">
                <Grid direction="column" xs={8} sx={{ pl: 4 }}>
                  {loading ? (
                    <CircularProgress size={25} />
                  ) : (
                    <>
                      <Grid direction="row">
                        <Typography
                          variant="h6"
                          style={{ maxWidth: '300px', wordWrap: 'break-word' }}
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
                {loading ? (
                  <CircularProgress size={25} />
                ) : (
                  <Grid
                    display="flex"
                    direction="row"
                    xs={4}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    {currentTopic?.submitterId === user?.zipCode && currentTopic?.status === 3 ? (
                      <>
                        <IconButton
                          sx={{ mr: 2 }}
                          onClick={() => {
                            setOpenMentorDialog(openAddMentorDialog);
                          }}
                          style={{
                            width: 120,
                            height: 40,
                            color: '#3498FF',
                            backgroundColor: '#E1F0FF',
                            borderRadius: '10px',
                            fontSize: 14
                          }}
                        >
                          <AddOutlined style={{ fontSize: 16 }} />
                          Add Mentor
                        </IconButton>

                        <SearchMentorDialog
                          visibleAddMentorDialog={visibleAddMentorDialog}
                          closeAddMentorDialog={closeAddMentorDialog}
                          mentorGroupId={currentTopic?.mentorGroupId}
                        />
                      </>
                    ) : (
                      ''
                    )}
                    <IconButton
                      id="attachment"
                      style={{
                        width: 120,
                        height: 40,
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
                    </IconButton>
                  </Grid>
                )}
              </Grid>
              {/* row2 */}
              <Grid display="flex" direction="row" spacing={5} mt={5}>
                {/* col1 */}
                <Grid direction="column" xs={4} style={{ textAlign: 'center' }}>
                  <Grid item>
                    <Typography variant="subtitle2">Department</Typography>
                  </Grid>
                  <Grid item height="36px" lineHeight="36px">
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Typography variant="body2">{currentTopic?.department.name}</Typography>
                    )}
                  </Grid>
                </Grid>
                {/* col2 */}
                <Grid direction="column" xs={4} style={{ textAlign: 'center' }}>
                  <Grid item>
                    <Typography variant="subtitle2">Submit by</Typography>
                  </Grid>
                  <Grid item height="36px" lineHeight="36px">
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Typography variant="body2">
                        {currentTopic?.lecturerSubmiter?.name}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                {/* col3 */}
                <Grid display="flex" xs={4} direction="column" style={{ textAlign: 'center' }}>
                  <Grid item>
                    <Typography variant="subtitle2">Status</Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="center">
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <TopicProgressLabel status={currentTopic?.status} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              {/* row3 */}
              <Grid direction="row" display="flex" justifyContent="space-evenly" mt={5} mb={5}>
                {/* col1 minMember */}
                <Grid direction="column" xs={4}>
                  <Grid
                    display="flex"
                    direction="row"
                    justifyContent="flex-start"
                    // textAlign="center"
                    style={{ minHeight: '72px' }}
                  >
                    <Grid
                      direction="column"
                      display="flex"
                      xs={4}
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <InfoOutlined style={{ fontSize: '26' }} />
                    </Grid>
                    <Grid direction="column" xs={10}>
                      <Grid direction="row" style={{ minHeight: '36px' }}>
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Typography variant="body2">Min members</Typography>
                        )}
                      </Grid>
                      <Grid direction="row">
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Typography variant="subtitle2">{currentTopic?.minMember}</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* col2 Maxmember */}
                <Grid direction="column" xs={4}>
                  <Grid
                    display="flex"
                    direction="row"
                    justifyContent="flex-start"
                    // textAlign="center"
                    style={{ minHeight: '72px' }}
                  >
                    <Grid direction="column" display="flex" justifyContent="center" xs={2}>
                      <InfoOutlined />
                    </Grid>
                    <Grid direction="column" xs={10}>
                      <Grid direction="row" style={{ minHeight: '36px' }}>
                        <Typography variant="body2">Max members</Typography>
                      </Grid>
                      <Grid direction="row">
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Typography variant="subtitle2">{currentTopic?.maxMembers}</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* col4 mentor */}
                <Grid direction="column" xs={4}>
                  <Grid
                    display="flex"
                    direction="row"
                    justifyContent="flex-start"
                    style={{ minHeight: '72px' }}
                  >
                    <Grid direction="column" xs={2} display="flex" justifyContent="center">
                      <PersonOutlineRounded />
                    </Grid>
                    <Grid direction="column" xs={10}>
                      <Grid direction="row" style={{ minHeight: '36px' }}>
                        <Typography variant="body2">Core Mentor</Typography>
                      </Grid>
                      <Grid direction="row">
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Typography style={{ wordWrap: 'break-word' }} variant="subtitle2">
                            {currentTopic?.lecturerSubmiter?.name}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* row4 */}
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardTitle>
                <Typography variant="h6">Register content of Capstone Project</Typography>
              </CardTitle>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Stack display="flex" direction="column">
                  <Grid display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Context</Typography>
                    {currentTopic?.context && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.context}
                        // readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Problem</Typography>
                    {currentTopic?.problem && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.problem}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Proposed Solution</Typography>
                    {currentTopic?.proposedSolution && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.proposedSolution}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>
                </Stack>
              )}
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardTitle>
                <Typography variant="h6">Main proposal content</Typography>
              </CardTitle>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Stack display="flex" direction="column">
                  <Grid display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Theory</Typography>
                    {currentTopic?.theory && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.theory}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Output</Typography>
                    {currentTopic?.output && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.output}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Technology</Typography>
                    {currentTopic?.technology && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.technology}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>
                </Stack>
              )}
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardTitle>
                <Typography variant="h6">Proposed Tasks for students</Typography>
              </CardTitle>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Stack display="flex" direction="column">
                  <Grid display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Task Package 1</Typography>
                    {currentTopic?.taskPackage1 && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.taskPackage1}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Task Package 2</Typography>

                    {currentTopic?.taskPackage2 && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.taskPackage2}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>

                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Task Package 3</Typography>

                    {currentTopic?.taskPackage3 && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.taskPackage3}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>
                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Task Package 4</Typography>

                    {currentTopic?.taskPackage4 && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.taskPackage4}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>
                  <Grid sx={{ mt: 2 }} display="flex" direction="column" spacing={2}>
                    <Typography variant="subtitle1">Task Package 5</Typography>

                    {currentTopic?.taskPackage5 && (
                      <QuillEditor
                        sx={{ mt: 1 }}
                        value={currentTopic?.taskPackage5}
                        readOnly={true}
                        toolBar={false}
                        theme={false}
                      />
                    )}
                  </Grid>
                </Stack>
              )}
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardTitle>
                <Typography variant="h6">Review</Typography>
              </CardTitle>
              {currentTopic?.status === 1 || currentTopic?.status === 2 ? (
                <>
                  <Divider />
                  {/* feedback row */}
                  {loading || reviewerLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Feedback
                      isApprove={isApprove}
                      isReviewer={isReviewer}
                      currentTopic={currentTopic}
                    />
                  )}
                </>
              ) : (
                <FeedbackOver />
              )}
            </Card>
          </Grid>

          {/* Right column */}

          <Grid direction="column" xs={3}>
            <MentorsTopicCard groupId={currentTopic?.mentorGroupId} />
            <AssignTeamCard teamId={currentTopic?.team?.teamId} />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
};

export default TopicDetail;
