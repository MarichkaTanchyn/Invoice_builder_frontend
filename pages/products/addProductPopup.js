import styles from "./productTable.module.css";
import Button from "../components/util/button/button";
import React, {useCallback, useState} from "react";
import CustomInput from "../components/util/input/customInput";
import {debounce} from "@mui/material";
import button from "../components/util/button/button";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import dataTypes from "../components/data/dataTypes.json";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";


const AddProductPopup = ({
                             allHeaders, handleClosePopup, handleSubmitPopup, extraRows, setExtraRows, setTempProduct
                         }) => {
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [invalidColumns, setInvalidColumns] = useState([]);
    const [useInInvoice, setUseInInvoice] = useState([]);

    // handling column type change
    const handleColumnTypeChange = useCallback((index, selectedOption) => {
        setSelectedColumnTypes((prevTypes) => {
            const newTypes = [...prevTypes];
            newTypes[index] = selectedOption.value;
            return newTypes;
        });
    }, []);

    // handling checkbox change
    const handleCheckboxChange = useCallback((index) => {
        return () => {
            setUseInInvoice((prevUseInInvoice) => {
                const newUseInInvoice = {...prevUseInInvoice};
                newUseInInvoice[index] = !newUseInInvoice[index];
                return newUseInInvoice;
            });
        };
    }, []);
    // Create a debounced version of setExtraRows
    const debouncedSetExtraRows = debounce(setExtraRows, 300);

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleAddNewRow = () => {
        setExtraRows([...extraRows, {name: '', value: ''}]);
    };

    const handleInputChange = (field, index, value) => {
        if (field === 'name' || field === 'value') {
            debouncedSetExtraRows(prevRows => {
                const newRow = {...prevRows[index], [field]: value};
                const tmp = [...prevRows.slice(0, index), newRow, ...prevRows.slice(index + 1)];
                console.log(tmp);
                return tmp;
                // return [...prevRows.slice(0, index), newRow, ...prevRows.slice(index + 1)];
            });
        } else {
            setTempProduct(prevProduct => ({...prevProduct, [field]: value}));
        }
    };

    const handleSubmit = () => {
        handleSubmitPopup();
    };

    return (<div className={styles.popupBox}>
            <div className={styles.popupContent} onClick={handlePopupClick}>
                <h4>Add New Product</h4>

                <div className={styles.inputs}>
                {allHeaders.map((header, index) => {
                    return (<div key={index} className={styles.popupInput}>
                        <div className={styles.inputBox}>
                            <span className={styles.inputLabel}>Column Name</span>
                            <CustomInput defaultValue={header} className={styles.input} readOnly={true}/>
                        </div>
                        <div className={styles.inputBox}>
                            <span className={styles.inputLabel}>Column Value</span>
                            <CustomInput className={styles.input} onChange={debounce((value) => {
                                setTempProduct(prevProduct => {
                                    // directly modify the specific product within the array
                                    prevProduct[header] = value;
                                    // return the modified array
                                    return {...prevProduct};
                                });
                            }, 500)}/>
                        </div>
                    </div>)
                })}

                {extraRows.map((row, index) => (<div key={`extra-${index}`} className={styles.popupInput}>
                    <div className={styles.inputBox}>
                        <span className={styles.inputLabel}>Column Name</span>
                            <CustomInput
                                value={row.name}
                                className={styles.input}
                                onChange={(value) => handleInputChange('name', index, value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <span className={styles.inputLabel}>Column Value</span>
                            <CustomInput
                            value={row.value}
                            className={styles.input}
                            onChange={(value) => handleInputChange('value', index, value)}
                            />
                        </div>
                    <div className={styles.selectBox}>
                        <span className={styles.inputLabel}>Column Type</span>
                            <SelectWithLabel
                                options={dataTypes}
                                value={dataTypes.find((option) => option.value === selectedColumnTypes[index])}
                                onChange={(selectedOption) => handleColumnTypeChange(index, selectedOption)} // Pass the selected option to the handler
                                isError={invalidColumns.includes(`${index}`)}
                            />
                        </div>
                    <div className={styles.inputBox}>
                        <span className={styles.inputLabel}>Use In Invoice</span>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                checked={useInInvoice[`${index}`] || false}
                                onChange={handleCheckboxChange(index)}
                            />
                    </div>
                    </div>))}
                </div>
                <div className={styles.popupButtons}>
                    <div>
                        <Button onClick={handleAddNewRow} label={"Add Column"}></Button>
                    </div>
                    <div>
                        <Button onClick={handleClosePopup} className={styles.cancelButton} label={"Cancel"}></Button>
                        <Button onClick={handleSubmit} label={"Submit"}></Button>
                    </div>
                </div>
            </div>
        </div>)
}

export default AddProductPopup;