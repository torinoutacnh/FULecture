import React from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import Label from 'components/Label';
import { PATH_DASHBOARD } from 'routes/paths';
import { LoadingButton } from '@material-ui/lab';
import { GetApp, Visibility } from '@material-ui/icons';
import DocumentTypeRender from './components/DocumentTypeRender';

/* eslint-disable camelcase */

export const EvidenceColumns = [
  {
    title: 'No',
    dataIndex: 'index'
  },

  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, values) => <Typography>{values.name}</Typography>
  },
  {
    title: () => <Typography variant="body2">Attachment</Typography>,
    dataIndex: 'evidenceLink',
    render: (_, values) => (
      <LoadingButton href={values?.evidenceLink} target="_blank">
        <GetApp />
      </LoadingButton>
    )
  },
  {
    title: () => <Typography variant="body2">Document Type</Typography>,
    dataIndex: 'documentType',
    render: (documentType) => <DocumentTypeRender documentType={documentType} />
  }
];
