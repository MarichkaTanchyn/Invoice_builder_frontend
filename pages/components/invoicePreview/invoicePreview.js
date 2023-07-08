import styles from './invoicePreview.module.css';
import {generateHTML} from "./generateHtml";


const InvoicePreview = ({invoiceData, handleClosePreview}) => {

    const htmlString = generateHTML(invoiceData, 'template1');

    return (
        <div className={styles.popupBox}>
            <div className={styles.previewContainer}>
                <img src={"/x.svg"} className={styles.img} alt={"x"} onClick={handleClosePreview} />
                <div className={styles.invoice} dangerouslySetInnerHTML={{ __html: htmlString }} />
            </div>
        </div>)

}

export default InvoicePreview;