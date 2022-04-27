import React from 'react';
import { Button, Typography } from '@material-ui/core';
import Label from 'components/Label';
import { PATH_DASHBOARD } from 'routes/paths';
/* eslint-disable camelcase */

const date = new Date();
export const semesterColumns = [
  {
    title: 'STT',
    dataIndex: 'index'
  },
  {
    title: 'Tên',
    dataIndex: 'name'
  },
  {
    title: 'Trạng thái hiện tại',
    dataIndex: 'name',
    render: (_, value) => {
      let color = '';
      let status = '';
      if (date >= new Date(value.finishedDate)) {
        color = 'success';
        status = 'Finished';
      }
      if (date >= new Date(value.inProgressDate) && date < new Date(value.finishedDate)) {
        color = 'secondary';
        status = 'In-Progress';
      }
      if (date >= new Date(value.assingningDate) && date < new Date(value.inProgressDate)) {
        color = 'error';
        status = 'Prepairing';
      }
      if (date < new Date(value.assingningDate)) {
        color = 'warning';
        status = 'Not start yet';
      }
      console.log(value.semesterId + color + status);
      return <Label color={color}>{status}</Label>;
    }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 200,
    render: (status) => {
      let color = '';
      let value = '';
      if (status === 1) {
        color = 'error';
        value = 'Prepairing';
      }

      if (status === 2) {
        color = 'warning';
        value = 'Assigning';
      }

      if (status === 3) {
        color = 'secondary';
        value = 'In-Progress';
      }

      if (status === 4) {
        color = 'success';
        value = 'Finished';
      }

      return <Label color={color}>{value}</Label>;
    }
  }
];
