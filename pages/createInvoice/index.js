import withLayout from "../components/layout/withLayout";
import styles from "./createInvoice.module.css";
import Button from "../components/util/button/button";
import CreateInvoiceForm from "./createInvoiceForm";
import Card from "../components/util/card/card";

const CreateInvoice = () => {

    const handlePreviewInvoice = () => {
        console.log("Preview");
    }

    return (
        <Card>
            <div>
                <div className={styles.headers}>
                    <h1>Create Invoice</h1>
                    <div className={styles.actions}>
                        <Button label={"Preview"} onClick={handlePreviewInvoice} />
                    </div>
                </div>
                <hr />
            </div>
            <CreateInvoiceForm />
        </Card>
    );
}

export default withLayout(CreateInvoice);