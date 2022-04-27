import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
import { useRequest } from 'ahooks';
import Members from 'pages/Teams/components/Members';
import React, { useState, useEffect } from 'react';
import { getTeamById } from 'redux/teams/api';
import { TProjects } from 'types/Projects';
import { Visibility } from '@material-ui/icons';

import FeedbackApplicationForm from './components/FeedbackApplicationForm';
import { getProjectsById } from '../../redux/Projects/api';

function ApplyTeamDialog({ teamId, projectId, topicName }) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { data, run, loading } = useRequest(() => getTeamById(teamId), {
    refreshDeps: [teamId],
    formatResult: (res: any) => {
      console.log(res.data);
      return res.data;
    }
  });

  const { data: applicationData } = useRequest(() => getProjectsById(projectId), {
    refreshDeps: [projectId],
    formatResult: (res: any) => {
      console.log(res.data);
      return res.data;
    }
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(data);
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Visibility />
      </Button>
      <Dialog fullWidth={true} maxWidth="md" open={open}>
        <DialogTitle>Application Info</DialogTitle>
        <DialogContent style={{ minHeight: '500px' }}>
          <Stack display="flex" direction="column">
            <Grid display="flex" direction="row">
              <Typography variant="h5">Team name: {data?.name}</Typography>
            </Grid>
            <Grid sx={{ mt: 2 }} display="flex" direction="row">
              <Typography variant="subtitle1">Request topic: {topicName}</Typography>
            </Grid>

            <Grid display="flex" direction="row">
              <Typography sx={{ mt: 1 }} variant="subtitle1">
                Members:
              </Typography>
            </Grid>
            <Grid direction="row" display="flex" height="200px" overflow="scroll">
              {data?.students?.map((item) => (
                <Grid
                  display="flex"
                  style={{ margin: '20px' }}
                  justifyContent="center"
                  value={item.code}
                  key={item.code}
                >
                  <Card
                    style={{
                      borderRadius: '26px',
                      minHeight: '150px'
                    }}
                    component="span"
                    sx={{ width: 230, p: 2 }}
                    spacing={5}
                  >
                    <Typography sx={{ mt: 1 }} variant="subtitle1">
                      {item?.name}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body1">
                      {item?.code}
                    </Typography>
                    {item?.tagSkill !== null ? (
                      <Typography
                        sx={{ mt: 0.5 }}
                        style={{ color: 'grey', fontSize: '12px', opacity: '0.9' }}
                      >
                        {item?.tagSkill?.split(';').join('  ')}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ mt: 0.5 }}
                        style={{ color: 'grey', fontSize: '12px', opacity: '0.9' }}
                      >
                        No tag skills
                      </Typography>
                    )}

                    {data?.leader?.studentId === item?.studentId ? (
                      <Typography
                        sx={{ mt: 1 }}
                        style={{
                          backgroundColor: '#F64E60',
                          color: 'white',
                          textAlign: 'center',
                          width: '76px',
                          height: '24px',
                          borderRadius: '10px'
                        }}
                      >
                        Leader
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ mt: 1 }}
                        style={{
                          backgroundColor: '#19C5BD',
                          color: 'white',
                          textAlign: 'center',
                          width: '76px',
                          height: '24px',
                          borderRadius: '10px'
                        }}
                      >
                        Member
                      </Typography>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Grid sx={{ mt: 2 }} display="flex" direction="row">
              <Grid display="flex" direction="column" style={{ width: '100%' }}>
                <Typography variant="subtitle1">Approver feedbacks:</Typography>
                <FeedbackApplicationForm currentApplication={applicationData} />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ApplyTeamDialog;
