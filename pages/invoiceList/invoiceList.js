import React from "react";
import styles from "./invoices.module.css"
import InvoiceListItem from "./invoiceListItem";
import { format } from 'date-fns';
import {getCookie} from "cookies-next";
const InvoiceList = ({invoiceList}) => {
    return (
        <table className={styles.table}>
            <thead>
            <tr className={styles.tableHeaders}>
                <th className={styles.tableColumns}>ID</th>
                <th className={styles.tableColumns}>Document Number</th>
                <th className={styles.tableColumns}>Type</th>
                <th className={styles.tableColumns}>Client Name</th>
                <th className={styles.tableColumns}>Creation Date</th>
                <th className={styles.tableColumns}>Total Amount</th>
                <th className={styles.tableColumns}>Created By</th>
                <th className={styles.tableColumns}>Status</th>
                <th className={styles.tableColumns}></th>

            </tr>
            </thead>
            <tbody>
            {invoiceList && invoiceList.map((invoice, index) => (
                <InvoiceListItem
                    key={invoice.id}
                    id={index + 1}
                    invoiceNumber={invoice.documentNumber}
                    type={invoice.documentType}
                    createdBy={parseInt(getCookie('employeeId')) === invoice.Employee.id ? 'You' : invoice.Employee.Person.firstName + " " + invoice.Employee.Person.lastName}
                    clientName={invoice.Customer.name}
                    creationDate={format(new Date(invoice.createdAt), 'dd/MM/yyyy')}
                    totalAmount={invoice.totalAmount}
                    status={invoice.status}
                    invoiceData={invoice}
                />
            ))}
            </tbody>
        </table>
    )
}
export default InvoiceList