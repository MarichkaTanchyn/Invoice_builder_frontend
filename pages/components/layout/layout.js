import React from 'react';
import style from "./layout.module.css";
import Header from "../util/header/header";
import Sidebar from "../sidebar/Sidebar";
import {useEffect, useState} from "react";
import {getCategories} from "../../api/categoriesApi";
import styles from "../../invoiceList/invoices.module.css";

const Layout = ({children}) => {

    const [categories, setCategories] = useState([]);
    const params = {
        CompanyId: 4
    }

    useEffect(() => {
        async function fetchData() {
            return await getCategories(params);
        }

        fetchData().then(res => {
            setCategories(Object.values(res.props.categories));
        });
    }, []);
    return (
        <div className={style.pageContainer}>
            <Header/>
            <div className={style.pageContentContainer}>
                <Sidebar categories={categories}/>
                <div className={styles.pageContent}>{children}</div>
            </div>
        </div>
    );
};

export default Layout;