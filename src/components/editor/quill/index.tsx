import ReactQuill, { ReactQuillProps } from 'react-quill';
// material
import { styled } from '@material-ui/core/styles';
import { Box, BoxProps, Toolbar } from '@material-ui/core';
// theme
import typography from '../../../theme/typography';
//
import EditorToolbar, { formats, redoChange, undoChange } from './QuillEditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...typography.body1,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

// ----------------------------------------------------------------------

interface QuillEditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  sx?: BoxProps;
  toolBar?: boolean;
}

export default function QuillEditor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  sx,
  toolBar = true,
  ...other
}: QuillEditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: { undo: undoChange, redo: redoChange }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <RootStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`
        }),
        ...sx
      }}
    >
      {toolBar ? <EditorToolbar id={id} isSimple={simple} /> : ''}
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={toolBar == true ? modules : { toolBar: null }}
        formats={formats}
        placeholder="Write something awesome..."
        {...other}
      />
    </RootStyle>
  );
}
