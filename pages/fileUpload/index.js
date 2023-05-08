import React, { useState, useRef } from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./fileUpload.module.css";
import { v4 as uuidv4 } from 'uuid';


const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const fileInputRef = useRef();

  const handleFileInputChange = (e) => {
    const { files } = e.target;
    handleFiles(files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const { files } = e.dataTransfer;
    handleFiles(files);
  };


  const handleFiles = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (fileExtension === 'xlsx' || fileExtension === 'csv') {
        setErrorMessage('');
        const newFile = {
          id: uuidv4(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        setUploadedFiles([newFile]);
      } else {
        setErrorMessage('Please upload a .xlsx or .csv file.');
      }
    }

  };
  return (
    <div className={styles.card}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <div className={styles.content}>
        <h1>Drag and Drop</h1>
        <input
          type="file"
          accept=".xlsx,.csv"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }} />
        <img className={styles.img}
          src={"/upload.svg"}
          alt={"dragAndDrop"}
          onClick={() => fileInputRef.current.click()} />

        <span>* .xlsx or .csv </span>
      </div>
      {uploadedFiles.length > 0 && (
        <ul className={styles.uploadedFiles}>
          {uploadedFiles.map((file) => {
            const fileExtension = file.name.split('.').pop();
            const fileNameWithoutExtension = file.name.substring(0, file.name.length - fileExtension.length - 1);
            const truncatedFileName = fileNameWithoutExtension.length > 10 ? fileNameWithoutExtension.substring(0, 10) + "..." : fileNameWithoutExtension;

            return (
              <li key={file.id}>
                {truncatedFileName}.{fileExtension} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                <button className={styles.removeButton} onClick={() => removeFile(file.id)}>X</button>
              </li>
            );
          })}
        </ul>
      )}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  )
}

export default withLayout(DragAndDrop);