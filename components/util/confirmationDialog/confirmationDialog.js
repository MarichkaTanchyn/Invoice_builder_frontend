import styles from "./confirmationDialog.module.css";
import Button from "../button/button";


const ConfirmationDialog = ({type, header, message, onAgree, onCancel}) => {

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.popupBox}>
            <div className={styles.box} onClick={handlePopupClick}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        {type === "Delete" &&
                            <div>
                                <img className={styles.img} src="/redBin.svg" alt="confirmation icon"/>
                            </div>
                        }
                        <div className={styles.title}>
                            <h4>{header}</h4>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
                <div className={styles.button}>
                    <Button onClick={onCancel} label={"Cancel"}></Button>
                    <Button onClick={onAgree} label={type}></Button>
                </div>
            </div>
        </div>
    );

}

export default ConfirmationDialog;