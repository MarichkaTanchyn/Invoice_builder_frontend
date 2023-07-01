import React from 'react';
import styles from './accounts.module.css';
import {deleteCookie, getCookie} from "cookies-next";
import Button from "../button/button";
import {useRouter} from "next/router";


const AccountsPopup = ({setShowAccountsPopup}) => {
    const router = useRouter();

    const handlePopupClick = (event) => {
        event.stopPropagation(); // Add this line to prevent the popup from closing
    };


    const handleLogOut = async () => {
        deleteCookie('accToken');
        deleteCookie('categoryId');
        deleteCookie('employeeId');
        deleteCookie('companyId');
        deleteCookie('fKey');
        deleteCookie('sheetHeaderJson');
        deleteCookie('roles');
        setShowAccountsPopup(false);
        await router.push("login")
    }
    const email = getCookie('email');


    return (<div className={styles.popupBox}>
            <div className={styles.box} onClick={handlePopupClick}>
                <div className={styles.content}>
                    <h4>Accounts</h4>
                    <span>{email}</span>
                    <Button label={"LogOut"} onClick={handleLogOut}/>
                </div>
            </div>
        </div>)

}

export default AccountsPopup;