import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse} from 'reactstrap';
import SidebarList from "./SidebarList";
import style from './sidebar.module.css';

const CATEGORIES = [
    {
        id: 123,
        name: 'Shoes'
    },
    {
        id: 111,
        name: 'T-Shirts'
    },
    {
        id: 121,
        name: 'Jeans'
    }
];

const Sidebar = () => {
    const [collapse1, setCollapse1] = useState(false);

    const toggle1 = () => {
        setCollapse1(!collapse1);
    };

    return (
        <div className={style.aside}>
            <ul className={style.ul}>
                <li className={style.li}>
                    <a className={`${style.a}`} href="#">Invoices</a>
                </li>
                <li className={`${style.li} ${style.dropdown}`}>
                    <a className={`${style.a}`} onClick={toggle1}>
                        <span className={`${style.mainA}`}>
                            Categories
                        </span>
                    </a>
                    <Collapse isOpen={collapse1}>
                        <SidebarList categories={CATEGORIES}/>
                    </Collapse>
                </li>
                <li className={style.li}>
                    <a className={style.a} href="#">Customers</a>
                </li>
                <li className={style.li}>
                    <a className={style.a} href="#">Reports</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
