import React from "react";
import {useEffect, useState} from "react";
import Search from "../util/search/search";
import styles from './invoices.module.css'
import Filter from "../util/filter/filter";
import Button from "../util/button/button"
import SortSelect from "../util/sortSelect/sortSelect";
import sortDocuments from '../util/sortSelect/sortDocuments';
import InvoiceList from "./invoiceList";
import {getAllDocuments} from "../../api/invoicesAPI";

const SORT_OPTIONS = [
    {value: "oldest", label: "Oldest first"},
    {value: "newest", label: "Newest first"},
    {value: "lowprice", label: "Price: Low to high"},
    {value: "highprice", label: "Price: High to low"},
    {value: "az", label: "Name: A to Z"},
    {value: "za", label: "Name: Z to A"},
];

const InvoicesPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortSelect, setSortSelect] = useState(null)
    const [documents, setDocuments] = useState([]);
    const params = {
        CompanyId: 4,
        EmployeeId: 4,
    }

    useEffect(() => {
        async function fetchData() {
            return await getAllDocuments(params);
        }

        fetchData().then(res => {
            setDocuments(Object.values(res.props.documents.documents));
        });
    }, []);

    const handleSearch = searchTerm => {
        console.log(`Searching for: ${searchTerm}`);
        // make a request to back server and search there
    };

    const handleSortSelectChange = (option) =>{
        // on change sort the documents list
        setSortSelect(option)
        setDocuments(sortDocuments(documents, option.value))
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
            <div className={styles.pageContent}>
                <div className={styles.headers}>
                    <h1>Invoices</h1>
                    <div className={styles.actions}>
                        <Search placeholder="Search" onSearch={handleSearch}/>
                        <SortSelect options={SORT_OPTIONS} value={sortSelect} onChange={handleSortSelectChange}/>
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
                <InvoiceList invoiceList={documents} />
            </div>
    )

}

export default InvoicesPage