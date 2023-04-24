import React, { useState } from "react";
import styles from './customInput.module.css';


const CustomInput = ({ placeholder, onInput, type, label, className }) => {
    const [value, setValue] = useState('');

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            onInput(value);
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
        onInput(event.target.value); // Call the onInput function when the value changes
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
                        onKeyDown={handleKeyDown}
                    />
                </label>
            ) : (
                <input
                    type={type}
                    className={mergedClassNames}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}

                />
            )}
        </>
    );
};

export default CustomInput;