import React from "react";
import Link from 'next/link';
import styles from './header.module.css'
import AccountsPopup from "../accounts/accountsPopup";

const Header = ({withAccounts}) => {
    const [showAccountsPopup, setShowAccountsPopup] = React.useState(false);
    const handleAccountsClick = () => {
        setShowAccountsPopup(true)
    }

    return (<header className={styles.header}>
            <div className={styles.logoAndName}>
                <Link href="/">
                    <img className={styles.img} src="/logo.svg" alt="Logo"/>
                </Link>
                <h1 className={styles.h1}>Invoice Builder</h1>
            </div>
            {withAccounts && (<Link onClick={handleAccountsClick} href="">
                <img className={styles.img} src="/accounts.svg" alt="Account"/>
            </Link>)}
        {showAccountsPopup && <AccountsPopup setShowAccountsPopup={setShowAccountsPopup}/>}
        </header>);
}

export default Header;