import styles from "../invoiceList/invoices.module.css";
import React, {useState} from "react";
import {useRouter} from "next/router";


const CustomerListItem = ({id, index, representative, company, location, contactNumber, email}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDetailsClick = () => {
        setShowPopup(true);
    };

    const router = useRouter();

    const handleRowClick = async () => {
        await router.push(`/customer?companyName=${company}&id=${id}`);
    };

    return (
        <>
            <tr className={styles.rowBox} onClick={handleRowClick}>
                <td style={{padding: '1em'}} className={styles.tableColumns}>
                    {index}
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