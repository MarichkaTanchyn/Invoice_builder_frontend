import React, {useEffect, useState} from "react";
import styles from "./invoices.module.css"
import numeral from "numeral";
import CheckboxWithLabel from "../../components/util/filter/checkboxWithLabel";
import OptionsPopup from "../../components/util/optionsPopup/optionsPopup";
import InvoicePreview from "../../components/invoicePreview/invoicePreview";
import {getInvoicePdf} from "../api/invoicesAPI";

const InvoiceListItem = ({
                             id,
                             index,
                             invoiceNumber,
                             type,
                             clientName,
                             creationDate,
                             totalAmount,
                             createdBy,
                             status,
                         }) => {

    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        async function fetchPdf() {
            const url = await getInvoicePdf(id);
            setPdfUrl(url);
        }

        fetchPdf();
    }, [id]);


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
                    <CheckboxWithLabel label={index}/>
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
                <iframe src={pdfUrl} style={{
                    width: '100%', height: '90vh', border: 'none',
                    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
                    borderRadius: '5px'
                }}/>
            </InvoicePreview>}
        </>
    )
}
export default InvoiceListItem