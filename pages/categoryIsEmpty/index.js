import React from 'react';
import Card from "../components/util/card/card";
import withLayout from "../components/layout/withLayout";
import styles from "./emptyCategory.module.css";
import {useRouter} from "next/router";


const CategoryIsEmpty = () => {

    const router = useRouter();
    const handleRedirect = async( link ) => {
        console.log("link", link);
        await router.push(link);
    }


    return (
        <Card customStyle={styles.card}>
            <div className={styles.contentContainer}>
                <div>
                    <h3>No Data Available: Explore Options to Add New Information</h3>
                </div>
                <div className={styles.cardsContainer}>
                    <div className={styles.smallCards} onClick={() => handleRedirect("/fileUpload")}>
                        <h4>Upload file and automatically fill table</h4>
                        <img className={styles.img} src={"/file.svg"} alt={"file"} />
                    </div>
                    <div className={styles.smallCards}>
                        <h4>Add columns and fill table manually</h4>
                        <img className={styles.img} src={"/table.svg"} alt={"table"} />

                    </div>
                </div>
            </div>
        </Card>
    )
}

export default withLayout(CategoryIsEmpty);

