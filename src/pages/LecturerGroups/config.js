import React from 'react';
import { Button, Typography } from '@material-ui/core';
import Label from 'components/Label';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import { Visibility } from '@material-ui/icons';
/* eslint-disable camelcase */

export const LecturerGroupColumns = [
  {
    title: 'No',
    dataIndex: 'index'
  },

  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, values) => (
      <Typography style={{ maxWidth: '180px', wordWrap: 'break-word' }} variant="body2">
        {values.name}
      </Typography>
    )
  },
  {
    title: 'Department',
    dataIndex: 'department',
    render: (department) => <Typography variant="body2">{department.name}</Typography>
  },
  // {
  //   title: 'Members',
  //   dataIndex: 'lecturerLecturerGroupMembers',
  //   render: (lecturerLecturerGroupMembers) => {
  //     let message = '';
  //     lecturerLecturerGroupMembers?.map(({ name }) => (message += `${name}, `));
  //     return (
  //       <Typography variant="body2">
  //         {message != '' ? (
  //           message.substring(0, message.length - 2)
  //         ) : (
  //           <Typography>No members</Typography>
  //         )}
  //       </Typography>
  //     );
  //   }
  // },
  {
    title: () => <Typography variant="body2">Detail</Typography>,
    dataIndex: 'detail',
    render: (_, values) => (
      <LoadingButton
        href={`${PATH_DASHBOARD.LecturerGroups.LecturerGroupDetail}/${values.lecturerGroupId}`}
      >
        <Visibility />
      </LoadingButton>
    )
  }
];
