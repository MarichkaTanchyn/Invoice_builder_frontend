import React from "react";
import styles from "./invoices.module.css"
import numeral from "numeral";
import CheckboxWithLabel from "../util/filter/checkboxWithLabel";

const InvoiceListItem = ({  id,
                             invoiceNumber,
                             type,
                             clientName,
                             creationDate,
                             totalAmount,
                             createdBy,
                             status
                         }) => {

    // TODO: add popup details for each, with options depends from document status - draft

    return (
        <tr className={styles.rowBox}>
            <td style={{padding: '0'}} className={styles.tableColumns}>
                <CheckboxWithLabel label={id} />
            </td>
            <td className={styles.tableColumns}>{invoiceNumber}</td>
            <td className={styles.tableColumns}>{type}</td>
            <td className={styles.tableColumns}>{clientName}</td>
            <td className={styles.tableColumns}>{creationDate}</td>
            <td className={styles.tableColumns}>{numeral(totalAmount).format("0,0.0")}</td>
            <td className={styles.tableColumns}>{createdBy}</td>
            <td className={styles.tableColumns}>{status}</td>
            <td><img className={styles.imgDetails} src="/deta.svg" alt="Details"/></td>
        </tr>
    )
}
export default InvoiceListItem