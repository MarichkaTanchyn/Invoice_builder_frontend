import React, {useState, useEffect} from "react";
import styles from './customInput.module.css';

const CustomInput = ({placeholder, onChange, type, label, defaultValue, className, readOnly, isValid, validationMessage}) => {

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const validateNumberValue = (inputValue) => {
        const regex = /^[1-9][0-9]*(\.[0-9]+)?$/;

        if (/^0[0-9]+$/.test(inputValue)) {
            return inputValue.slice(1);
        }

        if (!regex.test(inputValue)) {
            return inputValue.slice(0, -1); // removes last digit
        } else {
            return inputValue;
        }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        // at least one uppercase, one lowercase, one number and one special character
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        return regex.test(password);
    };

    const handleChange = (event) => {
        let inputValue = event.target.value;
        let isValid;

        if (label === 'Email') {
            isValid = validateEmail(inputValue);
        } else if (label === 'Password') {
            isValid = validatePassword(inputValue);
        } else {
            isValid = inputValue.trim() !== '';
        }

        if (type === "number") {
            inputValue = validateNumberValue(inputValue);
            if (inputValue === "") {
                setValue("0");
                inputValue = "0";
            }
        }

        setValue(inputValue);
        if (onChange) {
            onChange(inputValue, isValid);
        }
    };


    const mergedClassNames = `${styles.input} ${className} ${
        isValid ? "" : styles.invalid
    }`;
    return (
        <>
            {label != null ? (
                <label className={styles.label}>
                    <span>{label}</span>
                    <input
                        type={type === 'number' ? 'text' : type}
                        className={mergedClassNames}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        readOnly={readOnly}
                    />
                    {!isValid && <span className={styles.validationMessage} dangerouslySetInnerHTML={{__html: validationMessage}}></span>}
                </label>
            ) : (
                <>
                <input
                    type={type === 'number'  ? 'text' : type}
                    className={mergedClassNames}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
                {!isValid && <span>{validationMessage}</span>}
                </>
            )}
        </>
    );
};

export default CustomInput;