/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';

import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import moment from 'moment';
import { GetApp, Visibility } from '@material-ui/icons';

const add_minutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
};
export const councilColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Dept</Typography>,
    dataIndex: 'department',
    render: ({ name, code }) => <Typography variant="body2">{code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Name</Typography>,
    dataIndex: 'name',
    render: (name) => <Typography variant="body2">{name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Members</Typography>,
    dataIndex: 'lecturerGroupMembersDetails',
    render: (lecturerGroupMembersDetails) => (
      <>
        {lecturerGroupMembersDetails?.map(({ lecturerId, name }) => (
          <Typography key={lecturerId} variant="body2">
            {name}{' '}
          </Typography>
        ))}
      </>
    )
  },

  {
    title: () => <Typography variant="body2">Start</Typography>,
    dataIndex: 'startTime',
    render: (_, values) => (
      <>
        <Typography variant="body2">
          {moment(new Date(values.evaluations[0]?.evaluateDueDate)).format('DD/MM/YYYY')}
        </Typography>
        <Typography variant="body2">
          {new Date(values.evaluations[0]?.evaluateDueDate).toLocaleTimeString()}
        </Typography>
      </>
    )
  },
  {
    title: () => <Typography variant="body2">End</Typography>,
    dataIndex: 'endTime',
    render: (_, values) => (
      <>
        <Typography variant="body2">
          {moment(
            new Date(values.evaluations[values.evaluations.length - 1]?.evaluateDueDate)
          ).format('DD/MM/YYYY')}
        </Typography>
        <Typography variant="body2">
          {new Date(
            new Date(values.evaluations[values.evaluations.length - 1]?.evaluateDueDate).setMinutes(
              new Date(
                values.evaluations[values.evaluations.length - 1]?.evaluateDueDate
              ).getMinutes() + 90
            )
          ).toLocaleTimeString()}
        </Typography>
      </>
    )
  },
  // {
  //   title: () => <Typography variant="body2">Teams</Typography>,
  //   dataIndex: 'teams',
  //   render: (_, values) => (
  //     <Typography variant="body2">{console.log('values: ', values)}</Typography>
  //   )
  // },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton
        href={`${PATH_DASHBOARD.EvaluationBoards.councilDetail}/${values.lecturerGroupId}/${values.evaluations[0]?.evaluationBoardId}`}
      >
        <Visibility />
      </LoadingButton>
    )
  }
];
