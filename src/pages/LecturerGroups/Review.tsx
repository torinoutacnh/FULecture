/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Page } from '@react-pdf/renderer';
import ResoTable from 'components/ResoTable/ResoTable';
// material
import { Breadcrumbs, Card, Container, Grid, Link, Stack, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';

import { LecturerGroupColumns } from 'pages/LecturerGroups/config';
import { DateRangeOutlined, HomeOutlined, WhatshotOutlined } from '@material-ui/icons';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from 'hooks/useSemester';

import { getLecturerGroups } from '../../redux/LecturerGroups/api';
import SearchReviewForm from './SearchReviewForm';

export default function Review() {
  const [filters, setFilters] = useState(null);
  const tableRef = useRef();
  const { semester } = useSemester();

  const navigate = useNavigate();

  return (
    <Page title="Dashboard: Review Group | FCMS">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Grid direction="column">
            <Grid display="flex" direction="row">
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
                      navigate(PATH_DASHBOARD.LecturerGroups.list);
                    }}
                  >
                    <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                    Lecturer Group
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
                    Review Group
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid display="flex" direction="row">
              <Typography variant="h5" marginTop={2} gutterBottom>
                Review Group of {semester?.name}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchReviewForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              getData={getLecturerGroups}
              filters={filters}
              columns={LecturerGroupColumns}
              rowKey="LecturerGroupId"
              showAction={false}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
