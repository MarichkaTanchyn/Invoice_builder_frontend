import Select from 'react-select'
import React from "react";

const SmallSelectWithUnderline = ({
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
            width: '5em',
            marginTop: '1.2em',
            border: 'none',
            borderBottom: '.1em solid #ccc',
            '&:hover': {
                borderBottom: '1px solid #ccc',
            },
            "@media only screen and (min-width: 1600px)": {
                width: '10em',
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
            fontSize: ".7em",
            padding: "0.5em 1em",
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '5em',
            maxHeight: '1em',
        }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: '8em',
            border: '1px solid rgba(165, 165, 165, 0.5)',
            borderRadius: '0.2em',
            overflowY: 'scroll',
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For Internet Explorer and Edge
            '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and Opera
            },
            "@media only screen and (min-width: 1600px)": {
                width: '10em',
            },
        }),

    };

    return (
        <div>
            <Select options={options} styles={selectStyle} value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}
export default SmallSelectWithUnderline;