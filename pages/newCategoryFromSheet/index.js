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
    const [selectedColumnTypes, setSelectedColumnTypes] = useState({});
    const [loading, setLoading] = useState(true);  // initialize loading state
    const [originalSheets, setOriginalSheets] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const sheetsHeadersJson = JSON.parse(getCookie('sheetsHeadersJson') || '{}');
            const fileKey = getCookie('fileKey');
            const dataArray = await readExcel(fileKey, sheetsHeadersJson);
            const newSheets = Object.assign({}, ...dataArray);
            setSheets(newSheets);
            setOriginalSheets(newSheets);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleCancelChanges = () => {
        setSheets(originalSheets);
    };
    const handleDeleteColumn = (sheetName, columnIndex) => {
        setSheets(prevSheets => ({
            ...prevSheets,
            [sheetName]: prevSheets[sheetName].filter((_, i) => i !== columnIndex),
        }));
    };

    const handleDeleteSheet = (sheetName) => {
        setSheets(prevSheets => {
            const newSheets = {...prevSheets};
            delete newSheets[sheetName];
            return newSheets;
        });
    }

    const updateCategoryName = (sheetName, newSheetName) => {
        setSheets(prevSheets => {
            const newSheets = {...prevSheets};
            newSheets[newSheetName] = [...prevSheets[sheetName]];
            delete newSheets[sheetName];
            return newSheets;
        });
    };

    const handleColumnNameChange = (sheetName, columnIndex, value) => {
        setSheets(prevSheets => ({
            ...prevSheets,
            [sheetName]: prevSheets[sheetName].map((column, i) => i === columnIndex ? {
                ...column,
                column: value
            } : column)
        }));
    };

    const handleColumnTypeChange = (sheetName, columnIndex, value) => {
        setSelectedColumnTypes(prevColumnTypes => ({
            ...prevColumnTypes,
            [`${sheetName}_${columnIndex}`]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(sheets);
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
                                                value={sheetName}
                                                onChange={(value) => updateCategoryName(sheetName, value)}
                                                placeholder="Category name"
                                                className={styles.input}
                                            />
                                            <div className={styles.uniteButton}>
                                                <Button label={"Unite"} className={styles.button}/>
                                            </div>
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
                                                                handleColumnNameChange(index, value)
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
                                                                onChange={(value) => handleColumnTypeChange(sheetName, columnIndex, value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <img src={"/x.svg"}
                                                         alt={"x"}
                                                         className={index !== 0 ? styles.xFirst : styles.x}
                                                         onClick={() => handleDeleteColumn(column)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        ))}
                        <div className={styles.buttonContainer}>
                            {/*{JSON.stringify(originalColumnNames) !== JSON.stringify(selectedColumns) && (*/}
                            {/*    <Button onClick={handleCancelChanges} label={"Cancel Changes"}/>*/}
                            {/*)}*/}
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