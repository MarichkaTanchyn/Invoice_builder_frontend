import React, {useState} from "react";
import Search from "../util/search/search";
import styles from './invoices.module.css'
import Filter from "../util/filter/filter";

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

                    {/*    button create invoice*/}
                </div>
            </div>
        </div>
    )

}

export default Invoices