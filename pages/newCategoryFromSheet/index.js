import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Card from "../../components/util/card/card";
import styles from "./newCategoryFromSheet.module.css";
import withLayout from "../../components/layout/withLayout";
import {getCookie} from "cookies-next";
import {preprocessCsv, readExcel} from "../api/csvAPI";
import CustomInput from "../../components/util/input/customInput";
import SelectWithLabel from "../../components/util/filter/selectWithLabel";
import dataTypes from "../../components/data/dataTypes.json";
import Button from "../../components/util/button/button";
import CheckboxWithLabel from "../../components/util/filter/checkboxWithLabel";
import globalStyles from "../global.module.css";
import WarningPopup from "../../components/util/warningPopup/warningPopup";

const CreateNewCategoryFromSheet = () => {
    const [sheets, setSheets] = useState({});
    const [loading, setLoading] = useState(true); // initialize loading state
    const [originalSheets, setOriginalSheets] = useState({});
    const [categoryNames, setCategoryNames] = useState({});
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [columnNamesChanged, setColumnNamesChanged] = useState(false);
    const [sheetDeleted, setSheetDeleted] = useState(false);
    const [columnDeleted, setColumnDeleted] = useState(false);
    const [useInInvoice, setUseInInvoice] = useState({});
    const [invalidColumns, setInvalidColumns] = useState([]); // new state
    const [fileKey, setFileKey] = useState("");
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [headers, setHeaders] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const sheetsHeadersJson = JSON.parse(
                getCookie("sheetsHeadersJson") || "{}"
            );

            const fileKey = getCookie("fKey");
            const dataArray = await readExcel(fileKey, sheetsHeadersJson);
            const newSheets = dataArray ? Object.assign({}, ...dataArray) : {};
            setFileKey(fileKey);

            for (const sheetName in newSheets) {
                newSheets[sheetName] = newSheets[sheetName].map((column) => ({
                    ...column,
                    originalColumn: column.column,
                }));
            }
            setSheets(newSheets);
            setOriginalSheets(newSheets);

            for (const sheetName in newSheets) {
                newSheets[sheetName] = newSheets[sheetName].map((column) => ({
                    ...column,
                    useInInvoice: false,
                }));
            }

            const initialColumnTypes = {};
            for (const sheetName in newSheets) {
                newSheets[sheetName].forEach((column, columnIndex) => {
                    initialColumnTypes[`${sheetName}_${columnIndex}`] = column.dataType;
                });
            }
            setSelectedColumnTypes(initialColumnTypes);
            setHeaders(sheetsHeadersJson)
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleCancelChanges = () => {
        setSheets(originalSheets);
        setColumnNamesChanged(false);
        setSheetDeleted(false);
        setColumnDeleted(false);
    };

    const handleDeleteColumn = (sheetName, columnIndex) => {
        setSheets((prevSheets) => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            const newColumns = prevSheets[sheetName].filter(
                (_, i) => i !== columnIndex
            );

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
        setSheets((prevSheets) => {
            const newSheets = {...prevSheets};
            delete newSheets[sheetName];
            setSheetDeleted(true);
            return newSheets;
        });
    };

    const updateCategoryName = (sheetName, newCategoryName) => {
        setCategoryNames((prevCategoryNames) => {
            const newCategoryNames = {...prevCategoryNames};
            newCategoryNames[sheetName] = newCategoryName;
            return newCategoryNames;
        });
    };

    const handleColumnNameChange = (sheetName, columnIndex, value) => {
        setSheets((prevSheets) => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            setColumnNamesChanged(true);

            return {
                ...prevSheets,
                [sheetName]: prevSheets[sheetName].map((column, i) =>
                    i === columnIndex
                        ? {
                            ...column,
                            column: value,
                        }
                        : column
                ),
            };
        });
    };

    const handleColumnTypeChange = (sheetName, columnIndex, selectedOption) => {
        setSelectedColumnTypes((prevColumnTypes) => ({
            ...prevColumnTypes,
            [`${sheetName}_${columnIndex}`]: selectedOption.value,
        }));

        // Update the data type in sheets
        setSheets((prevSheets) => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }

            return {
                ...prevSheets,
                [sheetName]: prevSheets[sheetName].map((column, i) =>
                    i === columnIndex
                        ? {
                            ...column,
                            dataType: selectedOption.value,
                        }
                        : column
                ),
            };
        });
        setInvalidColumns((prevInvalidColumns) =>
            prevInvalidColumns.filter((key) => key !== `${sheetName}_${columnIndex}`)
        );
    };

    const handleCheckboxChange = (sheetName, columnIndex) => (event) => {
        const checked = event.target.checked;
        setUseInInvoice((prevState) => ({
            ...prevState,
            [`${sheetName}_${columnIndex}`]: checked,
        }));

        // Update the useInInvoice status in sheets
        setSheets((prevSheets) => {
            if (!prevSheets[sheetName]) {
                // if the sheet does not exist, return the previous state
                return prevSheets;
            }
            return {
                ...prevSheets,
                [sheetName]: prevSheets[sheetName].map((column, i) =>
                    i === columnIndex
                        ? {
                            ...column,
                            useInInvoice: checked,
                        }
                        : column
                ),
            };
        });
    };

    const handleSubmit = async () => {
        const finalSheets = Object.keys(sheets).reduce((acc, sheetName) => {
            const newInvalidColumns = [];
            for (const [sheetName, columns] of Object.entries(sheets)) {
                columns.forEach((_, columnIndex) => {
                    const columnType = selectedColumnTypes[`${sheetName}_${columnIndex}`];
                    if (!columnType) {
                        newInvalidColumns.push(`${sheetName}_${columnIndex}`);
                    }
                });
            }

            if (newInvalidColumns.length > 0) {
                setInvalidColumns(newInvalidColumns);
                return;
            }

            const categoryName = categoryNames[sheetName] || sheetName;
            acc[sheetName] = [
                {
                    categoryName: categoryName,
                    columns: sheets[sheetName].map((column, columnIndex) => {
                        const columnType =
                            selectedColumnTypes[`${sheetName}_${columnIndex}`];
                        return {
                            ...column,
                            dataType: columnType,
                            useInInvoice:
                                useInInvoice[`${sheetName}_${columnIndex}`] || false,
                        };
                    }),
                },
            ];
            return acc;
        }, {});
        const categoryId = getCookie("categoryId");

        const response = await preprocessCsv(
            fileKey,
            categoryId,
            finalSheets,
            headers,
            "createNewCategoryFromSheet"
        );

        if (response === "success") {
        } else {
            setShowWarningPopup(true);
            setErrorMessage(response.message);
        }

    };

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
                {loading ? (
                    <div className={globalStyles.loadingWave}>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                        <div className={globalStyles.loadingBar}></div>
                    </div>
                ) : (
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
                                                defaultValue={sheetName}
                                                onChange={(value) =>
                                                    updateCategoryName(sheetName, value)
                                                }
                                                className={styles.input}
                                            />
                                            <img
                                                src={"/x.svg"}
                                                alt={"x"}
                                                className={styles.deleteSheet}
                                                onClick={() => handleDeleteSheet(sheetName)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan="4">
                                        {columns.map((column, columnIndex) => (
                                            <div key={columnIndex} className={styles.columnBox}>
                                                {columnIndex === 0 && <h6>Defined columns</h6>}
                                                <div className={styles.columns}>
                                                    <div className={styles.colLabel}>
                                                        {columnIndex === 0 && <span>Column Name</span>}
                                                        <CustomInput
                                                            defaultValue={column.column}
                                                            type={"text"}
                                                            onChange={(value) => {
                                                                handleColumnNameChange(
                                                                    sheetName,
                                                                    columnIndex,
                                                                    value
                                                                );
                                                            }}
                                                            className={styles.input}
                                                        />
                                                    </div>
                                                    <div className={styles.colLabel}>
                                                        {columnIndex === 0 && (
                                                            <span className={styles.selectLabel}>Type</span>
                                                        )}
                                                        <div className={styles.select}>
                                                            <SelectWithLabel
                                                                options={dataTypes}
                                                                value={dataTypes.find(
                                                                    (option) =>
                                                                        option.value ===
                                                                        selectedColumnTypes[
                                                                            `${sheetName}_${columnIndex}`
                                                                            ]
                                                                )}
                                                                onChange={(selectedOption) =>
                                                                    handleColumnTypeChange(
                                                                        sheetName,
                                                                        columnIndex,
                                                                        selectedOption
                                                                    )
                                                                }
                                                                isError={invalidColumns.includes(
                                                                    `${sheetName}_${columnIndex}`
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={styles.labelBox}>
                                                        {columnIndex === 0 && (
                                                            <span className={styles.label}>
                                  Use In Invoice
                                </span>
                                                        )}
                                                        <CheckboxWithLabel
                                                            checked={
                                                                useInInvoice[`${sheetName}_${columnIndex}`] ||
                                                                false
                                                            }
                                                            onChange={handleCheckboxChange(
                                                                sheetName,
                                                                columnIndex
                                                            )}
                                                        />
                                                    </div>
                                                    <img
                                                        src={"/x.svg"}
                                                        alt={"x"}
                                                        className={styles.x}
                                                        onClick={() =>
                                                            handleDeleteColumn(sheetName, columnIndex)
                                                        }
                                                    />
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
                                actionMessage={
                                    "* Please select correct value or remove the column"
                                }
                                handleClose={() => setShowWarningPopup(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default withLayout(CreateNewCategoryFromSheet);
