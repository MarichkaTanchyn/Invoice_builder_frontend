import styles from "./productTable.module.css";
import Button from "../../components/util/button/button";
import React, {useCallback, useEffect, useState} from "react";
import SelectWithLabel from "../../components/util/filter/selectWithLabel";
import dataTypes from "../../components/data/dataTypes.json";
import SimpleInput from "../../components/util/input/simpleInput";

const AddProductPopup = ({
                          data, allHeaders, handleClosePopup, handleSubmitPopup, extraRows, setExtraRows, setTempProduct, tempProduct
                         }) => {
    const [selectedColumnTypes, setSelectedColumnTypes] = useState([]);
    const [invalidColumns, setInvalidColumns] = useState([]);
    const [useInInvoice, setUseInInvoice] = useState([]);
    const [error, setError] = useState("");
    const [pendingRows, setPendingRows] = useState(null);
    const validate = (productArray) => {
        if (productArray.length === 0) {
            setError("Value can not be empty.");
            return false;
        }
        const requiredTypes = ["name", "price", "description"];
        const existingTypes = productArray.map(product => product.type);

        for (const requiredType of requiredTypes) {
            if (!existingTypes.includes(requiredType)) {
                setError("Product must have obligatory name, price, and description types.");
                return false;
            }
        }
        setError("");
        return true;
    };


    useEffect(() => {
        if (allHeaders.length === 0 && extraRows.length === 0) {
            handleAddNewRow();
        }
    }, [allHeaders]);


    const validateProduct = (tempProduct) => {
        let isValid = true;
        let errors = [];

        // Check if required fields are empty or just white spaces
        if (!tempProduct.name || tempProduct.name.trim() === "") {
            isValid = false;
            errors.push(`${tempProduct.nameColumnName} is required`);
        }

        if (!tempProduct.description || tempProduct.description.trim() === "") {
            isValid = false;
            errors.push(`${tempProduct.descriptionColumnName} is required`);
        }

        if (!tempProduct.price || tempProduct.price.trim() === "") {
            isValid = false;
            errors.push(`${tempProduct.priceColumnName} is required`);
        } else if (isNaN(Number(tempProduct.price))) {
            isValid = false;
            errors.push(`${tempProduct.priceColumnName} must be a number`);
        }

        if (tempProduct.other && Array.isArray(tempProduct.other)) {
            tempProduct.other.forEach((item, index) => {
                for (let key in item) {
                    if (key !== "type" && key !== "useInInvoice") {
                        if (item.type === "number" || item.type === "price") {
                            if (isNaN(Number(item[key]))) {
                                isValid = false;
                                errors[`other_${index}_${key}`] = `${key} must be a number`;
                            }
                        }
                    }
                }
            });
        }

        return { isValid, errors };
    };


    // handling column type change
    const handleColumnTypeChange = useCallback((index, selectedOption) => {
        setSelectedColumnTypes((prevTypes) => {
            const newTypes = [...prevTypes];
            newTypes[index] = selectedOption.value;
            return newTypes;
        });

        setExtraRows(prevRows => {
            const newRow = {...prevRows[index], type: selectedOption.value};
            return [...prevRows.slice(0, index), newRow, ...prevRows.slice(index + 1)];
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

            setExtraRows(prevRows => {
                const newRow = {...prevRows[index], useInInvoice: !prevRows[index].useInInvoice};
                return [...prevRows.slice(0, index), newRow, ...prevRows.slice(index + 1)];
            });
        };
    }, []);

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleAddNewRow = () => {
        setExtraRows([...extraRows, {name: '', value: ''}]);
    };

    const handleInputChange = (field, index, value) => {
        setExtraRows(prevRows => {
            const newRow = {
                ...prevRows[index],
                [field]: value,
                useInInvoice: useInInvoice[index] || false
            };
            return [...prevRows.slice(0, index), newRow, ...prevRows.slice(index + 1)];
        });
    };

    const handleColumnValueChange = (header, value) => {
        setTempProduct(prevProduct => {
            const updatedProduct = { ...prevProduct };

            const columnNameField = Object.keys(updatedProduct).find(
                key => updatedProduct[key] === header && key.includes("ColumnName")
            );

            if (columnNameField) {
                const cleanField = columnNameField.replace("ColumnName", "");
                updatedProduct[cleanField] = value;
            } else {
                const otherObjIndex = updatedProduct['other'].findIndex(obj => obj.hasOwnProperty(header));

                if (otherObjIndex !== -1) {
                    updatedProduct['other'][otherObjIndex][header] = value;
                }
            }

            return updatedProduct;
        });
    };

    const handleSubmit = () => {
        const filteredRows = extraRows.filter(row => row.name && row.value);
        if (filteredRows) {
            if (filteredRows.length !== 0) {

                if (validate(filteredRows)) {
                    handleSubmitPopup();
                    setPendingRows(null);
                }
            } else if (tempProduct) {
                let valid = validateProduct(tempProduct)
                if (valid.isValid || valid.errors.length === 0) {
                    setError("")
                    handleSubmitPopup();
                } else {
                    setError(valid.errors[0])
                }
            }
        }
    };

    return (<div className={styles.popupBox}>
        <div className={styles.popupContent} onClick={handlePopupClick}>
            <h4>Add New Product</h4>

            <div className={styles.inputs}>
                {allHeaders && allHeaders.map((header, index) => {
                    return (<div key={header} className={styles.popupInput}>
                        <div className={styles.inputBox}>
                            <span className={styles.inputLabel}>Column Name</span>
                            <SimpleInput defaultValue={header} className={styles.input} readOnly={true}/>
                        </div>
                        <div className={styles.inputBox}>
                            <span className={styles.inputLabel}>Column Value</span>
                            <SimpleInput
                                className={styles.input}
                                onChange={(value) => handleColumnValueChange(header, value)}
                            />
                        </div>
                    </div>)
                })}

                {extraRows && extraRows.map((row, index) => (<div key={`extra-${index}`} className={styles.popupInput}>
                    <div className={styles.inputBox}>
                        <span className={styles.inputLabel}>Column Name</span>
                        <SimpleInput
                            value={row.name}
                            className={styles.input}
                            onChange={(value) => handleInputChange('name', index, value)}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <span className={styles.inputLabel}>Column Value</span>
                        <SimpleInput
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
                            onChange={(selectedOption) => handleColumnTypeChange(index, selectedOption)}
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
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.popupButtons}>
                {data && data.length === 0 &&
                    <div>
                        <Button onClick={handleAddNewRow} label={"Add Column"}></Button>
                    </div>
                }
                <div>
                    <Button onClick={handleClosePopup} className={styles.cancelButton} label={"Cancel"}></Button>
                    <Button onClick={handleSubmit} label={"Submit"}></Button>
                </div>
            </div>
        </div>
    </div>)
}

export default AddProductPopup;