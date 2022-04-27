import { Grid, Typography, Avatar, Stack, CircularProgress } from '@material-ui/core';
import React from 'react';
import './style.css';
import { getTopicFeedbacks } from 'redux/feedback/api';
import { LoadingButton } from '@material-ui/lab';
import moment from 'moment';
import useRequest from '@ahooksjs/use-request';
import { TTopic } from 'types/topic';
import { useParams } from 'react-router-dom';
import useSemester from 'hooks/useSemester';
import Label from 'components/Label';

import FeedbackForm from './FeedbackForm';
import FeedbackDialog from './FeedbackDialog';
import FeedbackOver from './FeedbackOver';
import FirstFeedback from './FirstFeedback';

type Props = {
  currentTopic?: TTopic;
};

const ChatBox = () => {
  const { id } = useParams();
  const { loading, data: topicFeedbacksData = [] } = useRequest(
    () => getTopicFeedbacks({ topicId: id }),
    {
      refreshDeps: [id],
      formatResult: (res) => res.data.result
    }
  );

  return (
    <Stack direction="column" display="flex" maxHeight="400px" overflow="scroll">
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          {topicFeedbacksData?.map((data) => (
            <Grid
              key={data?.topicFeedbackId}
              display="flex"
              direction="row"
              style={{
                margin: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 0
              }}
            >
              <Grid display="flex" direction="column" xs={1} justifyContent="center">
                <Avatar style={{ width: '46px', height: '46px' }} alt="No Image">
                  {data?.approver?.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid
                display="flex"
                direction="column"
                xs={11}
                className="talk-bubble tri-right left-in"
                style={{
                  minHeight: '100px',
                  backgroundColor: '#F3F6F9',
                  width: '80%',
                  padding: '15px',
                  borderRadius: '10px',
                  marginLeft: '5px',
                  textOverflow: 'ellipsis'
                }}
              >
                <Grid display="flex" direction="row">
                  <Grid display="flex" direction="column">
                    <Grid
                      display="flex"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid display="flex" direction="column" justifyContent="center">
                        <Typography variant="subtitle2" style={{ color: 'grey' }}>
                          {data?.approver?.name}
                        </Typography>
                      </Grid>
                      <Grid display="flex" direction="row" justifyContent="center" sx={{ ml: 1 }}>
                        <Typography style={{ fontSize: '12px', color: 'grey', opacity: '0.8' }}>
                          {moment(new Date(data?.createdAt)).format('DD MMM YYYY')},
                        </Typography>
                        <Typography
                          sx={{ ml: 1 }}
                          style={{ fontSize: '12px', color: 'grey', opacity: '0.8' }}
                        >
                          {' '}
                          {new Date(data?.createdAt).toLocaleTimeString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography style={{ wordWrap: 'break-word', color: 'grey' }} variant="body2">
                  {data?.content}
                </Typography>
                <Grid sx={{ mt: 1 }} display="flex">
                  {data?.isApprove === true ? (
                    <Label color="success">Approved</Label>
                  ) : (
                    <Label color="error">Rejected</Label>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Stack>
  );
};

function Feedback({ currentTopic, isApprove, isReviewer }: any) {
  const { id } = useParams();
  const { loading, data: topicFeedbacksData = [] } = useRequest(
    () => getTopicFeedbacks({ topicId: id }),
    {
      refreshDeps: [id],
      formatResult: (res) => res.data.result
    }
  );

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const semester = useSemester();
  const handleClose = () => {
    setOpen(false);
  };

  console.log('topicFeedbacksData', topicFeedbacksData);

  return (
    <Grid display="flex" direction="row" sx={{ mt: 2 }}>
      <FeedbackDialog currentTopic={currentTopic} openDialog={open} setOpenDialog={setOpen}>
        <FeedbackForm currentTopic={currentTopic} handleClose={handleClose} setOpen={setOpen} />
      </FeedbackDialog>

      <Grid display="flex" direction="column" xs={12}>
        <Grid
          display="flex"
          direction="row"
          style={{ lineHeight: '20px', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {new Date(semester.inProgressDate) > new Date() &&
          (isApprove === true || isReviewer === true) ? (
            <LoadingButton
              sx={{ ml: 2 }}
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Feedback
            </LoadingButton>
          ) : (
            ''
          )}

          <Typography variant="subtitle2" color="error">
            Review this topic before{' '}
            {moment(new Date(semester.inProgressDate)).format('DD MMMM, YYYY')}
          </Typography>
        </Grid>

        <Grid direction="row" style={{ margin: '10px', padding: '10px' }}>
          <Typography variant="body2">What other reviewers think:</Typography>
        </Grid>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {new Date(semester.inProgressDate) < new Date() ? (
              <FeedbackOver />
            ) : (
              <>
                {topicFeedbacksData?.length !== 0 ? (
                  <Grid direction="row">
                    <ChatBox />
                  </Grid>
                ) : (
                  <Grid direction="row" style={{ margin: '10px', padding: '10px' }}>
                    <FirstFeedback />
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Feedback;
