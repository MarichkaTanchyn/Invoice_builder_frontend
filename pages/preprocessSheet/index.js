import React, {useEffect, useState} from "react";
import withLayout from "../../components/layout/withLayout";
import Card from "../../components/util/card/card";
import styles from "./preprocessSheet.module.css";
import Button from "../../components/util/button/button";
import {getCookie} from "cookies-next";
import CustomInput from "../../components/util/input/customInput";
import SelectWithLabel from "../../components/util/filter/selectWithLabel";
import dataTypes from "../../components/data/dataTypes.json";
import {useRouter} from "next/router";
import {preprocessCsv, readExcel} from "../api/csvAPI";
import globalStyles from "../global.module.css";
import CheckboxWithLabel from "../../components/util/filter/checkboxWithLabel";
import WarningPopup from "../../components/util/warningPopup/warningPopup";

const PreprocessSheet = () => {
    const [deletedColumnIndex, setDeletedColumnIndex] = useState(null);
    const [sheetsData, setSheetsData] = useState({});
    const [originalSheetsData, setOriginalSheetsData] = useState({});
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState("");
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [originalColumnNames, setOriginalColumnNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileKey, setFileKey] = useState("");
    const [useInInvoice, setUseInInvoice] = useState({});
    const [invalidColumns, setInvalidColumns] = useState([]);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [headersRow, setHeadersRow] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sheetHeaderJson = JSON.parse(getCookie("sheetHeaderJson") || "{}");
            const fileKey = getCookie("fKey");
            const dataArray = await readExcel(fileKey, sheetHeaderJson);
            const sheetData = dataArray ? dataArray[0] : {};
            const selectedSheet = Object.keys(sheetData)[0];
            if (!selectedSheet) return;
            const columns = sheetData[selectedSheet].map((item) => item.column);
            const columnTypes = sheetData[selectedSheet].map((item) => item.dataType);
            sheetData[selectedSheet] = sheetData[selectedSheet].map((item) => ({
                ...item,
                originalColName: item.column,
                useInInvoice: false,
            }));
            setFileKey(fileKey);
            setHeadersRow(sheetHeaderJson)
            setSelectedSheet(selectedSheet);
            setSheetsData(sheetData);
            setOriginalSheetsData(sheetData);
            setSelectedColumns(columns);
            setSelectedColumnTypes(columnTypes);
            setOriginalColumnNames(columns);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleColumnTypeChange = (index, newValue) => {
        // Update the selectedColumnTypes state
        setSelectedColumnTypes((prevTypes) => {
            const updatedTypes = [...prevTypes];
            updatedTypes[index] = newValue;
            return updatedTypes;
        });

        // Update the data type in sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(
            (col, colIndex) => {
                if (colIndex === index) {
                    return {...col, dataType: newValue.value}; // Use newValue.value here
                }
                return col;
            }
        );

        setInvalidColumns((prevInvalidColumns) => {
            return prevInvalidColumns.filter((invalidIndex) => invalidIndex !== index.toString());
        });
        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleDeleteColumn = (column) => {
        // Update selectedColumns
        setSelectedColumns((prevColumns) =>
            prevColumns.filter((col) => col !== column)
        );

        // Update sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].filter(
            (col) => col.column !== column
        );
        setSheetsData(updatedSheetsData);
    };

    const handleCheckboxChange = (index) => (event) => {
        const checked = event.target.checked;
        setUseInInvoice((prevState) => ({
            ...prevState,
            [`${index}`]: checked,
        }));

        setSheetsData((prevSheetsData) => {
            const updatedSheetsData = {...prevSheetsData};
            updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(
                (col, colIndex) => {
                    if (colIndex === index) {
                        return {...col, useInInvoice: checked};
                    }
                    return col;
                }
            );
            return updatedSheetsData;
        });
    };

    const handleColumnNameChange = (index, newValue) => {
        const oldColumnName = selectedColumns[index];

        // Update the selectedColumns state
        setSelectedColumns((prevColumns) => {
            const updatedColumns = [...prevColumns];
            updatedColumns[index] = newValue;
            return updatedColumns;
        });

        // Update the column name in sheetsData
        const updatedSheetsData = {...sheetsData};
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(
            (col) => {
                if (col.column === oldColumnName) {
                    return {...col, column: newValue}; // only change column, originalColName remains the same
                }
                return col;
            }
        );

        // Save the updated sheetsData
        setSheetsData(updatedSheetsData);
    };

    const handleCancelChanges = () => {
        const originalColumns = originalSheetsData[selectedSheet].map(
            (col) => col.column
        );

        setSheetsData((prevSheetsData) => {
            const updatedSheetsData = {...prevSheetsData};
            updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(
                (col, index) => {
                    return {...col, column: originalColumns[index]};
                }
            );
            return updatedSheetsData;
        });
        setSelectedColumns([...originalColumns]);
    };

    const router = useRouter();
    const onCancel = async () => {
        await router.push("/fileUpload");
    };

    const handleSubmit = async () => {
        const newInvalidColumns = selectedColumnTypes.map((type, index) =>
            type ? null : index.toString()
        ).filter(index => index !== null);

        if (newInvalidColumns.length > 0) {
            setInvalidColumns(newInvalidColumns);
            return;
        }
        const response = await preprocessCsv(
            fileKey,
            sheetsData,
            headersRow,
            "preprocessSelectedSheetData"
        );

        if (response === "success") {
            await router.push("/products");
        } else {
            setShowWarningPopup(true);
            setErrorMessage(response.message);
        }
    };
    return (
        <Card customStyle={styles.card}>
            <div className={styles.box}>
                <h1>Customize column mapping</h1>
                <hr/>
                {loading ? (
                    <div className={globalStyles.loadingWave}>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.definedCol}>
                            {selectedColumns.map((column, index) => (
                                <div
                                    key={column}
                                    className={`${styles.columnWrapper} ${
                                        deletedColumnIndex === index ? styles.hide : ""
                                    }`}
                                >
                                    {index === 0 && <h4>Defined columns</h4>}
                                    <div className={styles.columns}>
                                        <div className={styles.colLabel}>
                                            {index === 0 && (
                                                <span style={{marginBottom: "-.4em"}}>
                          Column Name
                        </span>
                                            )}
                                            <CustomInput
                                                defaultValue={column}
                                                type={"text"}
                                                onChange={(value) => {
                                                    handleColumnNameChange(index, value);
                                                }}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.colLabel}>
                                            {index === 0 && (
                                                <span className={styles.selectLabel}>Type</span>
                                            )}
                                            <div style={{marginBottom: index === 0 ? '1em' : '0'}}>
                                                <SelectWithLabel
                                                    options={dataTypes}
                                                    value={dataTypes.find((option) => option.value === selectedColumnTypes[index])}
                                                    onChange={(selectedOption) => handleColumnTypeChange(index, selectedOption)}
                                                    isError={invalidColumns.includes(`${index}`)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.labelBox}>
                                            {index === 0 && (
                                                <span className={styles.label}>Use In Invoice</span>
                                            )}
                                            <div style={{marginBottom: index === 0 ? '1em' : '0'}}>
                                                <CheckboxWithLabel
                                                    checked={useInInvoice[`${index}`] || false}
                                                    onChange={handleCheckboxChange(index)}
                                                />
                                            </div>
                                        </div>
                                        <img
                                            src={"/x.svg"}
                                            alt={"x"}
                                            className={index !== 0 ? styles.x : styles.xFirst}
                                            onClick={() => handleDeleteColumn(column)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.buttonContainer}>
                            {JSON.stringify(originalColumnNames) !==
                                JSON.stringify(selectedColumns) && (
                                    <Button
                                        onClick={handleCancelChanges}
                                        label={"Cancel Changes"}
                                    />
                                )}
                            <Button onClick={onCancel} label={"Cancel"}/>
                            <Button onClick={handleSubmit} label={"Submit"}/>
                        </div>
                        {showWarningPopup && (
                            <WarningPopup
                                type={"Error"}
                                message={errorMessage}
                                actionMessage={"* Please select correct value or remove the column"}
                                handleClose={() => setShowWarningPopup(false)}/>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default withLayout(PreprocessSheet);
