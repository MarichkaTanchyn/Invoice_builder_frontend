import React from 'react';
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import currencies from "../components/data/currency.json";
import paymentMethods from "../components/data/paymentMethods.json";
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";


const PaymentActions = ({totalGrossValue}) => {

    const [paid, setPaid] = React.useState(0);
    const [partiallyPaid, setPartiallyPaid] = React.useState(false);

    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    const handlePaid = (value) => {
        setPaid(value);
    }

    const leftToPay = totalGrossValue - (parseFloat(paid) || 0);


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
                <span className={styles.label}>Partially paid</span>
                <CheckboxWithLabel checked={partiallyPaid} onChange={handleCheckboxChange(setPartiallyPaid)}/>
            </div>
            {partiallyPaid &&
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div className={styles.labelBox}>
                        <span className={styles.label}>Paid</span>
                        <CustomInput type="text" placeholder="0" onChange={handlePaid} className={styles.payInput}/>
                    </div>
                    <div className={styles.labelBox}>
                        <span className={styles.label}>Left to Pay</span>
                        <span>{leftToPay}
                            <hr/></span>
                    </div>
                </div>
            }

        </div>
    )
}

export default PaymentActions;
