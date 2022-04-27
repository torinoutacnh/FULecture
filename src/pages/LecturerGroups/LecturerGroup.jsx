/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Page } from '@react-pdf/renderer';
import ResoTable from 'components/ResoTable/ResoTable';
// material
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Link,
  Stack,
  Typography
} from '@material-ui/core';
import { useNavigate } from 'react-router';

import { LecturerGroupColumns } from 'pages/LecturerGroups/config';
import { useSnackbar } from 'notistack5';
import { DateRangeOutlined, HomeOutlined, WhatshotOutlined } from '@material-ui/icons';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from 'hooks/useSemester';

import { getLecturerGroups } from '../../redux/LecturerGroups/api';
import SearchLecturerGroupForm from './SearchLecturerGroupForm';

export default function LecturerGroup() {
  const [filters, setFilters] = useState(null);
  const [formModal, setFormModal] = useState(false);
  const tableRef = useRef();
  const { semester } = useSemester();

  const navigate = useNavigate();

  return (
    <Page title="Dashboard: Lecturer Group | FCMS">
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
                    Lecturer Groups
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
                    Councils
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid display="flex" direction="row">
              <Typography variant="h5" marginTop={2} gutterBottom>
                Councils of {semester?.name}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchLecturerGroupForm onChange={setFilters} />
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
