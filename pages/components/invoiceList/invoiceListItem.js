import React from "react";
import styles from "./invoices.module.css"
import Card from "../util/card/card";
import CheckboxWithLabel from "../util/filter/checkboxWithLabel";

const InvoiceListItem = ({  id,
                             documentNumber,
                             type,
                             clientName,
                             creationDate,
                             totalAmount,
                             createdBy,
                             status
                         }) => {

    // Reg checkbox, Number, Type, To, Date, TotalAmount
    return (
        <Card>
            <CheckboxWithLabel label={id} />
            <span>{documentNumber}</span>
            <span>{type}</span>
            <span>{clientName}</span>
            <span>{creationDate}</span>
            <span>{totalAmount}</span>
            <span>{createdBy}</span>
            <span>{status}</span>
        </Card>
    )
}
export default InvoiceListItem