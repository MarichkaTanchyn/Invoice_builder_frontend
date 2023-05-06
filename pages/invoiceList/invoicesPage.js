import React from "react";
import {useEffect, useState} from "react";
import Search from "../components/util/search/search";
import styles from './invoices.module.css'
import Filter from "../components/util/filter/filter";
import Button from "../components/util/button/button"
import SortSelect from "../components/util/sort/sortSelect";
import sortDocuments from '../components/util/sort/sortDocuments';
import InvoiceList from "./invoiceList";
import {getAllDocuments} from "../api/invoicesAPI";
import useFilter from "../components/util/filter/useFilter";
import {useRouter} from "next/router";
import withLayout from "../components/layout/withLayout";


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
        CompanyId: 1,
        EmployeeId: 1,
    }

    const {applyFilter, updateFilterSettings} = useFilter();

    useEffect(() => {
        async function fetchData() {
            return await getAllDocuments(params);
        }

        fetchData().then((res) => {
            const allDocuments = Object.values(res.props.documents.documents);
            setDocuments(applyFilter(allDocuments));
        });
    }, [applyFilter]);

    const handleSearch = searchTerm => {
        console.log(`Searching for: ${searchTerm}`);
        // make a request to back server and search there
    };

    const handleSortSelectChange = (option) => {
        // on change sort the documents list
        setSortSelect(option)
        setDocuments(sortDocuments(documents, option.value))
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const router = useRouter();

    const handleCreateInvoice = async () => {
        // Replace '/create-invoice' with the path to your Create Invoice page
        await router.push('/createInvoice');
    };


    return (
        <>
            <div className={styles.headers}>
                <h1>Invoices</h1>
                <div className={styles.actions}>
                    <Search placeholder="Search" onSearch={handleSearch}/>
                    <SortSelect options={SORT_OPTIONS} value={sortSelect} onChange={handleSortSelectChange}/>
                    <div onClick={togglePopup} className={styles.filter}>
                        <img className={styles.img} src="/filter.svg" alt="Filter"/>
                        <span>Filter</span>
                        {isOpen && <Filter updateFilterSettings={updateFilterSettings}/>}
                    </div>
                    <div className={styles.createInvoiceButton}>
                        {/*TODO: redirect to create Invoice page*/}
                        <Button label={"Create Invoice"}
                                onClick={handleCreateInvoice}/>
                    </div>
                </div>
            </div>
            <InvoiceList invoiceList={documents}/>
        </>
    )

}

export default withLayout(InvoicesPage);