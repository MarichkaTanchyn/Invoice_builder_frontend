import React from 'react';
import style from "./layout.module.css";
import Header from "../util/header/header";
import Sidebar from "../sidebar/Sidebar";
import {useEffect, useState} from "react";
import {getCategories} from "../../api/categoriesApi";
import {getCookie} from "cookies-next";

const Layout = ({children}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        async function fetchData() {
            return await getCategories();
        }

        fetchData().then(res => {
            setCategories(Object.values(res.props.categories));
        });
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