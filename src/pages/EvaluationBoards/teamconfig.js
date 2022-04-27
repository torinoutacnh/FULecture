import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';
import moment from 'moment';
import { Icon } from '@iconify/react';
import downloadOutlineIcon from '@iconify/icons-eva/download-outline';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';

import { GetApp, Visibility } from '@material-ui/icons';

export const TeamsCouncilColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Team name</Typography>,
    dataIndex: 'name',
    render: (name) => <Typography variant="body2">{name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Dept</Typography>,
    dataIndex: 'name',
    render: (_, values) => <Typography variant="body2">{values.department?.code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Members</Typography>,
    dataIndex: 'name',
    render: (_, values) => (
      <>
        {values.students?.map((data) => (
          <Typography key={data.studentId} variant="body2">
            {data.name}
          </Typography>
        ))}
      </>
    )
  },
  {
    title: () => <Typography variant="body2">Mentors</Typography>,
    dataIndex: 'name',
    render: (_, values) => (
      <Typography variant="body2">
        <>
          {values.mentors?.map((data) => (
            <Typography key={data.lecturerId} variant="body2">
              {data.name}
            </Typography>
          ))}
        </>
      </Typography>
    )
  },
  {
    title: () => <Typography variant="body2">Start Time</Typography>,
    dataIndex: 'startTime',
    render: (_, values) => (
      <>
        <Typography variant="body2">
          {moment(new Date(values.evaluation?.evaluateDueDate)).format('DD/MM/YYYY')}
        </Typography>
        <Typography variant="body2">
          {new Date(values.evaluation?.evaluateDueDate).toLocaleTimeString()}
        </Typography>
      </>
    )
  },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton
        href={`${PATH_DASHBOARD.EvaluationBoards.marks}/${values?.teamId}/${values?.evaluation?.evaluationBoardId}/${values?.evaluation?.lecturerGroupId}`}
      >
        <Visibility />
      </LoadingButton>
    )
  }
];
