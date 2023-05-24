import React, { useRef, useState } from 'react';
import withLayout from "../components/layout/withLayout";
import styles from "./fileUpload.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import Button from "../components/util/button/button.js";
import { addProducts } from "../api/productsApi";
import HeadersPopup from "./headersPopup";
import { readDataFromExcel, checkDataIsValid } from './preprocessFile';

const DragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [sheetData, setSheetData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [sheets, SetSheets] = useState([]); 
    const [headersRow, setHeadersRow] = useState();
    const [data, setData] = useState();

    const fileInputRef = useRef();
    const router = useRouter();

    const handleDragEvent = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileInputChange = async (e) => {
        const { files } = e.target;
        await handleFiles(files);
    };

    const handleDrop = async (e) => {
        handleDragEvent(e);
        setIsDragging(false);
        const { files } = e.dataTransfer;
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
        //caal function which will return list of sheets

        if (isValid) {
            const newFile = {
                id: uuidv4(),
                file,
                name: file.name,
                size: file.size,
                type: file.type,
            };
            setUploadedFiles([newFile]);
            setShowPopup(true);
        }
    };

    const onCancel = async () => {
        await router.push("/");
    };

    const handlePopupSubmit = () => {
        setShowPopup(false);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const removeFile = (id) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
    };


    const onSubmit = async () => {
        if (Object.keys(sheetData).length === 0) {
            setErrorMessage('Please upload a .xlsx or .xls file before submitting.');
            return;
        }
        console.log("headersRow", headersRow);
        await readDataFromExcel({data, setSheetData, headersRow });
        console.log("sheetData", sheetData);
       

        if (Object.keys(sheetData).length > 1) {
            await router.push({
                pathName: "/sheetsOptions",
                query: { data: JSON.stringify(sheetData) }
            });
            return;
        }

        await addProducts(sheetData, "23");
        // TODO: Navigate to the screen categroryProducts
    };

    return (
        <div className={styles.card}
            onDragEnter={e => { handleDragEvent(e); setIsDragging(true); }}
            onDragLeave={e => { handleDragEvent(e); setIsDragging(false); }}
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
                {uploadedFiles.length > 0 && headersRow !== null &&
                    <Button onClick={handleOpenPopup} label={"Headers"}/>
                }
                <Button onClick={onCancel} label={"Cancel"} />
                <Button onClick={onSubmit} label={"Submit"} />
            </div>
            {/* if sheets.length === 1 than when submiting file show the headers popup, 
            else show popup with possibility select option how preproess this file */}
            {showPopup && 
            <HeadersPopup
                setHeadersRow={setHeadersRow}
                handlePopupSubmit={handlePopupSubmit}
                handleClose={handleClose}
                defaultValue={headersRow}
            />}
        </div>
    )
}

export default withLayout(DragAndDrop);