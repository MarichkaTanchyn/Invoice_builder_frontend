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
            border: 0,
            boxShadow: "none",
            height: 10,
            padding: 3,
            margin: 0,
            width: '12em',
            marginTop: 0.3,
            marginLeft: 0,
            fontSize: 20,
        })
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    // H1, search, filter, sort, button component, cards with invoices
    // filter ->  dropdown select, response from server
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
                        <Button label={"Create Invoice"} onClick={() => console.log("You clicked on the Create Invoice button!")}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Invoices