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


const CreateCategory = () => {
    const router = useRouter();

    const [showSubcategories, setShowSubcategories] = useState(false);

    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
    };
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
                <hr className={styles.hr}/>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <div>
                            <CustomInput label={"Name"} type={"text"} placeholder="Add a descriptive name..."
                                         className={styles.categoryNameInput}/>
                        </div>
                        <div>
                            <CustomInput label={"Vat(%)"} placeholder="" type={"text"} className={styles.input}/>
                            <span style={{color: "#AFAFAF"}}>
                                * this will be default vat for all products in category,<br/>
                                can be changed in invoice creating process
                            </span>
                        </div>
                    </div>
                    <div className={styles.subCategories}>
                        <label>Subcategories</label>
                        <Switch
                            size={"sm"}
                            squared
                            color="primary"
                            checked={showSubcategories}
                            onChange={toggleSubcategories}
                        >
                            Squared option
                        </Switch>
                    </div>
                    <CreateCategoryForm showSubcategories={showSubcategories} />
                </div>
            </div>
        </Card>
    )
}

export default withLayout(CreateCategory);