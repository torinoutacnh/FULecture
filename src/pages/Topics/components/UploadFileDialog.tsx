import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  MenuItem,
  Slider
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useRequest } from 'ahooks';
import useLocales from 'hooks/useLocales';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { UploadMultiFile, UploadSingleFile } from 'components/upload';

type Props = DialogProps & {
  studentId?: number | null;
  onAdd?: (data: any) => Promise<any>;
  onClose: () => any;
};

const UploadFileDialog: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [fileInfo, setFileInfo] = useState(null);
  const [isImport, setIsImport] = useState(false);

  useEffect(() => {
    if (fileInfo) {
      setIsImport(true);
    }
  }, [fileInfo]);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileInfo({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const submitHandler = () =>
    onAdd!(fileInfo).finally(() => {
      if (onClose) {
        setFileInfo(null);
        onClose();
      }
    });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Import Files</DialogTitle>
      <DialogContent dividers>
        <UploadSingleFile
          file={fileInfo}
          onDrop={handleDropSingleFile}
          onRemove={() => {
            setFileInfo(null);
            setIsImport(false);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <LoadingAsyncButton disabled={!isImport} variant="contained" onClick={submitHandler}>
          Import
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
