import Select from 'react-select'
import React from "react";
const SelectWithUnderline = ({
                                 options,
                                 value,
                                 onChange,
                                 placeholder
                             }) => {
    const selectStyle = {
        control: base => ({
            ...base,
            boxShadow: "none",
            padding: '0',
            width: '16em',
            marginTop: '1.2em',
            border: 'none',
            borderBottom: '.1em solid #ccc',
            '&:hover': {
                borderBottom: '1px solid #ccc',
            },
            "@media only screen and (min-width: 1600px)": {
                width: '20em',
            },
        }),
        placeholder: (provided, state) => ({
            ...provided,
            marginLeft: '0',
            paddingLeft: '0',
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
            padding: "0.5em 1em",
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '15em',
            "@media only screen and (min-width: 1600px)": {
                width: '20em',
            },
        }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: '8em',
            overflowY: 'scroll',
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
            '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and Opera
            },

        }),
    };

    return (
        <div>
            <Select options={options} styles={selectStyle} value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}
export default SelectWithUnderline;