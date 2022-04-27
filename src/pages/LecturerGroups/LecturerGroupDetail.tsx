import { Breadcrumbs, Card, Container, Grid, Link, Stack, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router';
import { getLecturerGroupById } from 'redux/LecturerGroups/api';
import { TLecturerGroup } from 'types/LecturerGroup';

import { PATH_DASHBOARD } from 'routes/paths';
import {
  AccountBalanceSharp,
  DateRangeOutlined,
  GrainOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import useSemester from 'hooks/useSemester';

import Page from '../../components/Page';
import MoreVertMenu from './component/MoreVertMenu';

function LecturerGroupDetail() {
  const { id }: any = useParams();
  console.log('id', id);
  const navigate = useNavigate();
  const semester = useSemester();

  const [currentLecturerGroup, setCurrentLecturerGroup] = useState<TLecturerGroup>();
  const { data, run } = useRequest(() => getLecturerGroupById(id), {
    refreshDeps: [id],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });
  useEffect(() => {
    if (id) {
      run();
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setCurrentLecturerGroup(data);
    }
  }, [data]);

  return (
    <Page title="LecturerGroup Detail">
      <Container style={{ minWidth: '80%', margin: '20px' }}>
        <Grid display="flex" direction="row">
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
                  navigate(PATH_DASHBOARD.topics.list);
                }}
              >
                <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                Lecturer Groups
              </Link>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                {currentLecturerGroup?.name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid direction="row" sx={{ mt: 2 }}>
          <Typography variant="h5">Lecturer Team Detail</Typography>
        </Grid>
        <Grid direction="row" display="flex" sx={{ mt: 2 }}>
          <Card style={{ width: '100%', padding: '20px' }}>
            <Grid direction="column" display="flex">
              <Grid direction="row" sx={{ mb: 2 }}>
                <Typography style={{ fontSize: '22px' }}>{currentLecturerGroup?.name}</Typography>
              </Grid>
              <Grid direction="row" display="flex" sx={{ mb: 2 }}>
                <Grid display="flex" xs={3}>
                  <AccountBalanceSharp />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {currentLecturerGroup?.department?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid direction="row" display="flex" sx={{ mt: 2 }}>
          <Card
            style={{
              boxShadow: '20',
              height: '250px',
              width: '100%'
            }}
          >
            <Typography variant="h5">Lecturers</Typography>
            <Stack direction="row" display="flex" height="200px" overflow="scroll">
              {currentLecturerGroup?.lecturerLecturerGroupMembers?.map((data) => (
                <Grid
                  display="flex"
                  style={{ margin: '20px' }}
                  justifyContent="center"
                  value={data.code}
                  key={data.code}
                >
                  <Card
                    style={{
                      borderRadius: '26px'
                    }}
                    component="span"
                    sx={{ width: 250, height: 130, p: 2, boxShadow: 16 }}
                    spacing={5}
                  >
                    <Grid display="flex" direction="row">
                      <Grid display="flex" direction="column" xs={10}>
                        <Typography sx={{ mt: 1 }} variant="subtitle1">
                          {data?.name}
                        </Typography>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          {data?.code}
                        </Typography>
                        <Typography sx={{ mt: 1 }} variant="body1">
                          {data?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}

export default LecturerGroupDetail;
