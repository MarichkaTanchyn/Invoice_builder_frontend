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


const CreateNewCategoryFromSheet = () => {
    const [sheets, setSheets] = useState({});
    const [selectedColumnTypes, setSelectedColumnTypes] = useState({});
    const [loading, setLoading] = useState(true);  // initialize loading state

    useEffect(() => {
        const fetchData = async () => {
            const sheetsHeadersJson = JSON.parse(getCookie('sheetsHeadersJson') || '{}');
            const fileKey = getCookie('fileKey');
            const dataArray = await readExcel(fileKey, sheetsHeadersJson);
            setSheets(Object.assign({}, ...dataArray));
            setLoading(false);
        }
        fetchData();
    }, []);

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
            [sheetName]: prevSheets[sheetName].map((column, i) => i === columnIndex ? {...column, column: value} : column)
        }));
    };

    const handleColumnTypeChange = (sheetName, columnIndex, value) => {
        setSelectedColumnTypes(prevColumnTypes => ({
            ...prevColumnTypes,
            [`${sheetName}_${columnIndex}`]: value,
        }));
    };

    const router = useRouter();
    const onClick = async () => {
        await router.push("/");
    }


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
                                        <CustomInput
                                            type="text"
                                            value={sheetName}
                                            onChange={(value) => updateCategoryName(sheetName, value)}
                                            placeholder="Category name"
                                            className={styles.input}
                                        />
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
                                                        {columnIndex === 0 && <span className={styles.selectLabel}>Type</span>}
                                                        <SelectWithLabel
                                                            options={dataTypes}
                                                            value={dataTypes.find(option => option.value === selectedColumnTypes[`${sheetName}_${columnIndex}`])}
                                                            onChange={(value) => handleColumnTypeChange(sheetName, columnIndex, value)}
                                                        />
                                                    </div>
                                                    <img src={"/x.svg"}
                                                         alt={"x"}
                                                         className={index !== 0 ? styles.x : styles.xFirst}
                                                         onClick={() => handleDeleteColumn(column)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        ))}</div>
                }

            </div>
        </Card>
    )
}

export default withLayout(CreateNewCategoryFromSheet);