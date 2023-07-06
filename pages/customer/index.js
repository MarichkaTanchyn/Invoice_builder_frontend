import withLayout from "../components/layout/withLayout";
import {useRouter} from "next/router";
import Card from "../components/util/card/card";
import styles from "./customer.module.css"
import Link from "next/link";
import React, {useEffect} from "react";
import {getCustomer, updateCustomer} from "../api/customersApi";
import {getCustomerInvoices} from "../api/invoicesAPI";
import InvoiceList from "../invoiceList/invoiceList";
import AddCustomerPopup from "./addCustomerPopup";

const Customer = () => {

    const [customer, setCustomer] = React.useState(null);
    const [customerInvoices, setCustomerInvoices] = React.useState(null);
    const [newCustomer, setNewCustomer] = React.useState(null);

    const [showEditCustomerPopup, setShowEditCustomerPopup] = React.useState(false);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const id = router.query.id;
            if (id) {
                const res = await getCustomer(id);
                setCustomer(res.data);
                const data = await getCustomerInvoices(id);
                setCustomerInvoices(data.data);
            }
        }
        if (router.isReady) { // This checks whether the router instance is ready
            fetchData();
        }
    }, [router.isReady, router.query.id]);

    const handleSubmitPopup = async () => {
        const res = await updateCustomer(customer.id,newCustomer);
        if (!res.data.message) {
            setCustomer(res.data);
            setShowEditCustomerPopup(false);
        }

    };

    const handleClosePopup = () => {
        setShowEditCustomerPopup(false);
    };

    const handleOpenPopup = () => {
        setNewCustomer(customer)
        setShowEditCustomerPopup(true);
    };

    return (<Card>
        <div>
            <Link className={styles.link} href={"/customers"} passHref>
                <div className={styles.back}>
                    <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                    <button className={styles.buttonWithImg}>Back</button>
                </div>
            </Link>
            <div className={styles.headers}>
                <div className={styles.avatar}>
                    <img className={styles.accountIcon}
                         src="/account.svg"
                         alt="account"/>
                </div>
                {customer && <>
                    <div className={styles.companyContacts}>
                        <div className={styles.companyNameEdit}>
                            <h4>{customer && customer.name}</h4>
                            <img className={styles.img} src="/edit.svg" alt={"edit"}
                                 onClick={handleOpenPopup}
                            />
                        </div>
                        <div className={styles.tmp}>
                            <div className={styles.companyData}>
                                <span>{customer.Person.firstName} {customer.Person.lastName}</span>
                                <span>{customer.Person.phoneNumber}</span>
                                <span>{customer.Person.email}</span>
                            </div>
                            <div className={styles.companyData}>
                                <span className={styles.spanHeader}>Address:</span>
                                <span>{customer.postalCode} {customer.city}, {customer.country}</span>
                                <span>{customer.address}</span>
                            </div>
                            <div className={styles.companyData}>
                                <span className={styles.spanHeader}>Company Number:</span>
                                <span>{customer.companyNumber}</span>
                            </div>
                            <div className={styles.companyData}>
                                <span className={styles.spanHeader}>Tax Identification Number:</span>
                                <span>{customer.nip}</span>
                            </div>
                            <div className={styles.companyData}>
                                <span className={styles.spanHeader}>Description:</span>
                                <span>{customer.description}</span>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
            <hr style={{margin: 0}}/>
            <div className={styles.invoiceList}>
                {customerInvoices && <InvoiceList invoiceList={customerInvoices}/>}
            </div>
            {showEditCustomerPopup &&
                <AddCustomerPopup handleClosePopup={handleClosePopup}
                                  handleSubmitPopup={handleSubmitPopup}
                                  customer={customer}
                                  newCustomer={newCustomer}
                                  setNewCustomer={setNewCustomer}
                />}
        </div>
    </Card>)
}

export default withLayout(Customer);