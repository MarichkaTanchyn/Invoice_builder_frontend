import Sidebar from "./components/sidebar/Sidebar";
import {getCategories} from './api/categoriesApi'
import {useEffect, useState} from "react";
import Header from "./components/header/header";
import Invoices from "./components/invoices/invoices";

import style from './index.module.css';

const CATEGORIES_OPTIONS = [
    {id: 1, name: "Spodnie"},
    {id: 2, name: "Bluzy"},
    {id: 3, name: "Koszule" }
]

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
                <Sidebar categories={CATEGORIES_OPTIONS}/>
                <Invoices />
            </div>
        </div>

    )
}

export default HomePage;