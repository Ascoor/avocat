// import { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './EditorTools.css';
// import Quill from 'quill';
// import JSZip from 'jszip';
// import { saveAs } from 'file-saver';

// import mammoth from 'mammoth'; // Import for DOCX

// // Add custom RTL button
// const Align = Quill.import('attributors/style/align');
// Quill.register(Align, true);
// const modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
// };

// const EditorTools = ({ content, setContent }) => {
//   const [editorContent, setEditorContent] = useState('');

//   useEffect(() => {
//     setEditorContent(content);
//   }, [content]);

//   const handleChange = (value) => {
//     setEditorContent(value);
//     setContent(value);
//   };

//   const exportAsDocx = () => {
//     // DOCX Export logic using mammoth.js
//     // You may need to process editorContent into the format mammoth expects
//     mammoth.convertToRaw(editorContent).then((result) => {
//       // Further processing to convert result to .docx
//     });
//   };

//   return (
//     <div className="editor-area">
//       <ReactQuill
//         value={editorContent}
//         onChange={handleChange}
//         modules={modules}
//       />
//       <button onClick={exportAsDocx}>Export as DOCX</button>
//     </div>
//   );
// };

// export default EditorTools;
