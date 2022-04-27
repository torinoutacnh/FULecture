import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Tooltip
} from '@material-ui/core';
import { Assignment, CallMadeOutlined, KeyboardArrowUp } from '@material-ui/icons';
import { useNavigate } from 'react-router';

import { CardTitle } from 'pages/Products/components/Card';
import React, { useEffect, useState } from 'react';
import { PATH_DASHBOARD } from 'routes/paths';
import { useRequest } from 'ahooks';
import useSemester from 'hooks/useSemester';

import { getLecturerDepartments } from '../../../redux/LecturerDepartment/api';
import useAuth from '../../../hooks/useAuth';

function QuickAction() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { semester } = useSemester();

  const [isActive, setIsActive] = useState<Boolean>();

  useEffect(() => {
    if (new Date() > new Date(semester?.inProgressDate)) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [semester]);

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
    <Card style={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Quick Action </Typography>
      </CardTitle>
      <Stack
        display="flex"
        direction="row"
        container
        justifyContent="center"
        alignItems="center"
        spacing={4}
        style={{ height: '130px', width: '96%' }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {LecturerDepartmentData?.length > 0 ? (
              <Grid direction="column" xs={5}>
                {isActive ? (
                  <Tooltip describeChild title="Navigate to list of topics need approved.">
                    <IconButton
                      onClick={() => {
                        navigate(PATH_DASHBOARD.topics.TopicApproving);
                      }}
                      style={{
                        backgroundColor: '#F64E60',
                        color: 'white',
                        borderRadius: '10px',
                        height: '90px',
                        width: '120px'
                      }}
                    >
                      <CallMadeOutlined />
                      <Typography variant="body2">Approve topics</Typography>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    onClick={() => {
                      navigate(PATH_DASHBOARD.topics.TopicApproving);
                    }}
                    disabled={true}
                    style={{
                      backgroundColor: '#F64E60',
                      color: 'white',
                      borderRadius: '10px',
                      height: '90px',
                      width: '120px',
                      opacity: '0.4'
                    }}
                  >
                    <CallMadeOutlined />
                    <Typography variant="body2">Approve topics</Typography>
                  </IconButton>
                )}
              </Grid>
            ) : (
              <Grid direction="column" xs={5}>
                <Tooltip describeChild title="Navigate to submitted topics page.">
                  <IconButton
                    onClick={() => {
                      navigate(PATH_DASHBOARD.topics.submitted);
                    }}
                    style={{
                      backgroundColor: '#379AFF',
                      color: 'white',
                      borderRadius: '10px',
                      height: '90px',
                      width: '120px'
                    }}
                  >
                    <Assignment />
                    <Typography variant="body2">My Topic</Typography>
                  </IconButton>
                </Tooltip>
              </Grid>
            )}

            <Grid direction="column" xs={5} sx={{ ml: 2 }}>
              {isActive ? (
                <Tooltip describeChild title="Create a new topic in this semester.">
                  <IconButton
                    onClick={() => {
                      navigate(PATH_DASHBOARD.topics.addTopic);
                    }}
                    style={{
                      backgroundColor: '#1BC5BD',
                      color: 'white',
                      borderRadius: '10px',
                      height: '90px',
                      width: '120px'
                    }}
                  >
                    <KeyboardArrowUp />
                    <Typography variant="body2">Submit topic</Typography>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip
                  describeChild
                  title="Lecturer can only add topic is assigning phase of semester."
                >
                  <IconButton
                    disabled={true}
                    onClick={() => {
                      navigate(PATH_DASHBOARD.topics.addTopic);
                    }}
                    style={{
                      backgroundColor: '#1BC5BD',
                      color: 'white',
                      borderRadius: '10px',
                      height: '90px',
                      width: '120px',
                      opacity: '0.4'
                    }}
                  >
                    <KeyboardArrowUp />
                    <Typography variant="body2">Submit topic</Typography>
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </>
        )}{' '}
      </Stack>
    </Card>
  );
}

export default QuickAction;
