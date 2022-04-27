import { Card, Grid, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { CardTitle } from 'pages/Products/components/Card';
import ResoTable from 'components/ResoTable/ResoTable';
import { getWeeklyReports } from 'redux/WeeklyReport/api';
import { QuillEditor } from 'components/editor';

import { urgentIssuesColumns } from './config';

function UrgentIssues({ currentReport }: any) {
  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Urgent Issues</Typography>
      </CardTitle>
      <Stack display="flex" direction="column" style={{ padding: '1em' }}>
        <QuillEditor
          value={currentReport?.urgentIssue}
          readOnly={true}
          toolBar={false}
          theme={false}
        />
      </Stack>
    </Card>
  );
}

export default UrgentIssues;
