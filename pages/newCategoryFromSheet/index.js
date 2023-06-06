import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Card from "../components/util/card/card";
import styles from "./newCategoryFromSheet.module.css";
import withLayout from "../components/layout/withLayout";
import {getCookie} from "cookies-next";
import {readExcel} from "../api/csvAPI";
import CustomInput from "../components/util/input/customInput";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import dataTypes from "../components/data/dataTypes.json";
import Button from "../components/util/button/button";


const CreateNewCategoryFromSheet = () => {
    const [sheets, setSheets] = useState({});
    const [loading, setLoading] = useState(true);  // initialize loading state
    const [originalSheets, setOriginalSheets] = useState({});
    const [categoryNames, setCategoryNames] = useState({});
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [columnNamesChanged, setColumnNamesChanged] = useState(false);
    const [sheetDeleted, setSheetDeleted] = useState(false);
    const [columnDeleted, setColumnDeleted] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const sheetsHeadersJson = JSON.parse(getCookie('sheetsHeadersJson') || '{}');
            const fileKey = getCookie('fileKey');
            const dataArray = await readExcel(fileKey, sheetsHeadersJson);
            const newSheets = Object.assign({}, ...dataArray);

            // Include originalColumn in sheets
            for (const sheetName in newSheets) {
                newSheets[sheetName] = newSheets[sheetName].map(column => ({
                    ...column,
                    originalColumn: column.column
                }));
            }
            setSheets(newSheets);
            setOriginalSheets(newSheets);

            // Initialize selectedColumnTypes with the data types of the columns
            const initialColumnTypes = {};
            for (const sheetName in newSheets) {
                newSheets[sheetName].forEach((column, columnIndex) => {
                    initialColumnTypes[`${sheetName}_${columnIndex}`] = column.dataType;
                });
            }
            setSelectedColumnTypes(initialColumnTypes);

            setLoading(false);
        }
        fetchData();
    }, []);

    const handleCancelChanges = () => {
        setSheets(originalSheets);
        setColumnNamesChanged(false);
        setSheetDeleted(false);
        setColumnDeleted(false);
    };

    const handleDeleteColumn = (sheetName, columnIndex) => {
        setSheets(prevSheets => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            const newColumns = prevSheets[sheetName].filter((_, i) => i !== columnIndex);

            if (newColumns.length === 0) {
                // if all columns have been deleted, delete the sheet
                const newSheets = {...prevSheets};
                delete newSheets[sheetName];
                setSheetDeleted(true);
                return newSheets;
            } else {
                // otherwise, update the columns of the sheet
                setColumnDeleted(true);
                return {
                    ...prevSheets,
                    [sheetName]: newColumns,
                };
            }
        });
    };

    const handleDeleteSheet = (sheetName) => {
        setSheets(prevSheets => {
            const newSheets = {...prevSheets};
            delete newSheets[sheetName];
            setSheetDeleted(true);
            return newSheets;
        });
    }

    const updateCategoryName = (sheetName, newCategoryName) => {
        setCategoryNames(prevCategoryNames => {
            const newCategoryNames = {...prevCategoryNames};
            newCategoryNames[sheetName] = newCategoryName;
            return newCategoryNames;
        });
    };

    const handleColumnNameChange = (sheetName, columnIndex, value) => {
        setSheets(prevSheets => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            setColumnNamesChanged(true);

            return {
                ...prevSheets,
                [sheetName]: prevSheets[sheetName].map((column, i) => i === columnIndex ? {
                    ...column,
                    column: value
                } : column)
            };
        });
    };

    const handleColumnTypeChange = (sheetName, columnIndex, selectedOption) => {
        setSelectedColumnTypes(prevColumnTypes => ({
            ...prevColumnTypes,
            [`${sheetName}_${columnIndex}`]: selectedOption.value,
        }));

        // Update the data type in sheets
        setSheets(prevSheets => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            return {
                ...prevSheets,
                [sheetName]: prevSheets[sheetName].map((column, i) => i === columnIndex ? {
                    ...column,
                    dataType: selectedOption.value
                } : column)
            };
        });
    };


    const handleSubmit = () => {
        const finalSheets = Object.keys(sheets).reduce((acc, sheetName) => {
            const categoryName = categoryNames[sheetName] || sheetName;
            acc[sheetName] = [{
                "categoryName": categoryName,
                "columns": sheets[sheetName].map((column, columnIndex) => {
                    const columnType = selectedColumnTypes[`${sheetName}_${columnIndex}`];
                    return {
                        ...column,
                        dataType: columnType,
                    };
                }),
            }];
            return acc;
        }, {});
        console.log(finalSheets);
        //send to backend and crete categories and add products
    }

    const router = useRouter();
    const onCancel = async () => {
        await router.push("/fileUpload");
    };


    return (
        <Card>
            <div>
                <div className={styles.headers}>
                    <h1>New Category From Sheet</h1>
                </div>
                <hr className={styles.hr}/>
                {loading ?
                    <div className={styles.loadingWave}>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                        <div className={styles.loadingBar}></div>
                    </div>
                    :
                    <div>
                        <h5 className={styles.definedSheets}>Defined sheets</h5>
                        {Object.entries(sheets).map(([sheetName, columns], index) => (
                            <table key={index} className={styles.sheetTable}>
                                <thead className={styles.categoryTableHeaders}>
                                <tr>
                                    <th>Sheet Name</th>
                                    <th>Category Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <span>{sheetName}</span>
                                    </td>
                                    <td>
                                        <div className={styles.sheetRow}>
                                            <CustomInput
                                                type="text"
                                                value={categoryNames[sheetName]}
                                                onChange={(value) => updateCategoryName(sheetName, value)}
                                                placeholder="Category name"
                                                className={styles.input}
                                            />
                                            <img src={"/x.svg"}
                                                 alt={"x"}
                                                 className={styles.deleteSheet}
                                                 onClick={() => handleDeleteSheet(sheetName)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan='4'>
                                        {columns.map((column, columnIndex) => (
                                            <div className={styles.columnBox}>
                                                {columnIndex === 0 && <h6>Defined columns</h6>}
                                                <div className={styles.columns}>
                                                    <div className={styles.colLabel}>
                                                        {columnIndex === 0 && <span>Column Name</span>}
                                                        <CustomInput
                                                            defaultValue={column.column}
                                                            type={"text"}
                                                            onChange={(value) => {
                                                                handleColumnNameChange(sheetName, columnIndex, value)
                                                            }}
                                                            className={styles.input}
                                                        />
                                                    </div>
                                                    <div className={styles.colLabel}>
                                                        {columnIndex === 0 &&
                                                            <span className={styles.selectLabel}>Type</span>}
                                                        <div className={styles.select}>
                                                            <SelectWithLabel
                                                                options={dataTypes}
                                                                value={dataTypes.find(option => option.value === selectedColumnTypes[`${sheetName}_${columnIndex}`])}
                                                                onChange={(selectedOption) => handleColumnTypeChange(sheetName, columnIndex, selectedOption)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <img src={"/x.svg"}
                                                         alt={"x"}
                                                         className={index !== 0 ? styles.xFirst : styles.x}
                                                         onClick={() => handleDeleteColumn(sheetName, columnIndex)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        ))}
                        <div className={styles.buttonContainer}>
                            {(columnNamesChanged || sheetDeleted || columnDeleted) && (
                                <Button onClick={handleCancelChanges} label={"Cancel Changes"}/>
                            )}
                            <Button onClick={onCancel} label={"Cancel"}/>
                            <Button onClick={handleSubmit} label={"Submit"}/>
                        </div>
                    </div>
                }
            </div>
        </Card>
    )
}

export default withLayout(CreateNewCategoryFromSheet);