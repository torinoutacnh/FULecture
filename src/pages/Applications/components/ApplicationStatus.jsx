import { Typography } from '@material-ui/core';
import React from 'react';

function ApplicationStatus({ status }) {
  if (status === 1) {
    return (
      <Typography
        variant="subtitle2"
        style={{
          height: '28px',
          lineHeight: '28px',
          textAlign: 'center',
          borderRadius: '8px',
          background: '#FFF4DE',
          color: '#FFB11B',
          maxWidth: '80px'
        }}
      >
        Waiting
      </Typography>
    );
  }

  if (status === 2) {
    return (
      <Typography
        variant="subtitle2"
        style={{
          height: '28px',
          lineHeight: '28px',
          textAlign: 'center',
          borderRadius: '8px',
          background: '#FFE2E5',
          color: '#F86777',
          maxWidth: '80px'
        }}
      >
        Canceled
      </Typography>
    );
  }

  if (status === 3) {
    return (
      <Typography
        variant="subtitle2"
        style={{
          height: '28px',
          lineHeight: '28px',
          textAlign: 'center',
          borderRadius: '8px',
          background: '#C9F7F5',
          color: '#38CDC6',
          maxWidth: '80px'
        }}
      >
        Approved
      </Typography>
    );
  }
  if (status === 4) {
    return (
      <Typography
        variant="subtitle2"
        style={{
          height: '28px',
          lineHeight: '28px',
          textAlign: 'center',
          borderRadius: '8px',
          background: '#FFE2E5',
          color: '#F86777',
          maxWidth: '80px'
        }}
      >
        Rejected
      </Typography>
    );
  }
}

export default ApplicationStatus;
