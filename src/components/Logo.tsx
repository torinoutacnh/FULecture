// material
import { useTheme } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';
import React from 'react';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return <Box component="img" src="/static/fpt_logo.png" />;
}
