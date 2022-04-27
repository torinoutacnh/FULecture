import { Typography } from '@material-ui/core';
import React from 'react';

function TopicProgressLabel({ status }: any) {
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
          maxWidth: '85px',
          minWidth: '80px'
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
          maxWidth: '85px',
          minWidth: '80px'
        }}
      >
        Rejected
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
          maxWidth: '85px',
          minWidth: '80px'
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
          background: '#E1F0FF',
          color: '#3498FF',
          maxWidth: '85px',
          minWidth: '80px'
        }}
      >
        Ready
      </Typography>
    );
  }
  if (status === 5) {
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
          maxWidth: '85px',
          minWidth: '80px'
        }}
      >
        Assigned
      </Typography>
    );
  }
  if (status === 6) {
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
          maxWidth: '85px',
          minWidth: '80px'
        }}
      >
        Passed
      </Typography>
    );
  }
  if (status === 7) {
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
          maxWidth: '85px',
          minWidth: '80px'
        }}
      >
        Failed
      </Typography>
    );
  }
  return '';
}

export default TopicProgressLabel;
