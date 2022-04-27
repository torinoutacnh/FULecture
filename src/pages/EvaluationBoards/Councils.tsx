import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  CircularProgress
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router';
import { HomeOutlined, WhatshotOutlined, DateRangeOutlined } from '@material-ui/icons';
import Icon from '@iconify/react';
import moment from 'moment';
import plusFill from '@iconify/icons-eva/plus-fill';
import ResoTable from 'components/ResoTable/ResoTable';

import useSemester from 'hooks/useSemester';
import { getEvaluationBoardById, getEvaluationBoards } from 'redux/EvaluationBoards/api';
import { useRequest } from 'ahooks';
import useAuth from 'hooks/useAuth';

import { councilColumns } from './councilconfig';

import { PATH_DASHBOARD } from '../../routes/paths';

import Page from '../../components/Page';
import SearchEvaluationBoardForm from './SearchEvaluationBoardForm';
import EvaluationBoardCard from './components/EvaluationBoardCard';
import TeamsCard from './components/TeamsCard';
import { getLecturerGroups } from '../../redux/LecturerGroups/api';
import SearchLecturerGroupsForm from './SearchLecturerGroupsForm';

export default function Councils() {
  const { user } = useAuth();
  const [filters, setFilters] = useState();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const tableRef = useRef();
  const { id } = useParams();
  console.log('evaluationBoardId', id);
  console.log('userId', user?.zipCode);

  const { data, run, loading } = useRequest(() => getEvaluationBoardById(id), {
    refreshDeps: [id],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });
  return (
    <Page title="Evaluations | FCMS">
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
                        navigate(PATH_DASHBOARD.EvaluationBoards.list);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Evaluation Boards
                    </Link>
                    <Link
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center' }}
                      color="inherit"
                      href="#"
                      onClick={() => {
                        navigate(PATH_DASHBOARD.EvaluationBoards.councils);
                      }}
                    >
                      <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                      Evaluations
                    </Link>
                  </Breadcrumbs>
                  <Grid marginTop={1} display="flex" direction="row">
                    <Typography variant="h6">Evaluations</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Stack>

        <Stack spacing={5} display="flex" direction="row" style={{ marginTop: '20px' }}>
          <Grid xs={10} display="flex" direction="column">
            <Card style={{ padding: '1em' }}>
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <Typography variant="subtitle1" style={{ color: '#0A172E' }}>
                  {data?.name}
                </Typography>
              )}
            </Card>
            <Card sx={{ mt: 2 }} style={{ padding: '1em' }}>
              <Typography variant="h5" gutterBottom>
                Councils
              </Typography>
              <Stack spacing={2}>
                <SearchLecturerGroupsForm onChange={setFilters} />
                <ResoTable
                  ref={tableRef}
                  pagination
                  showAction={false}
                  getData={getLecturerGroups}
                  filters={filters}
                  columns={councilColumns}
                  rowKey="lecturerGroupId"
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={2} display="flex" direction="column" spacing={2}>
            <EvaluationBoardCard />
            <TeamsCard />
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}
