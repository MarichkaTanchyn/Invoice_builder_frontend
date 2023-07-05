import withLayout from "../components/layout/withLayout";
import styles from "./customers.module.css";
import Search from "../components/util/search/search";
import SortSelect from "../components/util/sort/sortSelect";
import sortOptions from "../components/data/sortOptions.json";
import Button from "../components/util/button/button";
import globalStyle from "../global.module.css";
import React, {useEffect, useState} from "react";
import {getCustomers} from "../api/customersApi";
import CustomerList from "./customerList";
import {utils} from "xlsx";

const Customers = () => {
    const [sortSelect, setSortSelect] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {

            const data = await getCustomers();
            setCustomers(data.employees);
            console.log(data.employees)
        }

        fetchData()
        setLoading(false);

    }, []);

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

    const exportToCsv = () => {
        // Map through the customers array and create a new object for each customer
        // Exclude the properties you don't want and flatten the Person object
        const formattedCustomers = customers.map(({ PersonId, CompanyId, Person, createdAt, updatedAt, ...customer }) => ({
            ...customer,
            representativeFirstName: Person.firstName,
            representativeLastName: Person.lastName,
            representativeMiddleName: Person.middleName,
            representativeEmail: Person.email,
            representativePhoneNumber: Person.phoneNumber,
        }));

        // Now create the worksheet with the new array
        const ws = utils.json_to_sheet(formattedCustomers);

        const csv = utils.sheet_to_csv(ws);
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'customers.csv';
        link.click();
    }

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
                    <div className={styles.buttons}>
                        <Button label={"Add New Customer"} onClick={handleAddCustomer} />
                        <Button label={"Export to csv"} onClick={exportToCsv} />
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
                <CustomerList customers={customers} />
            )}
        </>
    )

}

export default withLayout(Customers);