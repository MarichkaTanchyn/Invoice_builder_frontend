import React from "react";
import Link from 'next/link';
import styles from './header.module.css'

const Header = ({withAccounts}) => {
    return (<header className={styles.header}>
            <div className={styles.logoAndName}>
                <Link href="/">
                    <img className={styles.img} src="/logo.svg" alt="Logo"/>
                </Link>
                <h1 className={styles.h1}>Invoice Builder</h1>
            </div>
            {withAccounts && (<Link href="">
                <img className={styles.img} src="/accounts.svg" alt="Account"/>
            </Link>)}
        </header>);
}

export default Header;