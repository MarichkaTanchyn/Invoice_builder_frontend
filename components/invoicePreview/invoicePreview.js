import styles from './invoicePreview.module.css';

const InvoicePreview = ({handleClosePreview, children}) => {

    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.popupBox} onClick={handleClosePreview}>
            <div className={styles.previewContainer} onClick={handlePopupClick}>
                {children}
            </div>
        </div>
    )

}

export default InvoicePreview;