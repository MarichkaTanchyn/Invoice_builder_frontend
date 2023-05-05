import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./createCategory.module.css";
import Button from "../components/util/button/button";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/router";
import CustomInput from "../components/util/input/customInput";


const CreateCategory = () => {
    const router = useRouter();
    const onClick = async () => {
        await router.push("/");
    }
    return (
        <Card>
            <div>
                <Link href={"/"} passHref>
                    <div className={styles.backToInvoices}>
                        <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                        <button onClick={onClick} className={styles.buttonWithImg}>Back to Invoices</button>
                    </div>
                </Link>
                <div className={styles.headers}>
                    <h1>Add New Category</h1>
                </div>
                <hr/>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <div>
                            <CustomInput label={"Name"} type={"text"} placeholder="Add a descriptive name..." className={styles.categoryNameInput}/>
                        </div>
                        <div>
                            <CustomInput label={"Vat(%)"} placeholder="" type={"text"} className={styles.input}/>
                        </div>

                    </div>
                </div>
            </div>
        </Card>
)
}

export default withLayout(CreateCategory);