import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';
import moment from 'moment';
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
        Code
      </Typography>
    ),
    dataIndex: 'code',
    render: (_, values) => <Typography variant="body2">{values.code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Title</Typography>,
    dataIndex: 'name',
    render: (_, values) => (
      <Typography variant="body2" style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
        {values.name}
      </Typography>
    )
  },
  {
    title: () => <Typography variant="body2">Dept</Typography>,
    dataIndex: 'department',
    render: ({ name, code }) => <Typography variant="body2">{code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Submit Date</Typography>,
    dataIndex: 'createDate',
    render: (createDate) => (
      <>
        <Typography variant="body2">{moment(new Date(createDate)).format('DD/MM/YYYY')}</Typography>
        <Typography variant="body2">{new Date(createDate).toLocaleTimeString()}</Typography>
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
      <LoadingButton href={`${PATH_DASHBOARD.topics.topicDetail}/${values.topicId}`}>
        <Visibility />
      </LoadingButton>
    )
  }
  // {
  //   title: 'Detail',
  //   dataIndex: 'attachment',
  //   render: (attachment) => (
  //     <a href={attachment}>
  //       <Icon style={{ width: '24px', height: '24px' }} icon={downloadOutlineIcon} />
  //     </a>
  //   )
  // },
  // {
  //   title: 'Template',
  //   dataIndex: 'checkpointTemplateId'
  // },
  // {
  //   title: 'Submitter',
  //   dataIndex: 'lecturerSubmiter',
  //   render: (_, values) => (
  //     <Typography>
  //       {values.lecturerSubmiter != null
  //         ? values.lecturerSubmiter.name
  //         : values.studentSubmiter.name}
  //     </Typography>
  //   )
  // },

  // {
  //   title: 'Members',
  //   dataIndex: 'maxMembers'
  // }
];
