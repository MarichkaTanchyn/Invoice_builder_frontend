import styles from "./productTable.module.css";
import Button from "../components/util/button/button";
import React from "react";
import CustomInput from "../components/util/input/customInput";


const AddProductPopup = ({data, setData, allHeaders, handleClosePopup, handleSubmitPopup,extraRows, setExtraRows}) => {


    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    const handleAddNewRow = () => {
        setExtraRows([...extraRows, {name: '', value: ''}]);
    }


    return (
        <div className={styles.popupBox}>
            <div className={styles.popupContent} onClick={handlePopupClick}>
                <h4>Add New Product</h4>

                {allHeaders.map((header, index) => {
                    return (
                        <div key={index} className={styles.popupInput}>
                            <CustomInput defaultValue={header} className={styles.input} readOnly={true}/>
                            <CustomInput className={styles.input} onChange={(value) => {
                                setData(prevData => {
                                    // directly modify the specific product within the array
                                    prevData[prevData.length - 1][header] = value;
                                    // return the modified array
                                    return [...prevData];
                                });
                            }}/>
                        </div>
                    )
                })}

                {extraRows.map((row, index) => (
                    <div key={`extra-${index}`} className={styles.popupInput}>
                        <CustomInput
                            value={row.name}
                            className={styles.input}
                            onChange={(value) => {
                                setExtraRows(prevRows => {
                                    // directly modify the specific row within the array
                                    prevRows[index].name = value;
                                    // return the modified array
                                    return [...prevRows];
                                });
                            }}
                        />
                        <CustomInput
                            value={row.value}
                            className={styles.input}
                            onChange={(value) => {
                                setExtraRows(prevRows => {
                                    // directly modify the specific row within the array
                                    prevRows[index].value = value;
                                    // return the modified array
                                    return [...prevRows];
                                });
                            }}
                        />
                    </div>
                ))}

                <div className={styles.popupButtons}>
                    <Button onClick={handleClosePopup} label={"Cancel"}></Button>
                    <Button onClick={handleSubmitPopup} label={"Submit"}></Button>
                    <Button onClick={handleAddNewRow} label={"Add"}></Button>
                </div>
            </div>
        </div>
    )
}

export default AddProductPopup;