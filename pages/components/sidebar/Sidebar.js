import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Collapse} from 'reactstrap';
import SidebarList from "./SidebarList";
import style from './sidebar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight, faGear, faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import {getCookie} from "cookies-next";

const Sidebar = ({categories}) => {
    const [collapse1, setCollapse1] = useState(false);

    const [hasPermission, setHasPermission] = React.useState(false);

    useEffect(() => {
        const userPermissions = JSON.parse(getCookie("roles") || "[]");
        if (userPermissions.some((permission) =>
            permission === "PERMISSION_ADMIN"
            || permission === "PERMISSION_CATEGORY_MANAGEMENT"
        )) {
            setHasPermission(true);
        }
    }, []);
    const toggle1 = () => {
        setCollapse1(!collapse1);
    };

    const [rotation, setRotation] = useState(0);
    const [moveDown, setMoveDown] = useState(false);

    const handleClick = () => {
        setRotation(rotation === 0 ? 90 : 0);
        setMoveDown(!moveDown);
    };
    return (<div className={style.aside}>
        <ul className={style.ul}>
            <li className={style.li}>
                <Link className={`${style.a}`} href="/">
                    <span className={`${style.mainA}`}>
                        Invoices
                    </span>
                </Link>
            </li>
            <li className={`${style.dropdown}`}>
                <div className={`${style.mainCategory}`} style={{paddingLeft: '0'}}>
                    <a className={`${style.a}`} onClick={toggle1}>
                        <div onClick={handleClick}>
                                <span className={`${style.mainA} ${!hasPermission ? style.withoutPermission : ""}`}>
                                    <FontAwesomeIcon icon={faChevronRight}
                                                     className={`${style.arrow_icon} ${style.icon}`}
                                                     style={{
                                                         transform: `rotate(${rotation}deg) 
                                                                     translateX(${moveDown ? 4 : 0}px)
                                                                     translateY(${moveDown ? 5 : 0}px)`,
                                                     }}/>
                                    Categories
                                </span>
                        </div>
                    </a>
                    {hasPermission && <>
                        <FontAwesomeIcon icon={faPencil} className={`${style.icon}`}/>
                        <Link href={"/createCategory"}>
                            <FontAwesomeIcon icon={faPlus} className={style.icon} style={{fontSize: `15px`}}/>
                        </Link>
                    </>}
                </div>
                <Collapse isOpen={collapse1}>
                    <SidebarList categories={categories}/>
                </Collapse>
            </li>
            <li className={style.li}>
                <a className={style.a} href={"/customers"}>
                        <span className={`${style.mainA}`}>
                            Customers
                        </span>
                </a>
            </li>
        </ul>
        <div className={style.settings}>
            <a className={style.a} href="/settings">
                    <span className={`${style.mainA}`}>
                         <FontAwesomeIcon icon={faGear} className={`${style.icon} ${style.gear_icon}`}/>
                        Settings
                    </span>
            </a>
        </div>
    </div>);
};

export default Sidebar;
