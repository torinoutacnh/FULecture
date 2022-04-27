import {
  ContactsOutlined,
  DateRangeOutlined,
  HomeOutlined,
  WhatshotOutlined
} from '@material-ui/icons';
import { useRequest } from 'ahooks';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CardTitle } from 'pages/Products/components/Card';

import {
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CircularProgress,
  Breadcrumbs,
  Link,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  TextField,
  Button
} from '@material-ui/core';
import moment from 'moment';
import useSemester from 'hooks/useSemester';
import { PATH_DASHBOARD } from 'routes/paths';
import { get } from 'lodash';

import { getEvaluationBoardById } from 'redux/EvaluationBoards/api';
import { getMarkColumns } from 'redux/MarkColumns/api';

import { InputField } from 'components/form';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useAuth from 'hooks/useAuth';
import { getLecturerGroupMembers } from 'redux/LecturerGroupMember/api';

import { addMarkList, addMarkTeam, getMarks } from 'redux/Marks/api';
import { useSnackbar } from 'notistack5';
import { getLecturerGroupById } from 'redux/LecturerGroups/api';
import { getStudentInTeams } from 'redux/StudentInTeams/api';
import { getCheckpointById, getCheckpoints } from '../../redux/checkpoints/api';
import { approveEvaluation, getEvaluations } from '../../redux/Evaluations/api';

import { getTeamById } from '../../redux/teams/api';
import Page from '../../components/Page';
import MarkOrder from './MarkOrder';
import AddMarkTeamDialog from './components/AddMarkTeamDialog';

