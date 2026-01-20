// // WordPadEditor.js
// import { useState, useEffect, useRef } from 'react';
// import TopTools from './TopTools/';
// import Sidebar from './SideTools/index';
// import EditorTools from './EditorTools/index';
// import { initialStyles, toggleStyle, setStyle } from './editorFunctions';
// import './WordPadEditor.css';

// import { saveAs } from 'file-saver';
// const WordPadEditor = () => {
//   // State Variables and Refs
//   const [content, setContent] = useState('');
//   const [styles, setStyles] = useState(initialStyles());

//   const editorRef = useRef(null);

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   // If you plan on implementing history (undo/redo), consider this
//   const [history, setHistory] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(-1);

//   useEffect(() => {
//     setStyles(initialStyles());
//   }, []);

//   const saveFile = () => {
//     const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
//     saveAs(blob, 'document.txt');
//   };

//   const createNew = () => {
//     setContent('');
//   };

//   const importFile = async () => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = '.txt';
//     fileInput.onchange = (e) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.readAsText(file, 'UTF-8');
//       reader.onload = (readerEvent) => {
//         setContent(readerEvent.target.result);
//       };
//     };
//     fileInput.click();
//   };

//   const exportFile = () => {
//     const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
//     saveAs(blob, 'exported-document.txt');
//   };

//   return (
//     <div className="EditorWord" style={{ direction: 'rtl' }}>
//       <TopTools
//         saveFile={saveFile}
//         createNew={createNew}
//         importFile={importFile}
//         exportFile={exportFile}
//         // ...existing props
//       />

//       <Sidebar setStyle={(key, value) => setStyle(setStyles, key, value)} />
//       <EditorTools content={content} setContent={handleChange} />
//     </div>
//   );
// };

// export default WordPadEditor;
