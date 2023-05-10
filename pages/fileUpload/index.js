import React, { useState, useRef } from 'react';
import withLayout from "../components/layout/withLayout";
import styles from "./fileUpload.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import Button from "../components/util/button/button.js";
import { addProducts } from "../api/productsApi";
import * as XLSX from 'xlsx';
import { setCookie } from 'cookies-next';


const DragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [sheetData, setSheetData] = useState([]);

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const fileInputRef = useRef();

  const handleFileInputChange = async(e) => {
    const { files } = e.target;
    await handleFiles(files);
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

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const { files } = e.dataTransfer;
    await handleFiles(files);
  };

  const readDataFromExcel = async (data) => {
    const wb = XLSX.read(data);
    const mySheetData = {};
    // Loop through the sheets
    for (let i = 0; i < wb.SheetNames.length; ++i) {
      let SheetName = wb.SheetNames[i];
      const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[SheetName]);
      mySheetData[SheetName] = jsonData;
    }
    setSheetData(mySheetData);
    console.log(Object.keys(mySheetData).length);
    console.log(mySheetData);
  };
  const handleFiles = async (files) => {
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
      const data = await file.arrayBuffer();
      await readDataFromExcel(data);
      setUploadedFiles([newFile]);
    } else {
      setErrorMessage('Please upload a .xlsx or .csv file.');
    }
  };

  const router = useRouter();
  const onCancel = async () => {
    await router.push("/");
  };

  const onSubmit = async () => {
    if (Object.keys(sheetData).length > 0) {
      if (Object.keys(sheetData).length > 1) {
        // setCookie('sheetsData', JSON.stringify(sheetData), {
        //   path: '/',
        //   // expires: 1,
        // });
        setCookie('sheetsData', JSON.stringify(sheetData));
        await router.push("/sheetsOptions");
        //TODO: go to screen select options with sheets
      }else {
        await addProducts(sheetData, "23");
      }
    } else {
      setErrorMessage('Please upload a .xlsx or .xls file before submitting.');
    }
  };

  return (
    <div className={styles.card}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <div className={styles.spaces}>
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
      <div className={styles.buttonContainer}>
        <Button onClick={onCancel} label={"Cancel"}></Button>
        <Button onClick={onSubmit} label={"Submit"}></Button>
      </div>
    </div>
  )
}

export default withLayout(DragAndDrop);