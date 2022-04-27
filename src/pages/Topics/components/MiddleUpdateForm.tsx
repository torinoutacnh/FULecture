import { Box, Divider, Stack, Typography, Slider, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, RadioGroupField, UploadFileField } from '../../../components/form';
import { PRODUCT_TYPE_DATA } from '../../../constraints';
import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';
import { TTopic } from '../../../types/topic';

type Props = {
  updateMode?: boolean;
  currentTopic?: TTopic;
};
// eslint-disable-next-line arrow-body-style
const MiddleUpdateForm: React.FC<Props> = ({ updateMode, currentTopic }) => {
  const { control, setValue, handleSubmit } = useFormContext();
  const [memberNumber, setMemberNumber] = useState<any>();
  return (
    <Box p={1} flex={1}>
      <Card id="product-detail">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Topic Detail
          </CardTitle>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <InputField
                name="code"
                label="Code"
                required
                size="small"
                value={currentTopic!.code}
              />
              <InputField
                name="name"
                label="Topic Name"
                required
                size="small"
                value={currentTopic!.name}
                fullWidth
              />
            </Stack>
            <Box>
              <InputField
                name="note"
                label="Note"
                required
                size="medium"
                value={currentTopic!.note}
                fullWidth
              />
            </Box>
            <Box>
              <InputField
                name="abtract"
                value={currentTopic!.abtract}
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
                name="description"
                value={currentTopic!.description}
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

      <Card id="pic_url">
        <Box textAlign="left">
          <CardTitle variant="subtitle1">Attachment</CardTitle>
          <UploadFileField
            name="attachment"
            label="Attachment"
            defaultValue={currentTopic!.attachment}
          />
        </Box>
      </Card>
      <Card id="keywords">
        <Box textAlign="left">
          <CardTitle mb={2} variant="subtitle1">
            Keywords
          </CardTitle>
          <Stack spacing={2}>
            <InputField
              name="keywords"
              value={currentTopic!.keywords}
              fullWidth
              id="outlined-multiline-static"
              variant="outlined"
              label="Mô tả keywords"
            />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default MiddleUpdateForm;
