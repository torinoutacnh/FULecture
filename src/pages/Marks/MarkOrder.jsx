import { Typography } from '@material-ui/core';
import React from 'react';

function MarkOrder({ displayOrder }) {
  if (displayOrder === 1) {
    return <Typography variant="h6">Product</Typography>;
  }
  if (displayOrder === 2) {
    return <Typography variant="h6">Document</Typography>;
  }
  if (displayOrder === 3) {
    return <Typography variant="h6">Presentation</Typography>;
  }
  return '';
}

export default MarkOrder;
