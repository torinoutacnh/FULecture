import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Card, Container, Grid, Stack, Typography, Avatar } from '@material-ui/core';
import { CardTitle } from 'pages/Products/components/Card';
import useAuth from 'hooks/useAuth';
import { TLecturer } from 'types/lecturer';
import { useRequest } from 'ahooks';

import { getLecturerById } from '../redux/lecturers/api';

function LecturerProfile() {
  const { user } = useAuth();

  const { data, run, loading } = useRequest(() => getLecturerById(user?.zipCode), {
    refreshDeps: [user?.zipCode],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });

  console.log('lecturer', data);
  return (
    <Page title="FMCS | Profile">
      <Container>
        <Stack display="flex" direction="column">
          <Grid display="flex" direction="row">
            Breadcums
          </Grid>
          <Grid display="flex" direction="row">
            <Grid xs={4} display="flex" direction="column">
              <Card>
                <CardTitle>
                  <Avatar alt="No Image">{data?.name.charAt(0)}</Avatar>
                </CardTitle>
              </Card>
            </Grid>
            <Grid xs={8} display="flex" direction="column">
              avaa
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default LecturerProfile;
