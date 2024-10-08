import styles from './optionsPopup.module.css';

const OptionsPopup = ({show, options, onClose}) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <button onClick={onClose} className={styles.closeButton}>x</button>
                {options.map((option) => (
                    <button key={option.label} onClick={option.onClick} className={styles.optionButton}>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionsPopup;