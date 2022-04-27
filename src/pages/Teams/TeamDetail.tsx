import {
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import {
  HomeOutlined,
  WhatshotOutlined,
  GrainOutlined,
  AccountBalanceSharp,
  SecurityRounded,
  DateRangeOutlined
} from '@material-ui/icons';
import { getTeamById } from 'redux/teams/api';
import { TProjects } from 'types/Projects';
import useSemester from 'hooks/useSemester';

import { getProjects } from 'redux/Projects/api';
import Page from '../../components/Page';
import { PATH_DASHBOARD } from '../../routes/paths';
import { TTeam } from '../../types/Team';
import TopicMatch from './components/TopicMatch';
import Members from './components/Members';
import Application from './components/Application';

function TeamDetail() {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const { semester } = useSemester();

  const [currentTeam, setCurrentTeam] = useState<TTeam>(null);
  const { data, run, loading } = useRequest(() => getTeamById(id!), {
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
      setCurrentTeam(data);
    }
  }, [data]);

  console.log(currentTeam);

  return (
    <Page title="FCMS | Team Detail">
      <Container style={{ margin: '20px', minWidth: '90%' }}>
        <Stack direction="column" display="flex">
          <Grid direction="row" display="flex" justifyContent="flex-start">
            <Grid direction="column" xs={11} style={{ padding: 0, lineHeight: '36px' }}>
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
                      navigate(PATH_DASHBOARD.teams.list);
                    }}
                  >
                    <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                    Teams
                  </Link>
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                  >
                    <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                    {currentTeam?.name}
                  </Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            direction="row"
            style={{ padding: 0, align: 'center', lineHeight: '36px' }}
            sx={{ mt: 2 }}
          >
            <Typography variant="h5">Team Detail</Typography>
          </Grid>
          <Grid direction="row" display="flex" sx={{ mt: 2 }}>
            <Card
              style={{
                width: '96%',
                margin: '2%',
                boxShadow: '20',
                height: '200px',
                padding: '20px'
              }}
            >
              <Grid direction="column" display="flex">
                <Grid direction="row" sx={{ mb: 2 }}>
                  <Typography style={{ fontSize: '22px' }}>{currentTeam?.name}</Typography>
                </Grid>
                <Grid direction="row" display="flex" sx={{ mb: 2 }}>
                  <Grid display="flex" xs={3}>
                    <AccountBalanceSharp />
                    {loading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {currentTeam?.department?.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid xs={2} display="flex">
                    <SecurityRounded />
                    {loading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <>
                        {currentTeam?.isPublic ? (
                          <Typography sx={{ ml: 1 }} variant="body1">
                            Public
                          </Typography>
                        ) : (
                          <Typography sx={{ ml: 1 }} variant="body1">
                            Private
                          </Typography>
                        )}
                      </>
                    )}
                  </Grid>
                </Grid>
                <Grid direction="row">
                  {loading ? (
                    <CircularProgress size={20} color="primary" />
                  ) : (
                    <>{currentTeam?.topicId === null ? <TopicMatch /> : ''}</>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid direction="row" display="flex" sx={{ mt: 1 }}>
            <Members currentTeam={currentTeam} />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default TeamDetail;
