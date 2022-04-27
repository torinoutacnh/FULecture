import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  DateRangeOutlined,
  GrainOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import Page from 'components/Page';
import useSemester from 'hooks/useSemester';
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import ResoTable from 'components/ResoTable/ResoTable';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';

import SearchInvidualForm from './SearchInvidualForm';
import { getWeeklyReports } from '../../redux/WeeklyReport/api';
import { invidualColumns } from './components/config';

function InvidualReport() {
  const [filters, setFilters] = useState();

  const { pId } = useParams();
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { semester } = useSemester();
  const tableRef = useRef();
  return (
    <Page title="FCMS | Weekly Report">
      <Container>
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
                navigate(PATH_DASHBOARD.projects.list);
              }}
            >
              <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
              Project
            </Link>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
              Weekly Report
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Stack sx={{ mt: 5 }}>
          <Grid container display="flex" direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Weekly Report</Typography>
            </Grid>
          </Grid>
          <Grid sx={{ mt: 5 }} display="flex" direction="column">
            <SearchInvidualForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              showAction={false}
              getData={getWeeklyReports}
              filters={filters}
              columns={invidualColumns}
              rowKey="id"
            />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default InvidualReport;
