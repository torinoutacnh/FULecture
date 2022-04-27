import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';

import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import { GetApp, Visibility } from '@material-ui/icons';
import TopicProgressLabel from './components/TopicProgressLabel';

export const projectColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Topic Code</Typography>,
    dataIndex: 'code',
    render: (_, values) => <Typography variant="body2">{values?.code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Topic Name</Typography>,
    dataIndex: 'name',
    render: (_, values) => (
      <Typography variant="body2" style={{ minWidth: '150px' }}>
        {values?.name}
      </Typography>
    )
  },
  {
    title: () => <Typography variant="body2">Team Name</Typography>,
    dataIndex: 'code',
    render: (_, values) => <Typography variant="body2">{values?.team?.name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Co-mentor</Typography>,
    dataIndex: 'coMentors',
    render: (coMentors) => (
      <>
        {coMentors?.length === 0 ? <Typography variant="body2">-</Typography> : ''}
        {coMentors?.map(({ code, name }) => (
          <Typography variant="body2" key={code}>
            {name}
          </Typography>
        ))}
      </>
    )
  },
  {
    title: () => <Typography variant="body2">Status</Typography>,
    dataIndex: 'status',
    render: (_, values) => <TopicProgressLabel status={values?.status} />
  },
  {
    title: () => <Typography variant="body2">Attachment</Typography>,
    dataIndex: 'attachment',
    render: (_, values) => (
      <LoadingButton href={values?.attachment} target="_blank">
        <GetApp />
      </LoadingButton>
    )
  },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton href={`${PATH_DASHBOARD.projects.projectDetail}/${values.topicId}`}>
        <Visibility />
      </LoadingButton>
    )
  }
];
