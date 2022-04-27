import { isString } from 'lodash';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
// material
import closeFill from '@iconify/icons-eva/close-fill';
import { motion } from 'framer-motion';

import { MIconButton } from 'components/@material-extend';

import fileFill from '@iconify/icons-eva/file-fill';
import { Icon } from '@iconify/react';
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Theme, Typography, Paper, Stack, Container } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { varFadeInRight } from 'components/animate';
import { UploadIllustration } from '../../assets';
// utils
import { fData } from '../../utils/formatNumber';
//

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadSingleFileProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  onRemove?: (file: File | string) => void;
  sx?: SxProps<Theme>;
}

export default function UploadSingleFile({
  error = false,
  file,
  onRemove,
  sx,
  ...other
}: UploadSingleFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && { padding: '12% 0' })
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ width: 220 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      {file && (
        <Container
          component={motion.div}
          {...varFadeInRight}
          sx={{
            my: 1,
            py: 0.75,
            px: 2,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: 'background.paper'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon={fileFill} width={28} height={28} />
              <Typography variant="subtitle2">{isString(file) ? file : file.path}</Typography>
            </Stack>
            <MIconButton edge="end" size="small" onClick={() => onRemove!(file)}>
              <Icon icon={closeFill} />
            </MIconButton>
          </Stack>
        </Container>
      )}

      {file !== null && isString(file) ? console.log(file) : console.log(file?.path)}
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
