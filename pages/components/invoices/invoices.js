import React, {useState} from "react";
import Search from "../util/search/search";
import styles from './invoices.module.css'
import Filter from "../util/filter/filter";

import Select from 'react-select'

const FILTER_OPTIONS = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
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
            height:10,
            padding: 3,
            margin: 0,
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

                    <div onClick={togglePopup} className={styles.filter}>
                        <img className={styles.img} src="/filter.svg" alt="Filter"/>
                        <span>Filter</span>
                        {isOpen && <Filter/>}
                    </div>

                    <div >
                        <Select options={FILTER_OPTIONS} styles={selectStyle} placeholder="Sort"/>
                    </div>
                    {/*    button create invoice*/}
                </div>
            </div>
        </div>
    )

}

export default Invoices