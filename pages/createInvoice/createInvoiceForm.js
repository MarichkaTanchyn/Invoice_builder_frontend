import {Radio} from '@nextui-org/react';
import React from 'react';
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import ButtonWithImg from "../components/util/button/buttonWithImg";

const TERMS_OPTIONS = [
    {value: "10", label: "10 days"},
    {value: "30", label: "30 days"},
    {value: "60", label: "60 days"},
    {value: "90", label: "90 days"},
]

const CreateInvoiceForm = () => {

    //TODO: add onclick to add && delete item button, add listeners for selects and inputs

    return (
        <>
            <div className={styles.invoiceHeaders}>
                <Radio.Group label={"Type"} defaultValue={"invoice"}>
                    <Radio value={"invoice"} size={"sm"}>Invoice</Radio>
                    <Radio value={"quote"} size={"sm"}>Quote</Radio>
                </Radio.Group>
                <CustomInput label={"Document Num"} placeholder={"Document Number"} type={"text"}
                             className={styles.selectLabel}/>
                <CustomInput label={"Valid from"} placeholder={"Valid from"} type={"date"}/>
                <CustomInput label={"Valid until"} placeholder={"Valid until"} type={"date"}/>
                <SelectWithUnderline
                    label={"Payment terms"} placeholder={"Payment terms"} options={TERMS_OPTIONS}
                    customStyles={styles.selectLabel}/>
            </div>
            <div className={styles.customerInfo}>
                <SelectWithUnderline
                    label={"Customer"} placeholder={"Customer"} options={TERMS_OPTIONS}
                    customStyles={styles.selectLabel}/>
                <CustomInput label={"NIP"} type={"text"}/>
                <CustomInput label={"Street"}  type={"text"}/>
                <CustomInput label={"City"} type={"text"}/>
                <CustomInput label={"Postcode"}  type={"text"}/>
                <SelectWithUnderline
                    label={"Country"} placeholder={"Country"} options={TERMS_OPTIONS}
                    customStyles={styles.selectLabel}/>
            </div>
            <div className={styles.items}>
                <h2>Items</h2>
                <hr/>
                <div className={styles.itemsActions}>
                    <ButtonWithImg label={"Add"} imgSrc={"/add.svg"} alt={"add"}/>
                    <ButtonWithImg label={"Delete"} imgSrc={"/bin.svg"} alt={"bin"}/>
                </div>
            </div>
        </>
    )
}

export default CreateInvoiceForm;