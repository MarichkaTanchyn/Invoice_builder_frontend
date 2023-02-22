import styles from "./popup.module.css";

const Popup = ({children}) =>{

    const handlePopupClick = (event) => {
        event.stopPropagation(); // Add this line to prevent the popup from closing
    };


    return (
        <div className={styles.popupBox}>
            <div className={styles.box}  onClick={handlePopupClick}>
                {children}
            </div>
        </div>
    );
};
export default Popup;