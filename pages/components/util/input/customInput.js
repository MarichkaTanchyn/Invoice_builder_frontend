import React, {useState, useEffect} from "react";
import styles from './customInput.module.css';


const CustomInput = ({placeholder, onChange, type, label, defaultValue, className}) => {
    const [value, setValue] = useState(defaultValue || '');


    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        if (onChange) {
            onChange(inputValue);
        }
    };

    const mergedClassNames = `${styles.input} ${className}`;

    return (
        <>
            {label != null ? (
                <label className={styles.label}>
                    <span>{label}</span>
                    <input
                        type={type}
                        className={mergedClassNames}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                    />
                </label>
            ) : (
                <input
                    type={type}
                    className={mergedClassNames}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            )}
        </>
    );
};

export default CustomInput;