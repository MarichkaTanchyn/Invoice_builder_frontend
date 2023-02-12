import React from "react";
import Link from 'next/link';
import styles from './header.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeoplePulling} from "@fortawesome/free-solid-svg-icons";
// import style from "../sidebar/sidebar.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoAndName}>
            <Link href="/">
                <img className={styles.img} src="/logo.svg" alt="Logo"/>
            </Link>
            <h1 className={styles.h1}>Invoice Builder</h1>
            </div>
            <Link href="">
                {/*faPeoplePulling*/}

                {/*<FontAwesomeIcon icon={faPeoplePulling} />*/}
                <img className={styles.img} src="/accounts.svg" alt="Account"/>
            </Link>
        </header>
    );
}

export default Header;