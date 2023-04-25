import React from 'react';
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import currencies from "../components/data/currency.json";
import paymentMethods from "../components/data/paymentMethods.json";
import styles from "./createInvoice.module.css"


const PaymentActions = () => {
    return (
        <div className={styles.paymentActions}>
        {/*    select currency, select payment method, select bankAccount, input paid, input left to pay, checkBox paid*/}
            <SelectWithUnderline options={currencies} label={"Currency"} placeholder={"Currency"} />
            <SelectWithUnderline options={paymentMethods} label={"Payment Methods"} placeholder={"Payment Methods"}/>
        </div>
    )
}

export default PaymentActions;