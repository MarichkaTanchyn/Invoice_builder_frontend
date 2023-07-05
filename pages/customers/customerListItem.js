import styles from "../invoiceList/invoices.module.css";
import React, {useState} from "react";


const CustomerListItem = ({key, id, representative, company, location, contactNumber, email}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDetailsClick = () => {
        setShowPopup(true);
    };

    return (
        <>
            <tr className={styles.rowBox}>
                <td style={{padding: '1em'}} className={styles.tableColumns}>
                    {id}
                </td>
                <td className={styles.tableColumns}>{company}</td>
                <td className={styles.tableColumns}>{representative}</td>
                <td className={styles.tableColumns}>{location}</td>
                <td className={styles.tableColumns}>{contactNumber}</td>
                <td className={styles.tableColumns}>{email}</td>
            </tr>
        </>
    )
}
export default CustomerListItem;