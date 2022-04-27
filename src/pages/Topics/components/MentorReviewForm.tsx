import {
  Box,
  Divider,
  Stack,
  Typography,
  Slider,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getTopicById } from 'redux/topic/api';
import { InputField, RadioGroupField, UploadFileField } from '../../../components/form';
import { PRODUCT_TYPE_DATA } from '../../../constraints';
import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';
import { TTopic } from '../../../types/topic';
import QuillEditor from '../../../components/editor/quill/index';
import { getStudentInTeams } from '../../../redux/StudentInTeams/api';

type Props = {
  currentTopic?: TTopic;
  comment?: string;
  setComment?: React.Dispatch<any>;
  conclusion?: string;
  setConclusion?: React.Dispatch<any>;
  handleChange?: React.Dispatch<any>;
};
// eslint-disable-next-line arrow-body-style
const MentorReviewForm: React.FC<Props> = ({
  currentTopic,
  comment,
  setComment,
  conclusion,
  setConclusion,
  handleChange
}) => {
  const {
    loading: teamLoading,
    data: teamStudentData,
    run: teamStudentRun
  } = useRequest(() => getStudentInTeams({ TeamId: currentTopic?.team?.teamId }), {
    formatResult: (res) => res.data.result
  });

  useEffect(() => {
    if (currentTopic) {
      teamStudentRun();
    }
  }, [currentTopic]);

  console.log('teamStudentData', teamStudentData);
  return (
    <Box p={1} flex={1}>
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            <Typography variant="subtitle1"> Review of project {currentTopic?.name}</Typography>
          </CardTitle>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle2">{currentTopic?.code}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
      <Card>
        <Box>
          <CardTitle>
            <Typography variant="subtitle1">Students of the thesis defense</Typography>
          </CardTitle>
          {teamLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Stack direction="column" spacing={2}>
              {teamStudentData?.map((data: any) => (
                <Grid key={data?.studentId}>
                  <Typography variant="body2">
                    {data?.student?.name} - {data?.student?.code}
                  </Typography>
                </Grid>
              ))}
            </Stack>
          )}
        </Box>
      </Card>
      <Card>
        <Box>
          <CardTitle>
            <Typography variant="subtitle1">Comment from proposed Supervisor</Typography>
          </CardTitle>
          <Stack direction="column" spacing={2}>
            <QuillEditor
              id="comment"
              name="comment"
              placeholder="Comment from proposed Supervisor..."
              toolBar={true}
              onChange={setComment}
              value={comment}
              theme="snow"
              readOnly={false}
            />
          </Stack>
        </Box>
      </Card>
      <Card>
        <CardTitle>
          <Typography variant="subtitle1">Conclusion</Typography>
        </CardTitle>
        <Box>
          <Stack direction="column" spacing={2}>
            <QuillEditor
              id="conclusion"
              name="conclusion"
              placeholder="Conclusion: Pass at what stage "
              toolBar={true}
              onChange={setConclusion}
              value={conclusion}
              theme="snow"
              readOnly={false}
            />
          </Stack>
        </Box>
      </Card>
      <Card>
        <CardTitle>
          <Typography variant="subtitle1">Proposed Supervisor qualified</Typography>
        </CardTitle>
        <Stack direction="column" spacing={2}>
          <FormGroup>
            {teamStudentData?.map((data: any) => (
              <Grid key={data?.studentId}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChange}
                      name={data?.student?.studentId}
                      value={data?.student?.name}
                    />
                  }
                  label={data?.student?.name}
                />
              </Grid>
            ))}
          </FormGroup>
        </Stack>
      </Card>
    </Box>
  );
};

export default MentorReviewForm;
