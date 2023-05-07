import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import React, {useState} from 'react';
import styles from "./createCategory.module.css";
import Button from "../components/util/button/button";
import Link from "next/link";
import {useRouter} from "next/router";
import CustomInput from "../components/util/input/customInput";
import {Switch} from "@nextui-org/react";
import CreateCategoryForm from "./createCategoryForm";
import CreateCategoryPageContent from "./createCategoryPageContent";


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
                    <h1>Add Categories</h1>
                </div>
                <hr className={styles.hr}/>
                <CreateCategoryPageContent />
            </div>
        </Card>
    )
}

export default withLayout(CreateCategory);