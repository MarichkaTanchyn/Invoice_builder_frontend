import styles from "./warningPopup.module.css";
import Button from "../button/button";

const WarningPopup = ({type, message, handleClose, actionMessage}) => {
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.popupBox}>
            <div className={styles.box} onClick={handlePopupClick}>
                <div className={styles.content}>
                    <h1>{type}</h1>
                    <span dangerouslySetInnerHTML={{__html: message}}/>
                    <p>{actionMessage}</p>
                </div>
                <div className={styles.button}>
                    <Button onClick={handleClose} label={"Ok"}></Button>
                </div>
            </div>
        </div>
    );
};
export default WarningPopup;
