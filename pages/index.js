import Sidebar from "./components/sidebar/Sidebar";
import {getCategories} from './api/categoriesApi'
import {useEffect, useState} from "react";
import Header from "./components/header/header";
import Invoices from "./components/invoices/invoices";

import style from './index.module.css';

function HomePage() {
    const [categories, setCategories] = useState([]);
    const params = {
        id: 1
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
        <div>
            <Header/>
            <div className={style.pageContainer}>
                <Sidebar categories={categories}/>
                <Invoices />
            </div>
        </div>

    )
}

export default HomePage;