import { Card, Grid, Stack, Typography } from '@material-ui/core';
import React from 'react';
import { CardTitle } from 'pages/Products/components/Card';
import ResoTable from 'components/ResoTable/ResoTable';

import { QuillEditor } from 'components/editor';

function TaskNextWeek({ currentReport }: any) {
  return (
    <Card>
      <CardTitle>
        <Typography variant="subtitle1">Task To Begin Next Week</Typography>
      </CardTitle>
      <Stack display="flex" direction="column" style={{ padding: '1em' }}>
        <QuillEditor
          value={currentReport?.taskBeginNextWeek}
          onChange={() => currentReport?.taskBeginNextWeek}
          readOnly={true}
          toolBar={false}
          theme={false}
        />
      </Stack>
    </Card>
  );
}

export default TaskNextWeek;
