import React from 'react';
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import currencies from "../components/data/currency.json";
import paymentMethods from "../components/data/paymentMethods.json";
import styles from "./createInvoice.module.css"


const PaymentActions = () => {
    return (
        <div className={styles.paymentActions}>
            {/*    select currency, select payment method, select bankAccount, input paid, input left to pay, checkBox paid*/}
            <SelectWithUnderline options={currencies} label={"Currency"} placeholder={"Currency"}/>
            <SelectWithUnderline options={paymentMethods} label={"Payment Methods"} placeholder={"Payment Methods"}/>

            <div className={styles.bankAccLabel}>
                <span style={{fontSize:".9em", color: "rgba(27, 27, 27, 0.5)"}}>Bank Account </span>
                <span>92 3842 3232 3203 9132 0000 3422 <hr/></span>
            </div>
        </div>
    )
}

export default PaymentActions;