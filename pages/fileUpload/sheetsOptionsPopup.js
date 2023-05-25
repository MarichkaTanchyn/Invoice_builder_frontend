import CustomInput from "../components/util/input/customInput";
import Button from "../components/util/button/button";
import styles from "./fileUpload.module.css"
import React, {useState} from "react";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";

const SheetsOptionsPopup = ({
                                setHeadersRow,
                                defaultValue,
                                handleOptionsPopupSubmit,
                                handleCloseOptionsPopup,
                                listOfSheets,
                                setSelectedSheet
}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        {value: 'selectedSheet', label: 'Preprocess only selected sheet'},
        {value: 'newCategoryFromEach', label: 'Create new category for each sheet'},
    ];

    const sheetsOptions = listOfSheets.map((key) => {
        return {
            label: key,
            value: key
        }
    });


    const handleSelectSheetChange = (value) => {
        setSelectedSheet(value.value);
    };
    const handleSelectChange = (value) => {
        setSelectedOption(value.value);
    };
    const handlePopupClick = (event) => {
        event.stopPropagation(); // Add this line to prevent the popup from closing
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
                <div className={styles.popupButtons}>
                    <Button onClick={handleCloseOptionsPopup} label={"Cancel"}></Button>
                    <Button onClick={handleOptionsPopupSubmit} label={"Submit"}></Button>
                </div>
            </div>
        </div>
    )
}

export default SheetsOptionsPopup;