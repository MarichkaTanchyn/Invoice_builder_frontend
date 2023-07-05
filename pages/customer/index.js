import withLayout from "../components/layout/withLayout";
import {useRouter} from "next/router";
import Card from "../components/util/card/card";
import styles from "./customer.module.css"
import Link from "next/link";
import React, {useEffect} from "react";
import {getCustomer} from "../api/customersApi";
import {getCustomerInvoices} from "../api/invoicesAPI";
import InvoiceList from "../invoiceList/invoiceList";

const Customer = () => {

    const [customer, setCustomer] = React.useState(null);
    const [customerInvoices, setCustomerInvoices] = React.useState(null);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const id = router.query.id;
            if (id) {
                const res = await getCustomer(id);
                setCustomer(res.data);
                const data = await getCustomerInvoices(id);
                console.log(data);
                setCustomerInvoices(data.data);
                // console.log(id)
            }
        }

        if (router.isReady) { // This checks whether the router instance is ready
            fetchData();
        }
    }, [router.isReady, router.query.id]);


    return (<Card>
        <div>
            <Link href={"/customers"} passHref>
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
                        <h4>{customer && customer.name}</h4>
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
                                <span className={styles.spanHeader} >Tax Identification Number:</span>
                                <span>{customer.nip}</span>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
            <hr style={{margin: 0}} />
            <div className={styles.invoiceList}>
                {customerInvoices &&
                <InvoiceList invoiceList={customerInvoices} />
                }
            </div>
        </div>
    </Card>)
}

export default withLayout(Customer);