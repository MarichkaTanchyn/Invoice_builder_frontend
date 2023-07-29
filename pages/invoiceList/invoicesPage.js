import React, {useEffect, useState} from "react";
import Search from "../../components/util/search/search";
import styles from "./invoices.module.css";
import Filter from "../../components/util/filter/filter";
import Button from "../../components/util/button/button";
import SortSelect from "../../components/util/sort/sortSelect";
import {sortDocuments} from "../../components/util/sort/sortUtils";
import InvoiceList from "./invoiceList";
import {getAllDocuments} from "../api/invoicesAPI";
import useFilter from "../../components/util/filter/useFilter";
import {useRouter} from "next/router";
import withLayout from "../../components/layout/withLayout";
import globalStyle from "../global.module.css"
import {getCookie} from "cookies-next";
import sortOptions from "../../components/data/sortOptions";
import {objectIncludes} from "../../components/util/search/searchUtil";


const InvoicesPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortSelect, setSortSelect] = useState(null);
    const [originalDocuments, setOriginalDocuments] = useState([]);
    const [displayedDocuments, setDisplayedDocuments] = useState([]);
    const [loading, setLoading] = useState(true); // initialize loading state

    const {applyFilter, updateFilterSettings} = useFilter();

    useEffect(() => {
        async function fetchData() {
            const companyId = getCookie("companyId");
            const employeeId = getCookie("employeeId");

            const params = {
                CompanyId: companyId,
                EmployeeId: employeeId,
            };

            const data = await getAllDocuments(params)
            setOriginalDocuments(data.documents.invoices);
            setDisplayedDocuments(data.documents.invoices);
            setLoading(
                false);
            return data;
        }

        fetchData();
    }, [applyFilter]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (!searchTerm) {
            setDisplayedDocuments(originalDocuments);
            return;
        }

        const filteredDocuments = originalDocuments.filter(doc => objectIncludes(doc, searchTerm));

        setDisplayedDocuments(filteredDocuments);
    };

    const handleSortSelectChange = (option) => {
        setSortSelect(option);
        setDisplayedDocuments(sortDocuments(displayedDocuments, option.value));
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const router = useRouter();

    const handleCreateInvoice = async () => {
        await router.push("/createInvoice");
    };

    return (
        <>
            <div className={styles.headers}>
                <h1>Invoices</h1>
                <div className={styles.actions}>
                    <Search placeholder="Search" onSearch={handleSearch}/>
                    <SortSelect
                        options={sortOptions}
                        value={sortSelect}
                        onChange={handleSortSelectChange}
                    />
                    <div onClick={togglePopup} className={styles.filter}>
                        <img className={styles.img} src="/filter.svg" alt="Filter"/>
                        <span>Filter</span>
                        {isOpen && <Filter updateFilterSettings={updateFilterSettings}/>}
                    </div>
                    <div className={styles.createInvoiceButton}>
                        <Button label={"Create Invoice"} onClick={handleCreateInvoice}/>
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
                <div style={{marginTop: '2em', padding: '2em'}}>
                    <InvoiceList invoiceList={displayedDocuments}/>
                </div>
            )}
        </>
    );
};

export default withLayout(InvoicesPage);
