import styles from "./customers.module.css";
import React from "react";
import CustomerListItem from "./customerListItem";


const CustomerList = ({customers}) => {

    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles.tableHeaders}>
                <th className={styles.tableColumns}>ID</th>
                <th className={styles.tableColumns}>Company</th>
                <th className={styles.tableColumns}>Representative</th>
                <th className={styles.tableColumns}>Location</th>
                <th className={styles.tableColumns}>Contact Number</th>
                <th className={styles.tableColumns}>Email</th>
            </tr>
            </thead>
            <tbody>
            {customers && customers.map((customer, index) => (
                <CustomerListItem key={customer.id} id={index + 1}
                                  company={customer.name}
                                  representative={customer.Person.firstName + " " + customer.Person.lastName}
                                  location={customer.city + "," + customer.country}
                                  contactNumber={customer.Person.phoneNumber}
                                  email={customer.Person.email}
                />
            ))}
            </tbody>
        </table>
    )
}

export default CustomerList;