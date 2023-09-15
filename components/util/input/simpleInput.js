import React, {useState, useEffect} from "react";
import styles from './customInput.module.css';
const SimpleInput = ({
                         placeholder,
                         onChange,
                         defaultValue,
                         type = "text",
                         className,
                         readOnly = false,
                     }) => {
    const [value, setValue] = useState(defaultValue || "");

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
        <input
            type={type}
            className={mergedClassNames}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            readOnly={readOnly}
        />
    );
};

export default SimpleInput;
