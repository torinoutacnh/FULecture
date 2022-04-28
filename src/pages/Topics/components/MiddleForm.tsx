import { Box, Stack, Typography } from '@material-ui/core';
import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopicById } from 'redux/topic/api';
import RHFEditor from 'components/editor/jodit/index';
import QuillEditor from '../../../components/editor/quill/index';
import { InputField, UploadFileField } from '../../../components/form';
import { TTopic } from '../../../types/topic';
import { Card, CardTitle } from './Card';

type Props = {
  isUpdate: boolean;
  currentTopic?: TTopic;
  setContext?: React.Dispatch<any>;
  context?: string;
  problem?: string;
  setProblem?: React.Dispatch<any>;
  proposedSolution?: string;
  setProposedSolution?: React.Dispatch<any>;
  theory?: string;
  setTheory?: React.Dispatch<any>;
  output?: string;
  setOuput?: React.Dispatch<any>;
  technology?: string;
  setTechnology?: React.Dispatch<any>;
  fileData?: any;
};
// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({
  isUpdate,
  setContext,
  currentTopic,
  context,
  problem,
  setProblem,
  proposedSolution,
  setProposedSolution,
  theory,
  setTheory,
  output,
  setOuput,
  technology,
  setTechnology,
  fileData
}) => {
  const { id }: any = useParams();
  const { data, run, loading } = useRequest(() => getTopicById(id!), {
    refreshDeps: [id],
    formatResult: (res) => res.data
  });
  const [fileData1, setFileData1] = useState<any>();
  // console.log('fileData', fileData);
  // console.log('fileDataCode', fileData1 ? fileData1?.Code : '');
  const [code, setCode] = useState();

  useEffect(() => {
    if (fileData) {
      setFileData1(fileData);
      setCode(fileData.code);
    }
  }, [fileData]);
  return (
    <Box p={1} flex={1}>
      {console.log('fileData', fileData)}
      {console.log('fileDataCode', fileData1 ? fileData1?.Code : '')}
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Topic Detail
          </CardTitle>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <InputField
                defaultValue={fileData1?.Code}
                id="code"
                disabled={!isUpdate}
                name="code"
                label="Code"
                required
                size="small"
              />
              <InputField
                disabled={!isUpdate}
                name="name"
                label="Title"
                required
                size="small"
                fullWidth
              />
            </Stack>

            <Box>
              <InputField
                disabled={!isUpdate}
                name="note"
                label="Note"
                required
                size="medium"
                fullWidth
              />
            </Box>
            <Box>
              <InputField
                id="abtract"
                disabled={!isUpdate}
                name="abtract"
                sx={{
                  width: '100%'
                }}
                id="outlined-multiline-static"
                multiline
                rows={3}
                variant="outlined"
                label="Abstract"
              />
            </Box>
            <Box>
              <InputField
                id="description"
                disabled={!isUpdate}
                name="description"
                sx={{
                  width: '100%'
                }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                variant="outlined"
                label="Description"
              />
            </Box>
          </Stack>
        </Box>
      </Card>

      <Card>
        <Box>
          <CardTitle>
            <Typography variant="subtitle1">Content of Capstone Project</Typography>
          </CardTitle>
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle2">Context</Typography>
            <RHFEditor
              id="context"
              placeholder="Context..."
              toolBar={isUpdate}
              onChange={setContext}
              value={context}
              theme="snow"
              readOnly={!isUpdate}
            />
            <Typography variant="subtitle2">Problem</Typography>
            <RHFEditor
              id="problem"
              placeholder="Problem..."
              toolBar={isUpdate}
              onChange={setProblem}
              value={problem}
              theme="snow"
              readOnly={!isUpdate}
            />
            <Typography variant="subtitle2">Proposed Solution</Typography>
            <RHFEditor
              id="proposedSolution"
              placeholder="Proposed Solution..."
              toolBar={isUpdate}
              onChange={setProposedSolution}
              value={proposedSolution}
              theme="snow"
              readOnly={!isUpdate}
            />
          </Stack>
        </Box>
      </Card>
      <Card>
        <CardTitle>
          <Typography variant="subtitle1">Main proposal content</Typography>
        </CardTitle>
        <Box>
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle2">Theory</Typography>
            <RHFEditor
              id="theory"
              placeholder="Theory..."
              toolBar={isUpdate}
              onChange={setTheory}
              value={theory}
              theme="snow"
              readOnly={!isUpdate}
            />
            <Typography variant="subtitle2">Output</Typography>
            <RHFEditor
              id="output"
              placeholder="Output..."
              toolBar={isUpdate}
              onChange={setOuput}
              value={output}
              theme="snow"
              readOnly={!isUpdate}
            />
            <Typography variant="subtitle2">Technology</Typography>
            <RHFEditor
              id="technology"
              placeholder="Technology..."
              toolBar={isUpdate}
              onChange={setTechnology}
              value={technology}
              theme="snow"
              readOnly={!isUpdate}
            />
          </Stack>
        </Box>
      </Card>
      <Card>
        <Box>
          <CardTitle>
            <Typography variant="subtitle1">Proposed Tasks for students</Typography>
          </CardTitle>
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle2">Task package 1</Typography>
            <InputField
              disabled={!isUpdate}
              name="taskPackage1"
              label="Task Package 1"
              multiline
              rows={2}
              required
              size="small"
              fullWidth
            />
            <Typography variant="subtitle2">Task package 2</Typography>

            <InputField
              disabled={!isUpdate}
              name="taskPackage2"
              label="Task Package 2"
              multiline
              rows={2}
              required
              size="small"
              fullWidth
            />
            <Typography variant="subtitle2">Task package 3</Typography>

            <InputField
              disabled={!isUpdate}
              name="taskPackage3"
              label="Task Package 3"
              multiline
              rows={2}
              required
              size="small"
              fullWidth
            />
            <Typography variant="subtitle2">Task package 4</Typography>

            <InputField
              disabled={!isUpdate}
              name="taskPackage4"
              label="Task Package 4"
              multiline
              rows={2}
              required
              size="small"
              fullWidth
            />
            <Typography variant="subtitle2">Task package 5</Typography>

            <InputField
              disabled={!isUpdate}
              name="taskPackage5"
              label="Task Package 5"
              multiline
              rows={2}
              required
              size="small"
              fullWidth
            />
          </Stack>
        </Box>
      </Card>
      <Card id="pic_url">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Attachment</CardTitle>
          <UploadFileField name="attachment" label="Attachment" />
        </Box>
      </Card>
      <Card id="keywords">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Keywords
          </CardTitle>
          <Stack spacing={2}>
            <InputField
              disabled={!isUpdate}
              name="keywords"
              fullWidth
              id="outlined-multiline-static"
              variant="outlined"
              label="Keywords"
            />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default MiddleForm;