function Marks() {
  const { user } = useAuth();
  const { teamId } = useParams();
  const { boardId } = useParams();
  const { councilId } = useParams();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  console.log('teamId', teamId);
  console.log('boardId', boardId);
  console.log('councilId', councilId);

  const [tableData, setTableData] = useState();
  const [OpenDialog, setOpenDialog] = useState(false);
  const tableRef = useRef();
  const [currentCheckpoint, setCurrentCheckpoint] = useState();
  const [MarkArray, setMarkArray] = useState([]);
  const [MarkTeamArray, setMarkTeamArray] = useState([]);
  const [currentMarkColumns, setCurrentMarkColumns] = useState();

  const {
    loading: teamLoading,
    data: teamData,
    run: getTeamMembers
  } = useRequest(() => getStudentInTeams({ teamId, status: 1 }), {
    refreshDeps: [teamId],
    formatResult: (res) => res.data.result
  });
  const { loading: teamDataLoading, data: team } = useRequest(() => getTeamById(teamId), {
    refreshDeps: [teamId],
    formatResult: (res) => res.data
  });

  const { data: evaluationBoardData } = useRequest(() => getEvaluationBoardById(boardId), {
    refreshDeps: [boardId],
    formatResult: (res) => res.data
  });

  const { data: lecturerGroupData, run: getLecturerGroupRun } = useRequest(
    () => getLecturerGroupById(councilId),
    {
      refreshDeps: [councilId],
      formatResult: (res) => res.data
    }
  );

  const {
    loading: checkpointDataLoading,
    run: getCheckpointData,
    data: checkpointData
  } = useRequest(() => getCheckpointById(evaluationBoardData?.checkpointId), {
    refreshDeps: [evaluationBoardData?.checkpointId],
    formatResult: (res) => res.data
  });
  const {
    loading: MarkColunmLoading,
    run: getmarkColumnsData,
    data: markColumnsData = []
  } = useRequest(() => getMarkColumns({ CheckPointId: checkpointData?.checkpointId }), {
    refreshDeps: [currentCheckpoint?.checkpointId],
    formatResult: (res) => res.data.result
  });
  const {
    loading: evaluationLoading,
    run: getEvaluationsData,
    data: evaluationsData = []
  } = useRequest(
    () =>
      getEvaluations({
        LecturerGroupId: councilId,
        EvaluationBoardId: boardId,
        TopicId: team?.topicId
      }),
    {
      formatResult: (res) => res.data.result[0]
    }
  );
  const {
    loading: MarkLoading,
    run: getListMarkData,
    data: listMarkData
  } = useRequest(
    () => getMarks({ evaluationId: evaluationsData?.evaluationId, lecturerId: user?.zipCode }),
    {
      refreshDeps: [boardId],
      formatResult: (res) => {
        setMarkArray(res.data.result);
        return res.data.result;
      }
    }
  );

  const handleApprove = (evaluationId) =>
    approveEvaluation(evaluationId)
      .then(() =>
        enqueueSnackbar(`Approve Success!`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], err);
        console.log(err);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const {
    loading: MarkOtherLoading,
    run: getListMarkOtherData,
    data: listMarkOtherData
  } = useRequest(() => getMarks({ EvaluationId: evaluationsData?.evaluationId }), {
    refreshDeps: [boardId],
    formatResult: (res) => res.data.result
  });

  const {
    loading: CouncilLeaderLoading,
    run: CouncilLeaderRun,
    data: CouncilLeaderData
  } = useRequest(
    () =>
      getLecturerGroupMembers({
        lecturerId: user?.zipCode,
        lecturerGroupId: lecturerGroupData?.lecturerGroupId
      }),
    {
      formatResult: (res) => res.data.result[0]
    }
  );

  console.log('lecturerGroupData Id:', lecturerGroupData?.lecturerGroupId);
  // console.log('listMarkOtherData', listMarkOtherData);
  // console.log('evaluationBoardData', evaluationBoardData);
  // console.log('currentCheckpoint', checkpointData);

  // console.log('currentMarkColumns', markColumnsData);
  // console.log('teamsData', teamData);
  console.log('evaluationsData', evaluationsData);
  // console.log('markdata', MarkArray);
  console.log('isCouncilLeaderData', CouncilLeaderData);
  useEffect(() => {
    if (evaluationBoardData) {
      getCheckpointData();
    }
  }, [evaluationBoardData]);

  useEffect(() => {
    if (checkpointData) {
      getmarkColumnsData();
    }
  }, [checkpointData]);

  useEffect(() => {
    if (team) {
      getEvaluationsData();
    }
  }, [team]);

  useEffect(() => {
    if (teamId) {
      getTeamMembers();
    }
  }, [teamId]);

  useEffect(() => {
    if (evaluationsData) {
      getListMarkData();
      getListMarkOtherData();
    }
  }, [evaluationsData]);

  useEffect(() => {
    if (councilId) {
      getLecturerGroupRun();
    }
  }, [councilId]);

  useEffect(() => {
    if (lecturerGroupData && user) {
      CouncilLeaderRun();
    }
  }, [lecturerGroupData, user]);

  const onSubmitMarks = () =>
    addMarkList(MarkArray)
      .then((res) => {
        enqueueSnackbar(`Add marks successful!`, {
          variant: 'success'
        });
      })
      .then(() => {
        getListMarkData();
      })
      .then(() => {
        setOpenDialog(false);
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error'
        });
      });

  const onSubmitTeamMarks = () => {
    MarkTeamArray?.map((value) => {
      teamData?.map(({ student: { studentId: SId } }) => {
        const TMark = {
          markId: null,
          studentId: SId,
          markColumnId: value.markColumnId,
          lecturerId: user?.zipCode,
          evaluationId: evaluationsData.evaluationId,
          value: value.value
        };
        if (
          MarkArray.find(
            (values) =>
              values.studentId === SId &&
              values.markColumnId === TMark.markColumnId &&
              values.lecturerId === user?.zipCode
          ) != null
        ) {
          TMark.markId = MarkArray.find(
            (values) =>
              values.studentId === SId &&
              values.markColumnId === TMark.markColumnId &&
              values.lecturerId === user?.zipCode
          ).markId;
          MarkArray.splice(
            MarkArray.indexOf(
              MarkArray.find(
                (values) =>
                  values.studentId === SId &&
                  values.markColumnId === TMark.markColumnId &&
                  values.lecturerId === user?.zipCode
              )
            ),
            1,
            TMark
          );
        } else {
          MarkArray.push(TMark);
        }
      });
    });
    console.log('teamMarkArray', MarkTeamArray);
    console.log('markArray', MarkArray);
    setOpenDialog(true);
  };

  const onMarkChange = (SId, MId, values) => {
    if (values > 10) {
      values = 10;
    }
    const TMark = {
      markId: null,
      studentId: SId,
      markColumnId: MId,
      lecturerId: user?.zipCode,
      evaluationId: evaluationsData.evaluationId,
      value: values
    };

    if (MarkArray.find((value) => value.studentId === SId && value.markColumnId === MId) != null) {
      if (
        MarkArray.find((value) => value.studentId === SId && value.markColumnId === MId).markId !=
        null
      ) {
        TMark.markId = MarkArray.find(
          (value) => value.studentId === SId && value.markColumnId === MId
        ).markId;
      }
      MarkArray.splice(
        MarkArray.indexOf(
          MarkArray.find((value) => value.studentId === SId && value.markColumnId === MId)
        ),
        1,
        TMark
      );
    } else {
      MarkArray.push(TMark);
    }
    console.log('TMark', TMark);
  };

  const onSubmit = (values) => {
    let maxPercent = 0;
    teamData?.map(({ student: { name } }) => {
      maxPercent += parseInt(values[name], 10);
    });
    console.log('percent', maxPercent);
    if (maxPercent > 100 || maxPercent < 100) {
      return enqueueSnackbar(`Total Percent of all members must equal 100%`, {
        variant: 'error'
      });
    }

    teamData?.map(({ student: { studentId, name } }) => {
      MarkArray.filter((value) => value.studentId === studentId)?.map((value) => {
        const TMark = value;
        TMark.value = Number.parseFloat(
          TMark.value * teamData?.length * (values[name] / 100)
        ).toFixed(1);

        if (TMark.value > 10) {
          TMark.value = 10;
        }

        if (
          MarkArray.find(
            (value) => value.studentId === studentId && value.markColumnId === TMark.markColumnId
          ) != null
        ) {
          MarkArray.splice(
            MarkArray.indexOf(
              MarkArray.find(
                (value) =>
                  value.studentId === studentId && value.markColumnId === TMark.markColumnId
              )
            ),
            1,
            TMark
          );
        } else {
          MarkArray.push(TMark);
        }
      });
    });
    console.log('add mark', MarkArray);
    console.log('ec ec mark', listMarkOtherData);
    return onSubmitMarks();
  };

  const onMarkTeamChange = (MId, values) => {
    const TMark = {
      markColumnId: MId,
      lecturerId: user?.zipCode,
      evaluationId: evaluationsData.evaluationId,
      value: values
    };
    if (MarkTeamArray.find((value) => value.markColumnId === MId) != null) {
      MarkTeamArray.splice(
        MarkTeamArray.indexOf(MarkTeamArray.find((value) => value.markColumnId === MId)),
        1,
        TMark
      );
    } else {
      MarkTeamArray.push(TMark);
    }
  };

  const Average = (studentId, lecturerId) => {
    let sum = 0;
    listMarkOtherData
      ?.filter(
        (mark) =>
          mark.studentId === studentId &&
          mark.evaluationId === evaluationsData?.evaluationId &&
          mark.lecturerId === lecturerId
      )
      ?.map((mark) => {
        const markColumn = markColumnsData?.find(
          (markColumn) => markColumn.markColumnId === mark.markColumnId
        );
        sum += parseFloat(mark.value) * parseFloat(markColumn?.weight);
      });
    return Number.parseFloat(sum / 100).toFixed(1);
  };
  return (
    <Page title="FMCS | Marks">
      <AddMarkTeamDialog
        open={OpenDialog}
        teamData={teamData}
        onClose={() => setOpenDialog(false)}
        onSubmit={onSubmit}
      />
      <Container style={{ minWidth: '95%' }}>
        <Grid role="presentation">
          <Grid
            xs={8.5}
            marginTop={1}
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h5" gutterBottom>
              Marks of {team?.name}
            </Typography>
            <Grid display="flex">
              <LoadingAsyncButton onClick={() => onSubmitMarks()} variant="contained">
                Submit
              </LoadingAsyncButton>
              <LoadingAsyncButton
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => onSubmitTeamMarks()}
                variant="contained"
              >
                Auto Evaluate
              </LoadingAsyncButton>
            </Grid>
          </Grid>
        </Grid>
        <Stack sx={{ mt: 4 }} display="flex" direction="row" spacing={5}>
          <Grid xs={9} display="flex" direction="column">
            <Card>
              <Stack display="flex" direction="row" justifyContent="space-between">
                {evaluationLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    <Grid sx={{ pl: 2 }}>
                      <Typography variant="h6">
                        Checkpoint: {checkpointData?.description}
                      </Typography>
                    </Grid>
                    <Grid sx={{ pr: 2 }} display="flex" direction="column">
                      <Grid display="flex" direction="row">
                        {' '}
                        <Typography variant="subtitle1">Start: </Typography>
                        <Typography
                          sx={{ ml: 1 }}
                          variant="subtitle1"
                          style={{ wordWrap: 'break-word' }}
                        >
                          {moment(new Date(evaluationsData?.evaluateDueDate)).format('DD/MM/YYYY')},
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                          {new Date(evaluationsData?.evaluateDueDate).toLocaleTimeString()}
                        </Typography>
                      </Grid>
                      <Grid display="flex" direction="row">
                        {' '}
                        <Typography variant="subtitle1">End: </Typography>
                        <Typography
                          sx={{ ml: 1 }}
                          variant="subtitle1"
                          style={{ wordWrap: 'break-word' }}
                        >
                          {moment(new Date(evaluationsData?.evaluateDueDate)).format('DD/MM/YYYY')},
                        </Typography>
                        <Typography variant="subtitle1" sx={{ ml: 1 }}>
                          {new Date(
                            new Date(evaluationsData?.evaluateDueDate).setMinutes(
                              new Date(evaluationsData?.evaluateDueDate).getMinutes() + 90
                            )
                          ).toLocaleTimeString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Stack>
            </Card>
            <Card sx={{ mt: 5 }} style={{ padding: '15px' }}>
              {teamLoading || checkpointDataLoading || MarkColunmLoading || MarkLoading ? (
                <CircularProgress size={20} />
              ) : (
                <>
                  <TableContainer>
                    <Table aria-label="customized table">
                      <TableHead
                        style={{ borderWidth: '1px', borderColor: '#aaaaaa', borderStyle: 'solid' }}
                      >
                        <TableRow
                          style={{
                            borderWidth: '1px',
                            borderColor: '#aaaaaa',
                            borderStyle: 'solid'
                          }}
                        >
                          <TableCell
                            style={{
                              borderWidth: '1px',
                              borderColor: '#aaaaaa',
                              borderStyle: 'solid'
                            }}
                            variant="body"
                            align="center"
                          >
                            <Typography variant="h6">Components</Typography>
                          </TableCell>
                          <TableCell
                            variant="body"
                            style={{
                              borderWidth: '1px',
                              borderColor: '#aaaaaa',
                              borderStyle: 'solid'
                            }}
                            align="center"
                          >
                            <Typography variant="h6">Criteria Name</Typography>
                          </TableCell>

                          <TableCell
                            variant="body"
                            style={{
                              borderWidth: '1px',
                              borderColor: '#aaaaaa',
                              borderStyle: 'solid'
                            }}
                            align="center"
                          >
                            <Typography variant="h6">Weight</Typography>
                          </TableCell>
                          <TableCell
                            variant="body"
                            style={{
                              borderWidth: '1px',
                              borderColor: '#aaaaaa',
                              borderStyle: 'solid'
                            }}
                            align="center"
                          >
                            <Typography variant="h6">Team</Typography>
                          </TableCell>
                          {teamData?.map(({ student: { studentId, name } }) => {
                            if (teamData != null) {
                              return (
                                <TableCell
                                  variant="body"
                                  style={{
                                    borderWidth: '1px',
                                    borderColor: '#aaaaaa',
                                    borderStyle: 'solid'
                                  }}
                                  align="center"
                                >
                                  <Typography variant="h6">{name}</Typography>
                                </TableCell>
                              );
                            }
                            return '';
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody
                        style={{ borderWidth: '1px', borderColor: '#aaaaaa', borderStyle: 'solid' }}
                      >
                        {markColumnsData?.map(
                          ({ markColumnId, name, weight, displayOrder }, Mindex) => (
                            <TableRow
                              style={{
                                borderWidth: '1px',
                                borderColor: '#aaaaaa',
                                borderStyle: 'solid'
                              }}
                              key={markColumnId}
                            >
                              <TableCell align="center">
                                <Typography variant="subtitle1">{displayOrder}</Typography>
                              </TableCell>
                              <TableCell
                                style={{
                                  borderWidth: '1px',
                                  borderColor: '#aaaaaa',
                                  borderStyle: 'solid'
                                }}
                                align="center"
                              >
                                <Typography variant="subtitle1">{name}</Typography>
                              </TableCell>

                              <TableCell
                                style={{
                                  borderWidth: '1px',
                                  borderColor: '#aaaaaa',
                                  borderStyle: 'solid'
                                }}
                                align="center"
                              >
                                <Typography variant="subtitle1">{weight}%</Typography>
                              </TableCell>
                              <TableCell
                                style={{
                                  borderWidth: '1px',
                                  borderColor: '#aaaaaa',
                                  borderStyle: 'solid'
                                }}
                                align="right"
                              >
                                <TextField
                                  fullWidth
                                  size="small"
                                  onChange={(event) =>
                                    onMarkTeamChange(markColumnId, event.target.value)
                                  }
                                />
                              </TableCell>
                              {teamData?.map(({ student: { studentId, name } }, Sindex) => (
                                <TableCell
                                  style={{
                                    borderWidth: '1px',
                                    borderColor: '#aaaaaa',
                                    borderStyle: 'solid'
                                  }}
                                  align="right"
                                  key={studentId}
                                >
                                  <TextField
                                    name="value"
                                    fullWidth
                                    defaultValue={
                                      MarkArray?.find(
                                        (value) =>
                                          value.lecturerId === user?.zipCode &&
                                          value.studentId === studentId &&
                                          value.markColumnId === markColumnId
                                      )?.value
                                    }
                                    size="small"
                                    onChange={(event) =>
                                      onMarkChange(studentId, markColumnId, event.target.value)
                                    }
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Card>
            {CouncilLeaderData?.isLeader === true ? (
              <>
                {lecturerGroupData?.lecturerGroupMembersDetails?.map((lecturer) => {
                  if (lecturer.lecturerId !== user?.zipCode) {
                    return (
                      <Card sx={{ mt: 5 }}>
                        <CardTitle>
                          <Typography variant="subtitle1"> {lecturer.name} Evaluation</Typography>
                        </CardTitle>
                        {teamLoading ||
                        checkpointDataLoading ||
                        MarkColunmLoading ||
                        MarkLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <>
                            <TableContainer>
                              <Table aria-label="customized table">
                                <TableHead
                                  style={{
                                    borderWidth: '1px',
                                    borderColor: '#aaaaaa',
                                    borderStyle: 'solid'
                                  }}
                                >
                                  <TableRow
                                    style={{
                                      borderWidth: '1px',
                                      borderColor: '#aaaaaa',
                                      borderStyle: 'solid'
                                    }}
                                  >
                                    <TableCell
                                      style={{
                                        borderWidth: '1px',
                                        borderColor: '#aaaaaa',
                                        borderStyle: 'solid'
                                      }}
                                      variant="body"
                                      align="center"
                                    >
                                      <Typography variant="h6">Components</Typography>
                                    </TableCell>
                                    <TableCell
                                      variant="body"
                                      style={{
                                        borderWidth: '1px',
                                        borderColor: '#aaaaaa',
                                        borderStyle: 'solid'
                                      }}
                                      align="center"
                                    >
                                      <Typography variant="h6">Criteria Name</Typography>
                                    </TableCell>

                                    <TableCell
                                      variant="body"
                                      style={{
                                        borderWidth: '1px',
                                        borderColor: '#aaaaaa',
                                        borderStyle: 'solid'
                                      }}
                                      align="center"
                                    >
                                      <Typography variant="h6">Weight</Typography>
                                    </TableCell>

                                    {teamData?.map(({ student: { studentId, name } }) => {
                                      if (teamData != null) {
                                        return (
                                          <TableCell
                                            variant="body"
                                            style={{
                                              borderWidth: '1px',
                                              borderColor: '#aaaaaa',
                                              borderStyle: 'solid'
                                            }}
                                            align="center"
                                          >
                                            <Typography variant="h6">{name}</Typography>
                                          </TableCell>
                                        );
                                      }
                                      return '';
                                    })}
                                  </TableRow>
                                </TableHead>
                                <TableBody
                                  style={{
                                    borderWidth: '1px',
                                    borderColor: '#aaaaaa',
                                    borderStyle: 'solid'
                                  }}
                                >
                                  {markColumnsData?.map(
                                    ({ markColumnId, name, weight, displayOrder }, Mindex) => (
                                      <TableRow
                                        style={{
                                          borderWidth: '1px',
                                          borderColor: '#aaaaaa',
                                          borderStyle: 'solid'
                                        }}
                                        key={markColumnId}
                                      >
                                        <TableCell align="center">
                                          <Typography variant="subtitle1">
                                            {displayOrder}
                                          </Typography>
                                        </TableCell>
                                        <TableCell
                                          style={{
                                            borderWidth: '1px',
                                            borderColor: '#aaaaaa',
                                            borderStyle: 'solid'
                                          }}
                                          align="center"
                                        >
                                          <Typography variant="subtitle1">{name}</Typography>
                                        </TableCell>

                                        <TableCell
                                          style={{
                                            borderWidth: '1px',
                                            borderColor: '#aaaaaa',
                                            borderStyle: 'solid'
                                          }}
                                          align="center"
                                        >
                                          <Typography variant="subtitle1">{weight}%</Typography>
                                        </TableCell>

                                        {teamData?.map(
                                          ({ student: { studentId, name } }, Sindex) => (
                                            <TableCell
                                              style={{
                                                borderWidth: '1px',
                                                borderColor: '#aaaaaa',
                                                borderStyle: 'solid'
                                              }}
                                              align="right"
                                              key={studentId}
                                            >
                                              <Typography>
                                                {
                                                  listMarkOtherData?.find(
                                                    (value) =>
                                                      value.lecturerId === lecturer.lecturerId &&
                                                      value.studentId === studentId &&
                                                      value.markColumnId === markColumnId
                                                  )?.value
                                                }
                                              </Typography>
                                            </TableCell>
                                          )
                                        )}
                                      </TableRow>
                                    )
                                  )}
                                  <TableRow>
                                    <TableCell
                                      colSpan={3}
                                      variant="body"
                                      style={{
                                        borderWidth: '1px',
                                        borderColor: '#aaaaaa',
                                        borderStyle: 'solid'
                                      }}
                                      align="center"
                                    >
                                      <Typography>Average</Typography>
                                    </TableCell>
                                    {teamData?.map(({ student: { studentId, name } }, Sindex) => (
                                      <>
                                        <TableCell
                                          width={200}
                                          variant="body"
                                          style={{
                                            borderWidth: '1px',
                                            borderColor: '#aaaaaa',
                                            borderStyle: 'solid'
                                          }}
                                          align="center"
                                          key={studentId}
                                        >
                                          <Typography>
                                            {Average(studentId, lecturer.lecturerId)}
                                          </Typography>
                                        </TableCell>
                                      </>
                                    ))}
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </>
                        )}
                      </Card>
                    );
                  }
                  return '';
                })}
                {evaluationsData?.status === 1 ? (
                  <Grid display="flex" justifyContent="flex-end">
                    <LoadingAsyncButton
                      onClick={() => handleApprove(evaluationsData?.evaluationId)}
                      sx={{ mt: 2 }}
                      style={{ width: '90px' }}
                      variant="contained"
                      color="primary"
                    >
                      Approve
                    </LoadingAsyncButton>
                  </Grid>
                ) : (
                  <Grid display="flex" justifyContent="flex-end">
                    <LoadingAsyncButton
                      disabled={true}
                      onClick={() => handleApprove(evaluationsData?.evaluationId)}
                      sx={{ mt: 2 }}
                      style={{ width: '90px' }}
                      variant="contained"
                      color="primary"
                    >
                      Approve
                    </LoadingAsyncButton>
                  </Grid>
                )}
              </>
            ) : (
              ''
            )}
          </Grid>
          <Grid xs={3}>
            <Card>
              <CardTitle>
                <Typography variant="subtitle1">Project Details</Typography>
              </CardTitle>
              <Stack display="flex" direction="column">
                {teamLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    <Grid display="flex" direction="row">
                      {' '}
                      <Typography variant="subtitle2">Code: </Typography>
                      <Typography
                        sx={{ ml: 1 }}
                        variant="subtitle2"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {team?.topic?.code}
                      </Typography>
                    </Grid>
                    <Grid display="flex" direction="row" sx={{ mt: 1 }}>
                      {' '}
                      <Typography variant="subtitle2">Name: </Typography>
                      <Typography
                        sx={{ ml: 1 }}
                        variant="subtitle2"
                        style={{ wordWrap: 'break-word' }}
                      >
                        {team?.topic?.name}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </Page>
  );
}

export default Marks;
