import React from 'react';
import SelectWithUnderline from "../../components/util/select/selectWithUnderline";
import currencies from "../../components/data/currency.json";
import paymentMethods from "../../components/data/paymentMethods.json";
import styles from "./createInvoice.module.css"
import CustomInput from "../../components/util/input/customInput";
import CheckboxWithLabel from "../../components/util/filter/checkboxWithLabel";


const PaymentActions = ({leftToPay, setPaid, bankAccount, setCurrency, setPaymentMethod}) => {

    const [partiallyPaid, setPartiallyPaid] = React.useState(false);

    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    return (
        <div className={styles.paymentActions}>
            <SelectWithUnderline options={currencies} label={"Currency"} placeholder={"Currency"}
                                 onChange={(option) => setCurrency(option)}/>
            <SelectWithUnderline options={paymentMethods} label={"Payment Methods"} placeholder={"Payment Methods"}
                                 onChange={(option) => setPaymentMethod(option)}/>

            <div className={styles.labelBox}>
                <span className={styles.label}>Bank Account </span>
                <span>{bankAccount ? bankAccount : ''}
                    <hr/></span>
            </div>
            <div className={styles.labelBox}>
                <span className={styles.label}>Partially paid</span>
                <CheckboxWithLabel checked={partiallyPaid} onChange={handleCheckboxChange(setPartiallyPaid)}/>
            </div>
            {partiallyPaid &&
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div className={styles.labelBox}>
                        <span className={styles.label}>Paid</span>
                        <CustomInput type="text" placeholder="0" onChange={(value) => setPaid(value)}
                                     className={styles.payInput}/>
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
