import React, {useEffect, useState} from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./preprocessSheet.module.css";
import Button from "../components/util/button/button";
import {getCookie} from "cookies-next";
import CustomInput from "../components/util/input/customInput";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import dataTypes from "../components/data/dataTypes.json";
import {useRouter} from "next/router";
import {readExcel} from "../api/csvAPI";


const PreprocessSheet = () => {
    const [deletedColumnIndex, setDeletedColumnIndex] = useState(null);
    const [sheetsData, setSheetsData] = useState({});
    const [originalSheetsData, setOriginalSheetsData] = useState({}); // Save the original state of sheetsData
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [originalColumnNames, setOriginalColumnNames] = useState([]);
    const [loading, setLoading] = useState(true);  // initialize loading state


    useEffect(() => {
        const fetchData = async () => {
            const sheetHeaderJson = JSON.parse(getCookie('sheetHeaderJson') || '{}');
            const fileKey = getCookie('fileKey');
            const dataArray = await readExcel(fileKey, sheetHeaderJson);
            const sheetData = dataArray[0];
            const selectedSheet = Object.keys(sheetData)[0];
            if (!selectedSheet) return;
            const columns = sheetData[selectedSheet].map(item => item.column);
            const columnTypes = sheetData[selectedSheet].map(item => item.dataType);
            sheetData[selectedSheet] = sheetData[selectedSheet].map(item => ({
                ...item,
                originalColName: item.column
            }));
            setSelectedSheet(selectedSheet)
            setSheetsData(sheetData);
            setOriginalSheetsData(sheetData);
            setSelectedColumns(columns);
            setSelectedColumnTypes(columnTypes);
            setOriginalColumnNames(columns);
            setLoading(false);

        }
        fetchData();
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
                return {...col, column: newValue}; // only change column, originalColName remains the same
            }
            return col;
        });

        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleCancelChanges = () => {
        const originalColumns = originalSheetsData[selectedSheet].map(col => col.column);

        // Update states with original values
        setSheetsData(prevSheetsData => {
            // Create a new object
            const updatedSheetsData = {...prevSheetsData};
            // Only change the column names back to original
            updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map((col, index) => {
                return {...col, column: originalColumns[index]};
            });
            return updatedSheetsData;
        });
        setSelectedColumns([...originalColumns]);
    };

    const router = useRouter();
    const onCancel = async () => {
        await router.push("/fileUpload");
    };
    const handleSubmit = () => {

        console.log(sheetsData);
        console.log(selectedSheet);
        console.log(sheetsData[selectedSheet]);
    }
    return (
        <Card customStyle={styles.card}>
            <div className={styles.box}>
                <h1>Customize column mapping</h1>
                <hr/>
                {loading ?
                    <div className={styles.loadingWave}>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                    </div>
                    :
                    <div>
                        <div className={styles.definedCol}>
                            {selectedColumns.map((column, index) => (
                                <div key={index}
                                     className={`${styles.columnWrapper} ${deletedColumnIndex === index ? styles.hide : ''}`}>
                                    {index === 0 && <h4>Defined columns</h4>}
                                    <div className={styles.columns}>
                                        <div className={styles.colLabel}>
                                            {index === 0 && <span>Column Name</span>}
                                            <CustomInput
                                                defaultValue={column}
                                                type={"text"}
                                                onChange={(value) => {
                                                    handleColumnNameChange(index, value)
                                                }}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.colLabel}>
                                            {index === 0 && <span className={styles.selectLabel}>Type</span>}
                                            <SelectWithLabel
                                                options={dataTypes}
                                                value={dataTypes.find(option => option.value === selectedColumnTypes[index])}
                                                onChange={(value) => handleColumnTypeChange(index, value)}
                                            />
                                        </div>
                                        <img src={"/x.svg"}
                                             alt={"x"}
                                             className={index !== 0 ? styles.x : styles.xFirst}
                                             onClick={() => handleDeleteColumn(column)}/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.buttonContainer}>
                            {JSON.stringify(originalColumnNames) !== JSON.stringify(selectedColumns) && (
                                <Button onClick={handleCancelChanges} label={"Cancel Changes"}/>
                            )}
                            <Button onClick={onCancel} label={"Cancel"}/>
                            <Button onClick={handleSubmit} label={"Submit"}/>

                        </div>
                    </div>
                }
            </div>
        </Card>
    );

}

export default withLayout(PreprocessSheet);