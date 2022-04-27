import { Typography } from '@material-ui/core';
import React from 'react';

function DocumentTypeRender({ documentType }) {
  if (documentType === 1) return <Typography variant="body2">SRS</Typography>;
  if (documentType === 2) return <Typography variant="body2">Design</Typography>;
  return <Typography variant="body2">UCP</Typography>;
}

export default DocumentTypeRender;
