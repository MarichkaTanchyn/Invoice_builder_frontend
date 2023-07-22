import React, {useRef, useState} from "react";
import styles from "./invoices.module.css"
import numeral from "numeral";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";
import OptionsPopup from "../components/util/optionsPopup/optionsPopup";
import InvoicePreview from "../components/invoicePreview/invoicePreview";
import { Document, Page } from 'react-pdf';

const InvoiceListItem = ({
                             id,
                             invoiceNumber,
                             type,
                             clientName,
                             creationDate,
                             totalAmount,
                             createdBy,
                             status,
                             invoiceData
                         }) => {

    // TODO: add popup details for each, with options depends from document status - draft

    const [showPopup, setShowPopup] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleDetailsClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const popupOptions = [
        {label: 'Edit', onClick: () => console.log('Edit clicked')},
        {label: 'Delete', onClick: () => console.log('Delete clicked')},
        {label: 'Send', onClick: () => console.log('Send clicked')},
    ];

    const handleShowPreview = () => {
        setShowPreview(true)
    }

    return (
        <>
            <tr className={styles.rowBox} onClick={handleShowPreview}>
                <td style={{padding: '0'}} className={styles.tableColumns}>
                    <CheckboxWithLabel label={id}/>
                </td>
                <td className={styles.tableColumns}>{invoiceNumber}</td>
                <td className={styles.tableColumns}>{type}</td>
                <td className={styles.tableColumns}>{clientName}</td>
                <td className={styles.tableColumns}>{creationDate}</td>
                <td className={styles.tableColumns}>{numeral(totalAmount).format("0,0.0")}</td>
                <td className={styles.tableColumns}>{createdBy}</td>
                <td className={styles.tableColumns}>{status}</td>
                <td className={styles.lastTableColumns}>
                    <img
                        className={styles.imgDetails}
                        src="/deta.svg"
                        alt="Details"
                        onClick={handleDetailsClick}
                    />
                    <OptionsPopup show={showPopup} options={popupOptions} onClose={handleClosePopup}/>
                </td>
            </tr>
            {showPreview && <InvoicePreview handleClosePreview={() => setShowPreview(false)}>
                <Document
                    file={invoiceData.invoiceFileLink}
                    onLoadSuccess={(pdf) => console.log('Loaded document', pdf)}
                    onLoadError={(error) => console.error('Could not load document', error)}
                >
                    <Page pageNumber={1} />
                </Document>
            </InvoicePreview>}
        </>
    )
}
export default InvoiceListItem