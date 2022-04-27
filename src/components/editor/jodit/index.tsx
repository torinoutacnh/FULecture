// form
// @mui
import { BoxProps } from '@material-ui/core';
// import { FormHelperText } from '@mui/material';
// import DraftEditor from 'components/editor/draft';
import { EditorProps } from 'draft-js';
import JoditEditor from 'components/editor/jodit/JoditEditor';
//

// ----------------------------------------------------------------------

interface Props extends EditorProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  sx?: BoxProps;
  toolBar?: boolean;
}

export default function RHFEditor(
  { id = 'minimal-quill', error, onChange, simple = false, sx, toolBar = true, ...other }: Props,
  props: any
) {
  const { value } = props;
  return (
    <JoditEditor
      value={value}
      onChange={onChange}
      placeholder="Write something awesome..."
      {...other}
    />
  );
}
