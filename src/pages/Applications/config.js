import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button, Grid } from '@material-ui/core';
import moment from 'moment';
import ApplicationStatus from './components/ApplicationStatus';
import ApplyTeamDialog from './ApplyTeamDialog';

export const ApplicationColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },

  {
    title: () => (
      <Typography variant="body2" style={{ minWidth: '80px', textAlign: 'center' }}>
        Topic Code
      </Typography>
    ),
    dataIndex: 'topic',
    render: (_, values) => <Typography variant="body2">{values.topic.code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Topic Name</Typography>,
    dataIndex: 'topic',
    render: (_, values) => (
      <Typography noWrap variant="body2" style={{ minWidth: '100px' }}>
        {values.topic.name}
      </Typography>
    )
  },
  {
    title: () => <Typography variant="body2">Team name</Typography>,
    dataIndex: 'team',
    render: (team) => <Typography>{team.name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Apply Date</Typography>,
    dataIndex: 'createAt',
    render: (createAt) => (
      <>
        <Typography variant="body2">{moment(new Date(createAt)).format('DD MMM, YYYY')}</Typography>
        {/* <Typography variant="body2">{new Date(createAt).toLocaleTimeString()}</Typography> */}
      </>
    )
  },
  {
    title: () => <Typography variant="body2">Status</Typography>,
    dataIndex: 'status',
    render: (status) => <ApplicationStatus status={status} />
  },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'teamId',
    render: (_, values) => (
      <ApplyTeamDialog
        teamId={values?.teamId}
        projectId={values?.projectId}
        topicName={values?.topic?.name}
      />
    )
  }
];
