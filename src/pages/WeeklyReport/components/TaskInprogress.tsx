import { Card, Grid, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { CardTitle } from 'pages/Products/components/Card';
import { QuillEditor } from 'components/editor';

function TaskInprogress({ currentReport }: any) {
  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Task In-Progress</Typography>
      </CardTitle>
      <Stack display="flex" direction="column" style={{ padding: '1em' }}>
        <QuillEditor
          value={currentReport?.tasksInProgress}
          readOnly={true}
          toolBar={false}
          theme={false}
        />
      </Stack>
    </Card>
  );
}

export default TaskInprogress;
