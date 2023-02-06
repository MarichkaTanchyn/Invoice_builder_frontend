import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse} from 'reactstrap';
import SidebarList from "./SidebarList";
import style from './sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faPencil, faPlus, faGear} from '@fortawesome/free-solid-svg-icons'

const CATEGORIES = [{
    id: 123, name: 'Shoes'
}, {
    id: 111, name: 'T-Shirts'
}, {
    id: 121, name: 'Jeans'
}];

const Sidebar = () => {
    const [collapse1, setCollapse1] = useState(false);

    const toggle1 = () => {
        setCollapse1(!collapse1);
    };

    const [rotation, setRotation] = useState(0);
    const [moveDown, setMoveDown] = useState(false);

    const handleClick = () => {
        setRotation(rotation === 0 ? 90 : 0);
        setMoveDown(!moveDown);
    };

    return (
        <div className={style.aside}>
        <ul className={style.ul}>
            <li className={style.li}>
                <a className={`${style.a}`} href="#">
                    <span className={`${style.mainA}`}>
                        Invoices
                    </span>
                </a>

            </li>
            <li className={`${style.li} ${style.dropdown}`}>
                <a className={`${style.a}`} onClick={toggle1}>
                    <div onClick={handleClick}>
                    <span className={`${style.mainA}`}>
                        <FontAwesomeIcon icon={faChevronRight}
                                         className={style.arrow_icon}
                                         style={{
                                             transform: `rotate(${rotation}deg) 
                                                         translateX(${moveDown ? 4 : 0}px)
                                                         translateY(${moveDown ? 5 : 0}px)`,
                                         }} />
                        Categories
                    </span>
                        <FontAwesomeIcon icon={faPencil} className={style.icon}/>
                        <FontAwesomeIcon icon={faPlus} className={style.icon} style={{fontSize : `17px`}}/>
                    </div>
                </a>
                <Collapse isOpen={collapse1}>
                    <SidebarList categories={CATEGORIES}/>
                </Collapse>
            </li>
            <li className={style.li}>
                <a className={style.a} href="#">
                    <span className={`${style.mainA}`}>
                        Customers
                    </span>
                </a>
            </li>
            <li className={style.li}>
                <a className={style.a} href="#">
                    <span className={`${style.mainA}`}>
                        Reports
                    </span>
                </a>
            </li>
        </ul>
        <ul className={style.settings}>
            <li className={style.li}>
                <a className={style.a} href="#">
                    <span className={`${style.mainA}`}>
                         <FontAwesomeIcon icon={faGear} className={style.gear_icon}/>
                        Settings
                    </span>
                </a>
            </li>
        </ul>
    </div>);
};

export default Sidebar;
