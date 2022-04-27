import React from 'react';

/* eslint-disable camelcase */

import { Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { PATH_DASHBOARD } from 'routes/paths';
import { Visibility } from '@material-ui/icons';

export const taskCompletedColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Week</Typography>,
    dataIndex: 'week',
    render: (week) => <Typography variant="body2">{week}</Typography>
  },
  {
    title: () => <Typography variant="body2">Task Completed</Typography>,
    dataIndex: 'tasksCompleted',
    render: (tasksCompleted) => <Typography variant="body2">{tasksCompleted}</Typography>
  }
];

export const taskInprogressColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Week</Typography>,
    dataIndex: 'week',
    render: (week) => <Typography variant="body2">{week}</Typography>
  },
  {
    title: () => <Typography variant="body2">Task Inprogress</Typography>,
    dataIndex: 'tasksInProgress',
    render: (tasksInProgress) => <Typography variant="body2">{tasksInProgress}</Typography>
  }
];

export const taskBeginNextWeekColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Week</Typography>,
    dataIndex: 'week',
    render: (week) => <Typography variant="body2">{week}</Typography>
  },
  {
    title: () => <Typography variant="body2">Task Begin Next Week</Typography>,
    dataIndex: 'taskBeginNextWeek',
    render: (taskBeginNextWeek) => <Typography variant="body2">{taskBeginNextWeek}</Typography>
  }
];

export const urgentIssuesColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },

  {
    title: () => <Typography variant="body2">Week</Typography>,
    dataIndex: 'week',
    render: (week) => <Typography variant="body2">{week}</Typography>
  },
  {
    title: () => <Typography variant="body2">Task Completed</Typography>,
    dataIndex: 'tasksCompleted',
    render: (tasksCompleted) => <Typography variant="body2">{tasksCompleted}</Typography>
  },
  {
    title: () => <Typography variant="body2">Urgent Issues</Typography>,
    dataIndex: 'urgentIssue',
    render: (urgentIssue) => <Typography variant="body2">{urgentIssue}</Typography>
  }
];

export const invidualColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Week</Typography>,
    dataIndex: 'week',
    render: (week) => <Typography variant="body2">{week}</Typography>
  },
  {
    title: () => <Typography variant="body2">Report By</Typography>,
    dataIndex: 'reportBy',
    render: (reportBy) => <Typography variant="body2">{reportBy}</Typography>
  },
  // {
  //   title: () => <Typography variant="body2">Task Inprogress</Typography>,
  //   dataIndex: 'tasksInProgress',
  //   render: (tasksInProgress) => <Typography variant="body2">{tasksInProgress}</Typography>
  // },
  // {
  //   title: () => <Typography variant="body2">Task Completed</Typography>,
  //   dataIndex: 'tasksCompleted',
  //   render: (tasksCompleted) => <Typography variant="body2">{tasksCompleted}</Typography>
  // },
  // {
  //   title: () => <Typography variant="body2">Task Begin Next Week</Typography>,
  //   dataIndex: 'taskBeginNextWeek',
  //   render: (taskBeginNextWeek) => <Typography variant="body2">{taskBeginNextWeek}</Typography>
  // },
  // {
  //   title: () => <Typography variant="body2">Urgent Issues</Typography>,
  //   dataIndex: 'urgentIssue',
  //   render: (urgentIssue) => <Typography variant="body2">{urgentIssue}</Typography>
  // },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton href={`${PATH_DASHBOARD.projects.weeklyReport}/${values.id}`}>
        <Visibility />
      </LoadingButton>
    )
  }
];
