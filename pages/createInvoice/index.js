import withLayout from "../components/layout/withLayout";
import styles  from "./createInvoice.module.css";
import Button from "../components/util/button/button";
import CreateInvoiceForm from "./createInvoiceForm";

const CreateInvoice = () => {

    const handlePreviewInvoice = () => {
        console.log("Preview");
    }

    return (
        <>
        <div className={styles.headers}>
            <h1>Create Invoice</h1>
            <div className={styles.actions}>
                <Button label={"Preview"} onClick={handlePreviewInvoice} />
            </div>
        </div>
            <CreateInvoiceForm/>
        </>
    )
}

export default withLayout(CreateInvoice);