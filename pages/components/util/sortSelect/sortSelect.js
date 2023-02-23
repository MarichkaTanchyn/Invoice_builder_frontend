import Select from 'react-select'
import React from "react";

const SortSelect = ({
                        options,
                        value,
                        onChange,
                    }) => {
    const selectStyle = {
        control: base => ({
            ...base,
            boxShadow: "none",
            padding: '0 .5em',
            paddingLeft: '1.3em',
            margin: ' 0 1em',
            maxWidth: '10em',
            fontSize: '1em',
            border: '0px solid transparent',
            borderRadius: '.4em',
            background: `url(/sort.svg) no-repeat left center`,
            backgroundSize: '1.5em',
            '&:hover': {
                border: '0px solid #ccc',
                borderRadius: '.4em',
                backgroundColor: '#ccc'
            },
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        dropdownIndicator: base => ({
            ...base,
            display: "none"
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
        <div>
            <Select options={options} styles={selectStyle} value={value} onChange={onChange} placeholder="Sort"/>
        </div>
    )
}
export default SortSelect;