import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import Label from 'components/Label';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import { Visibility } from '@material-ui/icons';

/* eslint-disable camelcase */

export const TeamColumns = [
  {
    title: 'No',
    dataIndex: 'index'
  },
  {
    title: 'Department',
    dataIndex: 'department',
    render: (department) => <Typography>{department.name}</Typography>
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, values) => <Typography>{values.name}</Typography>
  },
  {
    title: 'Leader',
    dataIndex: 'leader',
    render: (leader) => <Typography>{leader?.name}</Typography>
  },
  {
    title: 'Members',
    dataIndex: 'students',
    render: (students) => {
      let message = '';
      students?.map(({ name }) => (message += `${name}, `));
      return (
        <Typography style={{ wordWrap: 'break-word' }}>
          {message != '' ? (
            message.substring(0, message.length - 2)
          ) : (
            <Typography style={{ wordWrap: 'break-word' }}>No members</Typography>
          )}
        </Typography>
      );
    }
  },
  {
    title: 'Lock',
    dataIndex: 'isLocked',
    width: 150,
    render: (isLocked) => (
      <Label color={isLocked ? 'error' : 'success'}>{isLocked ? 'Lock' : 'Unlock'}</Label>
    )
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton href={`${PATH_DASHBOARD.teams.teamDetail}/${values.teamId}`}>
        <Visibility />
      </LoadingButton>
    )
  }
];

export const ProjectColumns = [
  {
    title: 'No',
    dataIndex: 'index'
  },
  {
    title: 'Topic',
    dataIndex: 'name',
    render: (_, values) => (
      <Grid display="flex" direction="column">
        <Grid display="flex" direction="row">
          <Typography variant="subtitle1">{values.topic.name}</Typography>
        </Grid>
        <Grid display="flex" direction="row">
          <Typography variant="body2" style={{ fontSize: '12px', color: 'grey', opacity: '0.7' }}>
            {values.topic.code}
          </Typography>
        </Grid>
      </Grid>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Create at',
    dataIndex: 'createAt',
    render: (_, values) => (
      <Typography style={{ fontSize: '16px', color: 'grey', opacity: '0.7' }}>
        {new Date(values?.createAt).toLocaleDateString()},
        {new Date(values?.createAt).toLocaleTimeString()}
      </Typography>
    )
  },
  {
    title: 'Update at',
    dataIndex: 'updateAt',
    render: (_, values) => (
      <Typography style={{ fontSize: '16px', color: 'grey', opacity: '0.7' }}>
        {new Date(values?.updateAt).toLocaleDateString()},
        {new Date(values?.updateAt).toLocaleTimeString()}
      </Typography>
    )
  }
];
