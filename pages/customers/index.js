import withLayout from "../components/layout/withLayout";
import styles from "../invoiceList/invoices.module.css";
import Search from "../components/util/search/search";
import SortSelect from "../components/util/sort/sortSelect";
import sortOptions from "../components/data/sortOptions.json";
import Filter from "../components/util/filter/filter";
import Button from "../components/util/button/button";
import globalStyle from "../global.module.css";
import InvoiceList from "../invoiceList/invoiceList";
import React, {useEffect, useState} from "react";
import useFilter from "../components/util/filter/useFilter";
import {getCookie} from "cookies-next";
import {getCustomers} from "../api/customersApi";
import sortDocuments from "../components/util/sort/sortDocuments";



const Customers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortSelect, setSortSelect] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true); // initialize loading state

    const { applyFilter, updateFilterSettings } = useFilter();

    useEffect(() => {
        async function fetchData() {

            const data = await getCustomers();
            setLoading(false);
            setCustomers(data);
            console.log(data)
        }

        fetchData()

    }, [applyFilter]);

    const handleSearch = (searchTerm) => {
        console.log(`Searching for: ${searchTerm}`);
    };

    const handleSortSelectChange = (option) => {
        // on change sort the customers list
        setSortSelect(option);
        // setCustomers(sortDocuments(customers, option.value));
    };

    const handleAddCustomer = async () => {

    };

    return (
        <>
            <div className={styles.headers}>
                <h1>Customers</h1>
                <div className={styles.actions}>
                    <Search placeholder="Search" onSearch={handleSearch} />
                    <SortSelect
                        options={sortOptions}
                        value={sortSelect}
                        onChange={handleSortSelectChange}
                    />
                    <div className={styles.createInvoiceButton}>
                        <Button label={"Add New Customer"} onClick={handleAddCustomer} />
                    </div>
                </div>
            </div>
            {loading ? (
                <div className={globalStyle.loadingWave}>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                </div>
            ) : (
                <div></div>
                // <InvoiceList invoiceList={customers} />
            )}
        </>
    )

}

export default withLayout(Customers);