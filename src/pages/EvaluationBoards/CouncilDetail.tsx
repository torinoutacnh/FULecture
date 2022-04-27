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
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useNavigate } from 'react-router';
import { getLecturerGroupById } from 'redux/LecturerGroups/api';
import { TLecturerGroup } from 'types/LecturerGroup';
import ResoTable from 'components/ResoTable/ResoTable';

import { PATH_DASHBOARD } from 'routes/paths';
import {
  AccountBalanceSharp,
  DateRangeOutlined,
  GrainOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import moment from 'moment';
import useSemester from 'hooks/useSemester';
import { getEvaluations } from 'redux/Evaluations/api';

import { TeamsCouncilColumns } from './teamconfig';
import Page from '../../components/Page';
import CouncilMembersCard from './components/CouncilMembersCard';
import SearchTeamsForm from './SearchTeamsForm';
import { getTeams } from '../../redux/teams/api';

function CouncilDetail() {
  const { id }: any = useParams();
  const { boardId }: any = useParams();
  console.log('boardId', boardId);
  const [filters, setFilters] = useState();
  const tableRef = useRef();

  // console.log('id', id);
  const navigate = useNavigate();
  const semester = useSemester();

  const { data, run } = useRequest(() => getLecturerGroupById(id), {
    refreshDeps: [id],
    formatResult: (res) => {
      console.log(res.data);
      return res.data;
    }
  });

  const {
    loading: evaluationLoading,
    data: evaluationData,
    run: getEvaluationData
  } = useRequest(() => getEvaluations({ LecturerGroupId: id, EvaluationBoardId: boardId }), {
    refreshDeps: [id],
    formatResult: (res) => {
      console.log(res.data.result);
      return res.data.result;
    }
  });

  useEffect(() => {
    if (id) {
      run();
    }
  }, [id]);

  console.log('evaluationData', evaluationData);
  return (
    <Page title="LecturerGroup Detail | FCMS">
      <Container style={{ minWidth: '95%' }}>
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
                  navigate(PATH_DASHBOARD.EvaluationBoards.list);
                }}
              >
                <WhatshotOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                Evaluation Boards
              </Link>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <GrainOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
                {data?.name}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid direction="row" sx={{ mt: 2 }}>
          <Typography variant="h5">Council Detail</Typography>
        </Grid>
        <Grid direction="row" display="flex" sx={{ mt: 2 }}>
          <Grid direction="column" xs={3}>
            <Card style={{ height: '250px' }}>
              {evaluationLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <Grid direction="column" display="flex">
                    <Grid direction="row" sx={{ mb: 2 }}>
                      <Typography variant="h6">{data?.name}</Typography>
                    </Grid>
                    <Grid direction="row" display="flex" sx={{ mb: 2 }}>
                      <Grid display="flex">
                        <AccountBalanceSharp />
                        <Typography variant="subtitle2" sx={{ ml: 1 }}>
                          Dept: {data?.department?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid direction="row" display="flex" sx={{ mb: 2 }}>
                      <Grid display="flex">
                        <Typography variant="subtitle2">Start time:</Typography>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {moment(new Date(evaluationData[0]?.evaluateDueDate)).format(
                            'DD MMM, YYYY'
                          )}
                          ,
                        </Typography>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {new Date(evaluationData[0]?.evaluateDueDate).toLocaleTimeString()}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid direction="row" display="flex" sx={{ mb: 2 }}>
                      <Grid display="flex">
                        <Typography variant="subtitle2">End time:</Typography>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {moment(
                            new Date(evaluationData[evaluationData.length - 1]?.evaluateDueDate)
                          ).format('DD MMM, YYYY')}
                          ,
                        </Typography>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {new Date(
                            new Date(
                              evaluationData[evaluationData.length - 1]?.evaluateDueDate
                            ).setMinutes(
                              new Date(
                                evaluationData[evaluationData.length - 1]?.evaluateDueDate
                              ).getMinutes() + 90
                            )
                          ).toLocaleTimeString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Card>
          </Grid>
          <Grid direction="column" xs={9}>
            <Grid direction="row" display="flex" sx={{ ml: 2 }}>
              <CouncilMembersCard id={id} />
            </Grid>
          </Grid>
        </Grid>
        {/* Resotale show team list  */}
        <Grid direction="row" display="flex" sx={{ mt: 2 }}>
          <Card style={{ padding: '1em', width: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="h6">Capstone teams in this council</Typography>
              <SearchTeamsForm onChange={setFilters} />
              <ResoTable
                ref={tableRef}
                pagination
                showAction={false}
                getData={getTeams}
                filters={filters}
                columns={TeamsCouncilColumns}
                rowKey="evaluationBoardId"
              />
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}

export default CouncilDetail;
