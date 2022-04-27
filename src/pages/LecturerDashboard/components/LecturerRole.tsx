import { Card, CircularProgress, Grid, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';
import useSemester from 'hooks/useSemester';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState, useEffect } from 'react';
import { getLecturerDepartments } from 'redux/LecturerDepartment/api';
import { getLecturerGroups } from '../../../redux/LecturerGroups/api';

function LecturerRole() {
  const { user } = useAuth();
  const { semester } = useSemester();
  const [isReviewer, setIsReviewer] = useState(false);

  const {
    run,
    loading,
    data: LecturerDepartmentData
  } = useRequest(() => getLecturerDepartments({ lectureId: user?.zipCode, isApprover: true }), {
    refreshDeps: [1],
    formatResult: (res) => res.data.result
  });

  const {
    data: reviewerData,
    loading: reviewerLoading,
    run: reviewerRun
  } = useRequest(
    () =>
      getLecturerGroups({
        semesterId: semester.semesterId,
        type: 3
      }),
    {
      formatResult: (res) => res.data.result[0]
    }
  );

  useEffect(() => {
    if (
      reviewerData?.lecturerGroupMembersDetails?.find(
        (value) => value.lecturerId === user?.zipCode
      ) !== undefined
    ) {
      setIsReviewer(true);
    }
  }, [reviewerData]);
  return (
    <Card sx={{ width: '100%' }}>
      <CardTitle>
        <Typography variant="subtitle1">Lecturer Role</Typography>
      </CardTitle>
      <Stack display="flex" direction="row">
        {loading || reviewerLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Grid>
            {LecturerDepartmentData?.length > 0 ? <Label color="error">Approver</Label> : ''}
            {isReviewer ? (
              <Label sx={{ ml: 1 }} color="info">
                Reviewer
              </Label>
            ) : (
              ''
            )}
            <Label sx={{ ml: 1 }} color="warning">
              Lecturer
            </Label>
          </Grid>
        )}
      </Stack>
    </Card>
  );
}

export default LecturerRole;
