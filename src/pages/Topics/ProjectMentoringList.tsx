import React, { useRef, useState } from 'react';
import { Card, Container, Stack, Typography, Grid, Breadcrumbs, Link } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined } from '@material-ui/icons';

import ResoTable from 'components/ResoTable/ResoTable';
import { getTopics } from 'redux/topic/api';

import useSemester from 'hooks/useSemester';

import { projectColumns } from './projectconfig';

import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';
import SearchMentoringForm from './SearchMentoring';

export default function ProjectMentoringList() {
  const [filters, setFilters] = useState();

  const navigate = useNavigate();
  const tableRef = useRef();

  const semester = useSemester();

  return (
    <Page title="Dashboard: Topic Mentoring | FCMS">
      <Container>
        <Stack
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={4}
          spacing={4}
        >
          <Grid display="column" xs={12}>
            <Grid display="flex" direction="row">
              <Grid direction="column" xs={10}>
                <Grid role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.semester.root);
                      }}
                    >
                      <HomeOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Semester
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.root);
                      }}
                    >
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
                      My Project
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
                      Mentoring Project
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row">
                    <Typography variant="h5" gutterBottom>
                      Mentoring Projects of {semester?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchMentoringForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              getData={getTopics}
              filters={filters}
              showAction={false}
              columns={projectColumns}
              rowKey="topicId"
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
