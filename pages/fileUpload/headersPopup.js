import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";
import styles from "./fileUpload.module.css"

const HeadersPopup = ({setHeadersRow, handlePopupSubmit, handleClose, defaultValue}) => {

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.popupBox} onClick={handleClose}>
            <div className={styles.headersPopup} onClick={handlePopupClick}>
                <h4>Enter Row Number for Headers</h4>
                <CustomInput
                    type="number"
                    defaultValue={defaultValue}
                    onChange={(value) => setHeadersRow(parseInt(value))}
                    className={styles.input}
                />
                <div className={styles.popupButtons}>
                    <Button onClick={handleClose} label={"Cancel"}></Button>
                    <Button onClick={handlePopupSubmit} label={"Submit"}></Button>
                </div>
            </div>
        </div>
    )

};

export default HeadersPopup;