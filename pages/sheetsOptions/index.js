import React, { useState } from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./sheetsOptions.module.css";
import { Radio } from "@nextui-org/react";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import { getCookie } from 'cookies-next';
import Button from "../components/util/button/button";
import CustomInput from "../components/util/input/customInput";
import { useRouter } from "next/router";



const SheetsOptions = () => {

    const router = useRouter();
    const [sheetsData, setSheetsData] = useState(JSON.parse(router.query.data) || '{}');
    const [originalSheetsData, setOriginalSheetsData] = useState(JSON.parse(router.query.data) || '{}'); // Save the original state of sheetsData
    const [deletedColumnIndex, setDeletedColumnIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState("selectedSheet");
    const [selectedSheet, setSelectedSheet] = useState('');
    const [selectedColumns, setSelectedColumns] = useState([]);

    const formattedOptions = Object.keys(sheetsData).map((key) => {
        return {
            label: key,
            value: key
        }
    });

    const handleSelectChange = (value) => {
        setSelectedSheet(value.value);
        const uniqueColumnNames = Array.from(new Set(sheetsData[value.value].flatMap(Object.keys)));
        setSelectedColumns(uniqueColumnNames);
    };

    const handleDeleteColumn = (column) => {
        const columnIndex = selectedColumns.findIndex((col) => col === column);
        setDeletedColumnIndex(columnIndex);

        setTimeout(() => {
            setSelectedColumns(prevColumns => {
                const updatedColumns = prevColumns.filter(col => col !== column);
                return updatedColumns;
            });

            // Update sheetsData to remove the selected column from each row
            const updatedSheetsData = { ...sheetsData };
            updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(row => {
                const newRow = { ...row };
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
        const updatedSheetsData = { ...sheetsData };
        updatedSheetsData[selectedSheet] = updatedSheetsData[selectedSheet].map(row => {
            const newRow = { ...row };
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

    console.log(selectedColumns);
    console.log("Sheet", selectedSheet);
    console.log("All", sheetsData);


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
                    <h4>Your file contain more than one sheet</h4>
                    <div className={styles.content}>
                        <Radio.Group label={"Type"} defaultValue={"selectedSheet"} className={styles.blackRadio}>
                            <Radio value={"selectedSheet"}
                                size={"sm"}
                                onClick={() => { setSelectedOption("selectedSheet") }}>
                                Preprocess only selected sheet
                            </Radio>
                            <Radio value={"newCategoryFromEach"}
                                size={"sm"}
                                onClick={() => { setSelectedOption("newCategoryFromEach") }}>
                                Create new category for each sheet
                            </Radio>
                            <Radio
                                value={"mergeAllToOne"}
                                size={"sm"}
                                onClick={() => { setSelectedOption("mergeAllToOne") }}>
                                Merge all sheets to one
                            </Radio>
                        </Radio.Group>
                        <hr />

                        {selectedOption === "selectedSheet" && (
                            <>
                                <div className={styles.selectSheet}>
                                    <span>Sheet</span>
                                    <SelectWithLabel
                                        options={formattedOptions} onChange={handleSelectChange}
                                    />
                                </div>
                                {selectedColumns.map((column, index) => (
                                    <div key={index} className={`${styles.columnWrapper} ${deletedColumnIndex === index ? styles.hide : ''}`}>
                                        {index === 0 && <h5>Columns</h5>}
                                        <img src={"/bin.svg"}
                                            alt={"bin"}
                                            className={styles.bin}
                                            onClick={() => handleDeleteColumn(column)}></img>
                                        <CustomInput
                                            defaultValue={column}
                                            type={"text"}
                                            onChange={(value) => { handleColumnNameChange(index, value) }}
                                            className={styles.input}
                                        />

                                    </div>
                                ))}

                            </>
                        )}
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    {originalSheetsData !== sheetsData && (
                        <Button onClick={handleCancelChanges} label={"Cancel Changes"} />
                    )}
                    <Button onClick={() => { }} label={"Cancel"} />
                    <Button onClick={handleSubmit} label={"Submit"} />

                </div>
            </div>
        </Card>
    );

}

export default withLayout(SheetsOptions);