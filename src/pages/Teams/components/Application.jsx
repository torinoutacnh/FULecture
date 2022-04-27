import { Card, Grid, Stack, Typography } from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react';

import ResoTable from 'components/ResoTable/ResoTable';
import { getTopics } from 'redux/topic/api';
import { useRequest } from 'ahooks';
import { getProjects } from 'redux/Projects/api';

import { ProjectColumns } from '../config';

const Application = ({ id }) => {
  console.log('teamId:', id);

  const { data: applicationsData = [] } = useRequest(() => getProjects({ teamId: id }), {
    refreshDeps: [id],
    formatResult: (res) => res.data.result
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (applicationsData) {
      setApplications(applicationsData);
    }
  }, [applicationsData]);

  console.log(applications);
  const tableRef = useRef();

  const getApplications = (applications) => applications;
  return (
    <Card
      style={{
        width: '96%',
        margin: '2%',
        boxShadow: '20',
        height: '450px',
        padding: '20px',
        overflow: 'scroll'
      }}
    >
      <Grid display="flex" direction="row">
        <Typography variant="h5">Applications</Typography>
      </Grid>
      <Grid display="flex" direction="row">
        <Typography style={{ fontSize: '12px', color: 'grey', opacity: '0.7' }}>
          Topic Appications that this team applied
        </Typography>
      </Grid>
      <Grid display="flex" direction="row" overflow="scroll">
        <Stack
          display="flex"
          direction="column"
          spacing={2}
          style={{ width: '80%' }}
          sx={{ mt: 2 }}
        >
          <ResoTable
            showAction={false}
            ref={tableRef}
            pagination
            getData={() => getProjects({ teamId: id, page: 1, limit: 5 })}
            columns={ProjectColumns}
            rowKey="ProjectId"
          />
        </Stack>
      </Grid>
    </Card>
  );
};

export default Application;
