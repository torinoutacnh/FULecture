import React from 'react';

/* eslint-disable camelcase */

import { Typography, Button } from '@material-ui/core';

import { Icon } from '@iconify/react';
import downloadOutlineIcon from '@iconify/icons-eva/download-outline';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import moment from 'moment';
import { GetApp, Visibility } from '@material-ui/icons';

export const evaluationBoardColumns = [
  {
    title: () => <Typography>No</Typography>,
    dataIndex: 'index'
  },
  {
    title: () => <Typography variant="body2">Name</Typography>,
    dataIndex: 'name',
    render: (name) => <Typography variant="body2">{name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Teams</Typography>,
    dataIndex: 'teams'
  },
  {
    title: () => <Typography variant="body2">Councils</Typography>,
    dataIndex: 'councils'
  },
  {
    title: () => <Typography variant="body2">Dept</Typography>,
    dataIndex: 'department',
    render: ({ name, code }) => <Typography variant="body2">{code}</Typography>
  },
  {
    title: () => <Typography variant="body2">Start Date</Typography>,
    dataIndex: 'startTime',
    render: (startTime) => (
      <>
        <Typography variant="body2">
          {moment(new Date(startTime)).format('DD MMM, YYYY')}
        </Typography>
        <Typography variant="body2">{new Date(startTime).toLocaleTimeString()}</Typography>
      </>
    )
  },
  {
    title: () => <Typography variant="body2">End Date</Typography>,
    dataIndex: 'endTime',
    render: (endTime) => (
      <>
        <Typography variant="body2">{moment(new Date(endTime)).format('DD MMM, YYYY')}</Typography>
        <Typography variant="body2">{new Date(endTime).toLocaleTimeString()}</Typography>
      </>
    )
  },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton
        href={`${PATH_DASHBOARD.EvaluationBoards.councils}/${values.evaluationBoardId}`}
      >
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
