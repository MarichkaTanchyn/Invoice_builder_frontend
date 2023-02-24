import React from "react";
import styles from "./invoices.module.css"
import InvoiceListItem from "./invoiceListItem";
import invoiceListTest from "./invoiceList";

const InvoiceList = ({invoiceList}) => {
    return (
        <>
            {invoiceList.map((invoice) => (
                <InvoiceListItem
                    key={invoice.id}
                    id={invoice.id}
                    documentNumber={invoice.documentNumber}
                    type={invoice.typeOfDocument}
                    createdBy={invoice.createdBy}
                    clientName={invoice.client}
                    creationDate={invoice.creationDate}
                    totalAmount={invoice.totalAmount}
                    status={invoice.status}
                />
                ))}
        </>
    )
}
export default InvoiceList