import styles from './OptionsPopup.module.css';

const OptionsPopup = ({ show, options, onClose}) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.popup} >
            <div className={styles.popupContent}>
                <button onClick={onClose} className={styles.closeButton}>x</button>
                {options.map((option, index) => (
                    <button key={index} onClick={option.onClick} className={styles.optionButton}>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionsPopup;