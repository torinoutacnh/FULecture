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
import { useSnackbar } from 'notistack5';
import TeamModal from 'components/TeamModal';
import { useSelector } from 'redux/store';
import { useNavigate } from 'react-router';
import { DateRangeOutlined, HomeOutlined, WhatshotOutlined } from '@material-ui/icons';
import { PATH_DASHBOARD } from 'routes/paths';
import useSemester from 'hooks/useSemester';

import { TeamColumns } from './config';

import { getTeams } from '../../redux/teams/api';
import SearchTeamForm from './SearchTeamForm';

export default function Teams() {
  const [filters, setFilters] = useState(null);

  const [formModal, setFormModal] = useState(false);
  const tableRef = useRef();
  const { semester } = useSemester();
  const navigate = useNavigate();

  return (
    <Page title="Dashboard: Team | FCMS">
      <TeamModal
        open={formModal}
        onClose={() => {
          setFormModal(false);
        }}
      />

      <Container style={{ padding: 0, width: '90%' }}>
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
                      navigate(PATH_DASHBOARD.topics.list);
                    }}
                  >
                    <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                    Teams
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
                    All Teams
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid display="flex" direction="row">
              <Typography variant="h5" marginTop={2} gutterBottom>
                Teams of {semester?.name}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <SearchTeamForm onChange={setFilters} />
            <ResoTable
              ref={tableRef}
              pagination
              getData={getTeams}
              filters={filters}
              columns={TeamColumns}
              rowKey="teamId"
              showAction={false}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
