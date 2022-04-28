import { Jodit } from 'jodit';
import JoditReact from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import { uploadfiletoreso } from 'redux/file/api';
// import { string } from 'yup/lib/locale';

const codeBlockButton = () => {
  Jodit.defaultOptions.controls.codeBlock = {
    name: 'Code Block',
    iconURL:
      'https://cdn.icon-icons.com/icons2/2406/PNG/512/codeblock_editor_highlight_icon_145997.png',
    exec: async (editor) => {
      const pre = editor.selection.j.createInside.element('pre');
      pre.style = 'background-color:#F0F0F0; text-align:left; padding:10px'; // this can be done by adding an editor class: editorCssClass: my-class - see doc https://xdsoft.net/jodit/v.2/doc/Jodit.defaultOptions.html
      pre.innerHTML = `${editor.selection.html}`;
      editor.selection.insertNode(pre);
    }
  };
};

const insertImage = (editor, url) => {
  const image = editor.selection.j.createInside.element('img');
  image.setAttribute('src', url);
  editor.selection.insertNode(image);
};

const imageUpload = (editor) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async function () {
    const imageFile = input.files ? input.files[0] : null;

    if (!imageFile) {
      return;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      return;
    }
    const formData = new FormData();
    formData.append('file', imageFile);
    const imageInfo = await uploadfiletoreso(formData).then((res) => res.data);
    insertImage(editor, imageInfo);
  };
};

const uploadImageButton = () => {
  Jodit.defaultOptions.controls.uploadImage = {
    name: 'Upload image to Cloudinary',
    iconURL:
      'https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png',
    exec: (editor) => {
      imageUpload(editor);
    }
  };
};

export default function JoditEditor({ value, onChange, placeholder, ...other }) {
  const [isSetupButton, setIsSetupButton] = useState(false);

  useEffect(() => {
    uploadImageButton();
    codeBlockButton();
    setIsSetupButton(true);
  }, []);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      autofocus: true,
      tabIndex: 1,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_clear_html',
      placeholder: placeholder || 'Write something awesome ...',
      beautyHTML: true,
      toolbarButtonSize: 'large',
      buttons: [
        'source',
        '|',
        'bold',
        'italic',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'video',
        'table',
        'link',
        '|',
        'left',
        'center',
        'right',
        'justify',
        '|',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'fullsize'
      ],
      extraButtons: ['uploadImage', 'codeBlock']
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // workaroudn for isSetupButton
    [placeholder, isSetupButton]
  );

  return (
    <div>
      <JoditReact
        value={value}
        config={editorConfig}
        onChange={(content) => {
          onChange(content);
        }}
      />
    </div>
  );
}
