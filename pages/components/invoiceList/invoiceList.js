import React from "react";
import styles from "./invoices.module.css"
import InvoiceListItem from "./invoiceListItem";
import { format } from 'date-fns';


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
            {invoiceList.map((invoice, index) => (
                <InvoiceListItem
                    key={invoice.id}
                    id={index + 1}
                    invoiceNumber={invoice.invoiceNumber}
                    type={invoice.typeOfDocument}
                    createdBy={invoice.Employee.Person.firstName + " " + invoice.Employee.Person.lastName}
                    clientName={invoice.clientName}
                    creationDate={format(new Date(invoice.creationDate), 'dd/MM/yyyy')}
                    totalAmount={invoice.totalAmount}
                    status={invoice.status}
                />
            ))}
            </tbody>
        </table>
    )
}
export default InvoiceList