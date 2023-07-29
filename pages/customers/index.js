import withLayout from "../../components/layout/withLayout";
import styles from "./customers.module.css";
import Search from "../../components/util/search/search";
import SortSelect from "../../components/util/sort/sortSelect";
import sortOptions from "../../components/data/sortCustomersOptions.json";
import Button from "../../components/util/button/button";
import globalStyle from "../global.module.css";
import React, {useEffect, useState} from "react";
import {addCustomer, getCustomers} from "../api/customersApi";
import CustomerList from "./customerList";
import {utils} from "xlsx";
import AddCustomerPopup from "../customer/addCustomerPopup";
import {objectIncludes} from "../../components/util/search/searchUtil";
import {sortCustomers} from "../../components/util/sort/sortUtils";

const Customers = () => {
    const [sortSelect, setSortSelect] = useState(null);
    const [originalCustomers, setOriginalCustomers] = useState([]);
    const [displayedCustomers, setDisplayedCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddCustomerPopup, setShowAddCustomerPopup] = React.useState(false);
    const [newCustomer, setNewCustomer] = React.useState({
            "name": '',
            "description": '',
            "companyNumber": '',
            "country": '',
            "city": '',
            "postalCode": '',
            "nip": '',
            "address": '',
            "Person": {
                "firstName": '',
                "lastName": '',
                "middleName": '',
                "email": '',
                "phoneNumber": '',
        }
    });


    useEffect(() => {
        async function fetchData() {
            const data = await getCustomers();
            setOriginalCustomers(data.customers);
            setDisplayedCustomers(data.customers);
        }

        fetchData()
        setLoading(false);

    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (!searchTerm) {
            setDisplayedCustomers(originalCustomers);
            return;
        }

        const filteredCustomers = originalCustomers.filter(customer => objectIncludes(customer, searchTerm));
        setDisplayedCustomers(filteredCustomers);
    };

    const handleSortSelectChange = (option) => {
        // on change sort the customers list
        setSortSelect(option);
        setDisplayedCustomers(sortCustomers(displayedCustomers, option.value));
    };

    const handleAddCustomer = async () => {
        setShowAddCustomerPopup(true);
    };

    const handleSubmitPopup = async () => {
        const res = await addCustomer(newCustomer);
        if (!res.data.message) {
            setDisplayedCustomers([...displayedCustomers, res.data]);
            setNewCustomer({
                "name": '',
                "description": '',
                "companyNumber": '',
                "country": '',
                "city": '',
                "postalCode": '',
                "nip": '',
                "address": '',
                "Person": {
                    "firstName": '',
                    "lastName": '',
                    "middleName": '',
                    "email": '',
                    "phoneNumber": '',
                }
            });
            setShowAddCustomerPopup(false);
        }

    };

    const handleClosePopup = () => {
        setShowAddCustomerPopup(false);
    };

    const exportToCsv = () => {
        // Map through the customers array and create a new object for each customer
        // Exclude the properties you don't want and flatten the Person object
        const formattedCustomers = customers.map(({
                                                      PersonId,
                                                      CompanyId,
                                                      Person,
                                                      createdAt,
                                                      updatedAt,
                                                      ...customer
                                                  }) => ({
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

    return (<>
            <div className={styles.headers}>
                <h1>Customers</h1>
                <div className={styles.actions}>
                    <Search placeholder="Search" onSearch={handleSearch}/>
                    <SortSelect
                        options={sortOptions}
                        value={sortSelect}
                        onChange={handleSortSelectChange}
                    />
                    <div className={styles.buttons}>
                        <Button label={"Add New Customer"} onClick={handleAddCustomer}/>
                        <Button label={"Export to csv"} onClick={exportToCsv}/>
                    </div>
                </div>
            </div>
            {loading ? (<div className={globalStyle.loadingWave}>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                    <div className={globalStyle.loadingBar}></div>
                </div>) : (
                    <CustomerList customers={displayedCustomers}/>
            )}
            {showAddCustomerPopup &&
                <AddCustomerPopup
                    newCustomer={newCustomer} setNewCustomer={setNewCustomer}
                    handleSubmitPopup={handleSubmitPopup} handleClosePopup={handleClosePopup}/>}
        </>)

}

export default withLayout(Customers);