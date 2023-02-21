import React, {useState} from "react";
import Search from "../util/search/search";
import styles from './invoices.module.css'
import Filter from "../util/filter/filter";
import Button from "../util/button/button"
import Select from 'react-select'

const FILTER_OPTIONS = [
    {value: "oldest", label: "Sort by the oldest"},
    {value: "newest", label: "Sort by the newest"},
    {value: "cheapest", label: "Price($-$$$)"},
    {value: "mostExpensive", label: "Price($$$-$)"},
    {value: "nameaz", label: "Name(A-Z)"},
    {value: "nameza", label: "Name(Z-A)"},
];

const Invoices = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = searchTerm => {
        console.log(`Searching for: ${searchTerm}`);
        // make a request to back server and search there
    };

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

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.pageContent}>
            <div className={styles.headers}>
                <h1>Invoices</h1>
                <div className={styles.actions}>
                    <Search placeholder="Search" onSearch={handleSearch}/>
                    <div>
                        <Select options={FILTER_OPTIONS} styles={selectStyle} placeholder="Sort"/>
                    </div>
                    <div onClick={togglePopup} className={styles.filter}>
                        <img className={styles.img} src="/filter.svg" alt="Filter"/>
                        <span>Filter</span>
                        {isOpen && <Filter/>}
                    </div>
                    <div className={styles.createInvoiceButton}>
                        {/*TODO: redirect to create Invoice page*/}
                        <Button label={"Create Invoice"}
                                onClick={() => console.log("You clicked on the Create Invoice button!")}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Invoices