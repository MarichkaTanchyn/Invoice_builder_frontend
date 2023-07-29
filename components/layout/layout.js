import React from 'react';
import style from "./layout.module.css";
import Header from "../util/header/header";
import Sidebar from "../sidebar/Sidebar";
import {useEffect, useState} from "react";
import { getCategoriesWithSubcategories} from "../../pages/api/categoriesApi";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";


const Layout = ({children}) => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (getCookie('accToken') === undefined) {
                await router.push('login');
            }
            const resp = await getCategoriesWithSubcategories()
            if (resp.status === 200) {
                setCategories(resp.data)
            }else {
                await router.push('login');
            }

        }
        fetchData();
    }, []);
    return (
        <div className={style.pageContainer}>
            <Header withAccounts={true}/>
            <div className={style.pageContentContainer}>
                <Sidebar categories={categories}/>
                <div className={style.pageContent}>{children}</div>
            </div>
        </div>
    );
};

export default Layout;