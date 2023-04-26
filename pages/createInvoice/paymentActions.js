import React from 'react';
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import currencies from "../components/data/currency.json";
import paymentMethods from "../components/data/paymentMethods.json";
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";


const PaymentActions = () => {


    return (
        <div className={styles.paymentActions}>
            {/*    select currency, select payment method, select bankAccount, input paid, input left to pay, checkBox paid*/}
            <SelectWithUnderline options={currencies} label={"Currency"} placeholder={"Currency"}/>
            <SelectWithUnderline options={paymentMethods} label={"Payment Methods"} placeholder={"Payment Methods"}/>

            <div className={styles.labelBox}>
                <span className={styles.label}>Bank Account </span>
                <span>92 3842 3232 3203 9132 0000 3422 <hr/></span>
            </div>
            <div className={styles.labelBox}>
                <span className={styles.label}>Paid</span>
                <CustomInput type="text" placeholder="0.00"/>
            </div>
        </div>
    )
}

export default PaymentActions;
