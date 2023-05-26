import React, {useState} from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./preprocessSheet.module.css";
import Button from "../components/util/button/button";
import {getCookie} from "cookies-next";


const PreprocessSheet = () => {
    const [sheetsData, setSheetsData] = useState(JSON.parse(getCookie('sheetsData') || '[]'));
    const [originalSheetsData, setOriginalSheetsData] = useState(JSON.parse(getCookie('sheetsData') || '[]')); // Save the original state of sheetsData
    const [deletedColumnIndex, setDeletedColumnIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("selectedSheet");
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedColumns, setSelectedColumns] = useState([]);


    const handleDeleteColumn = (column) => {
        const columnIndex = selectedColumns.findIndex((col) => col === column);
        setDeletedColumnIndex(columnIndex);

        setTimeout(() => {
            setSelectedColumns(prevColumns => {
                const updatedColumns = prevColumns.filter(col => col !== column);
                return updatedColumns;
            });

            // Update sheetsData to remove the selected column from each row
            const updatedSheetsData = {...sheetsData};
            updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(row => {
                const newRow = {...row};
                delete newRow[column];
                return newRow;
            });

            // Save the updated sheetsData
            setSheetsData(updatedSheetsData);
            setDeletedColumnIndex(null);
        }, 300);
    };


    const handleColumnNameChange = (index, newValue) => {
        const oldColumnName = selectedColumns[index];

        // Update the selectedColumns state
        setSelectedColumns(prevColumns => {
            const updatedColumns = [...prevColumns];
            updatedColumns[index] = newValue;
            return updatedColumns;
        });

        // Update the column names in sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(row => {
            const newRow = {...row};
            newRow[newValue] = newRow[oldColumnName];
            delete newRow[oldColumnName];
            return newRow;
        });

        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleCancelChanges = () => {
        setSheetsData(originalSheetsData); // Reset sheetsData to its original state

        // Reset selectedColumns to its original state
        if (selectedSheet) {
            const originalUniqueColumnNames = Array.from(
                new Set(originalSheetsData[selectedSheet].flatMap(Object.keys))
            );
            setSelectedColumns(originalUniqueColumnNames);
        }
    };

    const handleSubmit = () => {
        if (selectedOption === "selectedSheet") {
            console.log(sheetsData);
            console.log(selectedSheet);
            console.log(sheetsData[selectedSheet]);
        }
    }
    return (
        <Card customStyle={styles.card}>
            <div className={styles.box}>
                {/*<div>*/}
                {/*    {selectedColumns.map((column, index) => (*/}
                {/*        <div key={index} className={`${styles.columnWrapper} ${deletedColumnIndex === index ? styles.hide : ''}`}>*/}
                {/*            {index === 0 && <h5>Columns</h5>}*/}
                {/*            <img src={"/bin.svg"}*/}
                {/*                alt={"bin"}*/}
                {/*                className={styles.bin}*/}
                {/*                onClick={() => handleDeleteColumn(column)}></img>*/}
                {/*            <CustomInput*/}
                {/*                defaultValue={column}*/}
                {/*                type={"text"}*/}
                {/*                onChange={(value) => { handleColumnNameChange(index, value) }}*/}
                {/*                className={styles.input}*/}
                {/*            />*/}

                {/*        </div>*/}
                {/*    ))}*/}
                {/*    </div>*/}

                <p>{sheetsData}</p>

                <div className={styles.buttonContainer}>
                    {originalSheetsData !== sheetsData && (
                        <Button onClick={handleCancelChanges} label={"Cancel Changes"}/>
                    )}
                    <Button onClick={() => {
                    }} label={"Cancel"}/>
                    <Button onClick={handleSubmit} label={"Submit"}/>

                </div>
            </div>
        </Card>
    );

}

export default withLayout(PreprocessSheet);