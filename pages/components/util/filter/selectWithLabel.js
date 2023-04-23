import React from 'react';
import Select from 'react-select'
import styles from "./filter.module.css";


const SelectWithLabel = ({
                             options,
                             label,
                             value,
                             onChange,
                             placeholder,
                             isMulti,
                            customStyles
                         }) => {

    const selectStyle = {
        control: base => ({
            ...base,
            boxShadow: "none",
            padding: '0',
            width: '10em',
            margin: ' 1em 0',
            border: '.1em solid #ccc',
            borderRadius: '.4em',
            '&:hover': {
                border: '1px solid #ccc',
                borderRadius: '.4em',
                backgroundColor: '#ccc'
            },
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            paddingRight: "1.5em",
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            display: "none"
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            position: "absolute",
            right: "0",
            top: "0",
            color: '#949bab',

            marginLeft: '-.5em',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#f5f5f5" : "white",
            color: "#333",
            cursor: "pointer",
            fontSize: ".8em",
            padding: "0.5em 1em"
        })
    };

    return (
        <label className={styles.checkboxContentLabel}>
            <span className={customStyles}>{label}</span>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                styles={selectStyle}
                placeholder={placeholder}
                isMulti={isMulti}
            />
        </label>
    );

}
export default SelectWithLabel