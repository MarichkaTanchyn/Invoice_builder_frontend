import React, { useState } from "react";
import styles from './customInput.module.css';

const CustomInput = ({placeholder, onInput, type,label}) => {
    const [value, setValue] = useState('');

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            onInput(value);
        }
    };
    return (
        <>
            {label != null ? (
                <label className={styles.label}>
                    <span>{label}</span>
                    <input
                        type={type}
                        className={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </label>
            ) : (
                <input
                    type={type}
                    className={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            )}
        </>

    )
}

export default CustomInput;