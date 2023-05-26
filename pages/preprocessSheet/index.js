import React, {useEffect, useState} from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./preprocessSheet.module.css";
import Button from "../components/util/button/button";
import {getCookie} from "cookies-next";
import CustomInput from "../components/util/input/customInput";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import dataTypes from "../components/data/dataTypes.json";


const PreprocessSheet = () => {
    const [deletedColumnIndex, setDeletedColumnIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("selectedSheet");
    const [sheetsData, setSheetsData] = useState({});
    const [originalSheetsData, setOriginalSheetsData] = useState({}); // Save the original state of sheetsData
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState('Sheet1');
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);


    useEffect(() => {
        const sheetData = JSON.parse(getCookie('sheetData') || '{}');
        const columns = sheetData[selectedSheet].map(item => item.column);
        const columnTypes = sheetData[selectedSheet].map(item => item.dataType);
        setSheetsData(sheetData);
        setOriginalSheetsData(sheetData);
        setSelectedColumns(columns);
        setSelectedColumnTypes(columnTypes);
    }, []);

    const handleColumnTypeChange = (index, newValue) => {
        // Update the selectedColumnTypes state
        setSelectedColumnTypes(prevTypes => {
            const updatedTypes = [...prevTypes];
            updatedTypes[index] = newValue;
            return updatedTypes;
        });

        // Update the data type in sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map((col, colIndex) => {
            if (colIndex === index) {
                return {...col, dataType: newValue.value}; // Use newValue.value here
            }
            return col;
        });

        console.log(updatedSheetsData);
        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleDeleteColumn = (column) => {
        // Update selectedColumns
        setSelectedColumns(prevColumns => prevColumns.filter(col => col !== column));

        // Update sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].filter(col => col.column !== column);
        setSheetsData(updatedSheetsData);
    };


    const handleColumnNameChange = (index, newValue) => {
        const oldColumnName = selectedColumns[index];

        // Update the selectedColumns state
        setSelectedColumns(prevColumns => {
            const updatedColumns = [...prevColumns];
            updatedColumns[index] = newValue;
            return updatedColumns;
        });

        // Update the column name in sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(col => {
            if (col.column === oldColumnName) {
                return {...col, column: newValue};
            }
            return col;
        });

        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleCancelChanges = () => {
        // Get original state from originalSheetsData
        const originalColumns = originalSheetsData[selectedSheet].map(col => col.column);
        const originalColumnTypes = originalSheetsData[selectedSheet].map(item => dataTypes.find(option => option.value === item.dataType));

        // Update states with original values
        setSheetsData({...originalSheetsData}); // Make sure to create a new object
        setSelectedColumns([...originalColumns]); // Create a new array
        setSelectedColumnTypes([...originalColumnTypes]); // Create a new array
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
                <div>
                    {selectedColumns.map((column, index) => (
                        <div key={index}
                             className={`${styles.columnWrapper} ${deletedColumnIndex === index ? styles.hide : ''}`}>
                            {index === 0 && <h5>Columns</h5>}
                            <div className={styles.columns}>
                                <img src={"/bin.svg"}
                                     alt={"bin"}
                                     className={styles.bin}
                                     onClick={() => handleDeleteColumn(column)}></img>
                                <CustomInput
                                    defaultValue={column}
                                    type={"text"}
                                    onChange={(value) => {
                                        handleColumnNameChange(index, value)
                                    }}
                                    className={styles.input}
                                    label={"Column Name"}
                                />
                                <SelectWithLabel
                                    label={"Type"}
                                    options={dataTypes}
                                    value={dataTypes.find(option => option.value === selectedColumnTypes[index])}
                                    onChange={(value) => handleColumnTypeChange(index, value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.buttonContainer}>
                    {JSON.stringify(originalSheetsData) !== JSON.stringify(sheetsData) && (
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