import React, {useRef, useState} from 'react';
import withLayout from "../components/layout/withLayout";
import styles from "./fileUpload.module.css";
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/router";
import Button from "../components/util/button/button.js";
import HeadersPopup from "./headersPopup";
import {checkDataIsValid, getFileSheets} from './preprocessFile';
import SheetsOptionsPopup from "./sheetsOptionsPopup";

const DragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [sheetData, setSheetData] = useState([]);
    const [showHeadersPopup, setShowHeadersPopup] = useState(false);
    const [showOptionsPopup, setShowOptionsPopup] = useState(false);
    const [headersRow, setHeadersRow] = useState();
    const [data, setData] = useState();
    const [listOfSheets, setListOfSheets] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState('');


    const fileInputRef = useRef();
    const router = useRouter();

    const handleDragEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileInputChange = async (e) => {
        const {files} = e.target;
        await handleFiles(files);
    };

    const handleDrop = async (e) => {
        handleDragEvent(e);
        setIsDragging(false);
        const {files} = e.dataTransfer;
        await handleFiles(files);
    };

    const handleFiles = async (files) => {
        const file = files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!['xlsx', 'csv'].includes(fileExtension)) {
            setErrorMessage('Please upload a .xlsx or .csv file.');
            return;
        }

        const arrayBufferData = await file.arrayBuffer();
        setData(arrayBufferData);
        const isValid = await checkDataIsValid(arrayBufferData, {setErrorMessage});
        //cal function which will return list of sheets
        setListOfSheets(await getFileSheets(arrayBufferData));

        if (isValid) {
            const newFile = {
                id: uuidv4(),
                file,
                name: file.name,
                size: file.size,
                type: file.type,
            };
            setUploadedFiles([newFile]);
            setShowHeadersPopup(true);
        }
    };

    const onCancel = async () => {
        await router.push("/");
    };

    const handleHeadersPopupSubmit = () => {
        setShowHeadersPopup(false);
    };

    const handleHeadersPopupClose = () => {
        setShowHeadersPopup(false);
    };

    const handleCloseOptionsPopup = () => {
        setShowOptionsPopup(false);
    };

    const handleOptionsPopupSubmit = async () => {

        console.log("list", listOfSheets);
        console.log("selectedSheet", selectedSheet);
        console.log("headers", headersRow);

        // setShowOptionsPopup(false);
        // await router.push({
        //     pathName: "/sheetsOptions",
        //     query: {data: JSON.stringify(sheetData)}
        // });
    };

    const removeFile = (id) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
        setListOfSheets([]);
        setSheetData([]);
        setErrorMessage('');
        setHeadersRow(1);
    };


    const onSubmit = async () => {

        if (listOfSheets.length > 1) {
            setShowOptionsPopup(true);

        } else if (listOfSheets.length === 1) {
            setSelectedSheet(listOfSheets[0]);
            setShowHeadersPopup(true);
            // call page preprocess selected sheet
        } else {
            setErrorMessage('Please upload a .xlsx or .xls file before submitting.');
        }
    };

    return (
        <div className={styles.card}
             onDragEnter={e => {
                 handleDragEvent(e);
                 setIsDragging(true);
             }}
             onDragLeave={e => {
                 handleDragEvent(e);
                 setIsDragging(false);
             }}
             onDragOver={handleDragEvent}
             onDrop={handleDrop}>
            <div className={styles.spaces}>
                <div className={styles.content}>
                    <h1>Drag and Drop</h1>
                    <input
                        type="file"
                        accept=".xlsx,.csv"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        style={{display: 'none'}}/>
                    <img className={styles.img}
                         src={"/upload.svg"}
                         alt={"dragAndDrop"}
                         onClick={() => fileInputRef.current.click()}/>

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
                                    <button className={styles.removeButton}
                                            onClick={() => removeFile(file.id)}>X</button>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={onCancel} label={"Cancel"}/>
                <Button onClick={onSubmit} label={"Submit"}/>
            </div>
            {showHeadersPopup && listOfSheets.length === 1 &&
                <HeadersPopup
                    setHeadersRow={setHeadersRow}
                    handlePopupSubmit={handleHeadersPopupSubmit}
                    handleClose={handleHeadersPopupClose}
                    defaultValue={headersRow}
                />}
            {showOptionsPopup && listOfSheets.length > 1 &&
                <SheetsOptionsPopup
                    listOfSheets={listOfSheets}
                    setSelectedSheet={setSelectedSheet}
                    handleOptionsPopupSubmit={handleOptionsPopupSubmit}
                    handleCloseOptionsPopup={handleCloseOptionsPopup}
                    defaultValue={headersRow}
                    setHeadersRow={setHeadersRow}
                />}
        </div>
    )
}

export default withLayout(DragAndDrop);