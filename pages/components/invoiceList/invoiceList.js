import React from "react";
import styles from "./invoices.module.css"
import InvoiceListItem from "./invoiceListItem";
import invoiceListTest from "./invoiceList";

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
            </tr>
            </thead>
            <tbody>
            {invoiceList.map((invoice, index) => (
                <InvoiceListItem
                    key={invoice.id}
                    id={index+1}
                    documentNumber={invoice.documentNumber}
                    type={invoice.typeOfDocument}
                    createdBy={invoice.createdBy}
                    clientName={invoice.client}
                    creationDate={invoice.creationDate}
                    totalAmount={invoice.totalAmount}
                    status={invoice.status}
                />
            ))}
            </tbody>
        </table>
    )
}
export default InvoiceList