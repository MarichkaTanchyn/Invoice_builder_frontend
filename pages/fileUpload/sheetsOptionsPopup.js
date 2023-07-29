import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";
import styles from "./fileUpload.module.css"
import React, {useState} from "react";
import SelectWithUnderline from "../../components/util/select/selectWithUnderline";

const SheetsOptionsPopup = ({
                                setHeadersRow,
                                defaultValue,
                                handleOptionsPopupSubmit,
                                handleCloseOptionsPopup,
                                listOfSheets,
                                setSelectedSheet,
                                setSelectedOption,
                                selectedOption,
                                handleSheetHeaderRowChange,
                                setSheetHeaders
                            }) => {

    const options = [
        {value: 'selectedSheet', label: 'Preprocess only selected sheet'},
        {value: 'newCategoryFromEach', label: 'Create new category for each sheet'},
    ];

    const sheetsOptions = listOfSheets && listOfSheets.map((key) => {
        return {
            label: key,
            value: key
        }
    });

    const [selectedSheets, setSelectedSheets] = useState(listOfSheets);

    const handleDeleteSheet = (sheet) => {
        setSelectedSheets(prevSheets => prevSheets.filter(s => s !== sheet));

        // Also remove the corresponding headers for the deleted sheet
        setSheetHeaders(prevHeaders => {
            const newHeaders = {...prevHeaders};
            delete newHeaders[sheet];
            return newHeaders;
        });
    };
    const handleSelectSheetChange = (value) => {
        setSelectedSheet(value.value);
    };
    const handleSelectChange = (value) => {
        setSelectedOption(value.value);
    };
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.popupBox}>
            <div className={styles.optionsPopup} onClick={handlePopupClick}>
                <h4>Your file contain more than one sheet</h4>
                <SelectWithUnderline
                    placeholder={'Select option'}
                    options={options} onChange={handleSelectChange}
                    label={"Select option"}
                />
                {selectedOption === 'selectedSheet' &&
                    <div className={styles.selectedSheetOptions}>
                        <SelectWithUnderline label={"Select sheet"}
                                             options={sheetsOptions} onChange={handleSelectSheetChange}/>
                        <CustomInput
                            type="text"
                            defaultValue={defaultValue}
                            onChange={(value) => setHeadersRow(parseInt(value))}
                            className={styles.input}
                            label={"Headers row"}
                        />
                    </div>
                }
                {selectedOption === 'newCategoryFromEach' &&
                    <div className={styles.selectedSheetOptions}>
                        {selectedSheets && selectedSheets.map((key, index) => {
                            return (
                                <div key={index}>
                                    <div className={styles.sheetName}>
                                        <span>{key}</span>
                                        <img src={"/x.svg"}
                                             alt={"x"}
                                             className={styles.x}
                                             onClick={() => handleDeleteSheet(key)}/>
                                    </div>
                                    <CustomInput
                                        type="text"
                                        defaultValue={defaultValue}
                                        onChange={(value) => handleSheetHeaderRowChange(key, parseInt(value))}
                                        className={styles.input}
                                        label={"Headers row"}
                                    />
                                </div>
                            )
                        })}
                    </div>
                }
                <div className={styles.popupButtons}>
                    <Button onClick={handleCloseOptionsPopup} label={"Cancel"}></Button>
                    <Button onClick={handleOptionsPopupSubmit} label={"Submit"}></Button>
                </div>
            </div>
        </div>
    )
}

export default SheetsOptionsPopup;