import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';

import { Icon } from '@iconify/react';
import downloadOutlineIcon from '@iconify/icons-eva/download-outline';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';

import { GetApp, Visibility } from '@material-ui/icons';
import TopicProgressLabel from './components/TopicProgressLabel';

export const topicColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => (
      <Typography variant="body2" style={{ minWidth: '80px', textAlign: 'center' }}>
        Name
      </Typography>
    ),
    dataIndex: 'name',
    render: (_, values) => <Typography variant="body2">{values.name}</Typography>
  },
  {
    title: () => (
      <Typography variant="body2" style={{ minWidth: '80px', textAlign: 'center' }}>
        Code
      </Typography>
    ),
    dataIndex: 'code',
    render: (_, values) => <Typography variant="body2">{values.code}</Typography>
  },

  {
    title: () => <Typography variant="body2">View Report</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton href={`${PATH_DASHBOARD.topics.topicDetail}/${values.topicId}`}>
        <Visibility />
      </LoadingButton>
    )
  }
];
