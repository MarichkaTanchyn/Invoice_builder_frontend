import { Radio } from '@nextui-org/react';
import React from 'react';
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import Card from "../components/util/card/card";

const TERMS_OPTIONS = [
    {value: "10", label: "10 days"},
    {value: "30", label: "30 days"},
    {value: "60", label: "60 days"},
    {value: "90", label: "90 days"},
]

const CreateInvoiceForm = () => {
    return (
        <>
            <div className={styles.invoiceHeaders}>
                <Radio.Group label={"Type"} defaultValue={"invoice"}>
                <Radio value={"invoice"} size={"sm"}>Invoice</Radio>
                <Radio value={"quote"} size={"sm"}>Quote</Radio>
                </Radio.Group>
                <CustomInput label={"Document Num"} placeholder={"DocumentNumber"} type={"text"} />
                <CustomInput label={"Valid from"} placeholder={"Valid from"} type={"date"} />
                <CustomInput label={"Valid until"} placeholder={"Valid until"} type={"date"} />
                <SelectWithLabel label={"Payment terms"} placeholder={"Payment terms"} options={TERMS_OPTIONS}/>

            </div>
        </>
    )
}

export default CreateInvoiceForm;