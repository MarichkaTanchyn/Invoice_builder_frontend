import withLayout from "../components/layout/withLayout";
import {useRouter} from "next/router";
import Card from "../components/util/card/card";
import styles from "./customer.module.css"
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getCustomer} from "../api/customersApi";

const Customer = () => {

    const [customer, setCustomer] = React.useState(null);

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const id = router.query.id;
            if (id) {
                const res = await getCustomer(id);
                setCustomer(res.data);
                console.log(res.data);
                console.log(id)
            }
        }

        if (router.isReady) { // This checks whether the router instance is ready
            fetchData();
        }
    }, [router.isReady, router.query.id]);


    return (
        <Card>
            <div>
                <Link href={"/"} passHref>
                    <div className={styles.back}>
                        <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                        <button className={styles.buttonWithImg}>Back</button>
                    </div>
                </Link>
                <div className={styles.headers}>
                        <div className={styles.avatar}>
                        <img   className={styles.accountIcon}
                               src="/account.svg"
                               alt="account"/>
                        </div>
                    {customer &&
                    <div className={styles.companyContacts}>
                        <h4>{customer && customer.name}</h4>
                        <div className={styles.representativeData}>
                            <div className={styles.representative}>
                                <span>{customer.Person.firstName}</span>
                                <span>{customer.Person.lastName}</span>
                            </div>
                            <span>{customer.Person.phoneNumber}</span>
                            <span>{customer.Person.email}</span>
                        </div>

                    </div>
                    }
                </div>
                <div className={styles.invoiceList}></div>
            </div>
        </Card>
    )
}

export default withLayout(Customer);