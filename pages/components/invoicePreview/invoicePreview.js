import styles from './invoicePreview.module.css';
import {generateHTML} from "./generateHtml";


const InvoicePreview = ({handleClosePreview, children}) => {


    return (
        <div className={styles.popupBox}>
            <div className={styles.previewContainer}>
                <img src={"/x.svg"} className={styles.img} alt={"x"} onClick={handleClosePreview} />
                {children}
            </div>
        </div>)

}

export default InvoicePreview;