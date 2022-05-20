import { Card, Grid, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { CardTitle } from 'pages/Products/components/Card';
import ReactQuill from 'react-quill';
import { QuillEditor } from 'components/editor';

function TaskCompleted({ currentReport}: any) {
  
  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Task Completed</Typography>
      </CardTitle>
      <Stack display="flex" direction="column" style={{ padding: '1em' }}>
        <QuillEditor
          value={currentReport?.tasksCompleted}
          onChange={() => currentReport?.tasksCompleted}
          readOnly={true}
          toolBar={false}
          theme={false}
        />
      </Stack>
    </Card>
  );
}

export default TaskCompleted;
