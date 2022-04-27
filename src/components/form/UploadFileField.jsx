import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { UploadSingleFile } from 'components/upload';

import { DoneAllOutlined } from '@material-ui/icons';
import { ReactComponent as UploadSVG } from '../../assets/images/upload.svg';
import { uploadfiletoreso } from '../../redux/file/api';

const UploadImage = styled('img')({
  // width: '80px',
  height: '80px',
  objectFit: 'cover'
});

const RemoveBtn = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: 'rgba(22, 28, 36, 0.72)'
});

// eslint-disable-next-line arrow-body-style
const UploadFileField = ({ name, label, defaultValue = '' }) => {
  const { control, setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isUploading, setIsUploading] = React.useState(false);
  const imageUrl = useWatch({
    control,
    name
  });

  const onUpload = async (e, onFormChange) => {
    // upload to server
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    try {
      const res = await uploadfiletoreso(formData);
      onFormChange(res.data);
    } catch (err) {
      enqueueSnackbar(err.message ?? 'Có lỗi', {
        variant: 'error'
      });
      console.log(`err`, err);
    }
    setIsUploading(false);
  };

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field }) => (
        <Box textAlign="center">
          {imageUrl && <DoneAllOutlined />}

          <label htmlFor="icon-button-file" style={{ position: 'relative', display: 'block' }}>
            <Box
              bgColor="primary.main"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
              display={isUploading ? 'flex' : 'none'}
              borderRadius={1}
              flexDirection="column"
              zIndex={999}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
              <Typography variant="caption">Uploading file</Typography>
            </Box>
            <input
              color="primary"
              type="file"
              onChange={(e) => onUpload(e, field.onChange)}
              id="icon-button-file"
              style={{ display: 'none' }}
            />
            <Button
              sx={{
                backgroundColor: 'rgb(244, 246, 248)',
                border: '1px dashed rgba(145, 158, 171, 0.32)',
                borderRadius: '8px',
                textAlign: 'center',
                'flex-direction': 'column',
                display: 'flex',
                width: '100%'
              }}
              component="span"
            >
              <Box width="40%" my={2} mx="auto">
                <UploadSVG />
              </Box>
              <Box>
                <Typography variant="subtitle1">Select file</Typography>
              </Box>
            </Button>
          </label>
        </Box>
      )}
    />
  );
};

const UploadAvatarField = ({ name, label, defaultValue = '' }) => {
  const { control } = useFormContext();
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box sx={{ mb: 5 }}>
          <UploadSingleFile
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary'
                }}
              >
                {label}
              </Typography>
            }
            error={fieldState.error}
            value={field.value}
            onChange={field.onChange}
          />
          <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </Box>
      )}
    />
  );
};
UploadFileField.Avatar = UploadAvatarField;

export default UploadFileField;
