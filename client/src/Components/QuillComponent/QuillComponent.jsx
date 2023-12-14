import React from 'react';
import ReactQuill from 'react-quill';
import * as styled from './Quill.style';

const modules = {
   toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
   ],
};

function QuillComponent({ value, onChange }) {
   return (
      <styled.div>
         <ReactQuill
            theme="snow"
            modules={modules}
            value={value}
            onChange={onChange}
         />
      </styled.div>
   );
}

export default QuillComponent;
