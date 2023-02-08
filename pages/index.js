import Sidebar from "./components/sidebar/Sidebar";
import style from './components/sidebar/sidebar.module.css'
import {getCategories} from './api/categoriesApi'
import {useEffect, useState} from "react";

function HomePage() {
    const [categories, setCategories] = useState([]);
    const params = {
        id: 1
    }

    useEffect( () => {
        async function fetchData() {
            return await getCategories(params);
        }
         fetchData().then(res => {
             setCategories(Object.values(res));
         });
    }, []);

    return (
        <div className={style.layout}>
            <Sidebar categories={categories}/>
        </div>
    )
}

export default HomePage;