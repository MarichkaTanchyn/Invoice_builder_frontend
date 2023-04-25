import {Radio} from '@nextui-org/react';
import React from 'react';
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import CountryOptions from "../components/data/countries";
import ProductTable from './productTable';
import Button from "../components/util/button/button";
import {useRouter} from "next/router";


const TERMS_OPTIONS = [
    {value: "10", label: "10 days"},
    {value: "30", label: "30 days"},
    {value: "60", label: "60 days"},
    {value: "90", label: "90 days"},
]

const CreateInvoiceForm = () => {

    //TODO: add onclick to add && delete item button, add listeners for selects and inputs
    const router = useRouter();
    const handleCancelButton = async () => {
        await router.push("/")
    }

    const handleSubmitButton = () => {
        console.log("submit")
    }


    return (
        <>
            <div className={styles.invoiceHeaders}>
                <Radio.Group label={"Type"} defaultValue={"invoice"} className={styles.blackRadio}>
                    <Radio value={"invoice"} size={"sm"}>Invoice</Radio>
                    <Radio value={"quote"} size={"sm"}>Quote</Radio>
                </Radio.Group>
                <CustomInput label={"Document Num"} placeholder={"Document Number"} type={"text"}/>
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
                <CustomInput label={"Street"} type={"text"}/>
                <SelectWithUnderline
                    label={"Country"} placeholder={"Country"} options={CountryOptions.countries}
                    customStyles={styles.selectLabel}/>
                <CustomInput label={"City"} type={"text"}/>
                <CustomInput label={"Postcode"} type={"text"}/>

            </div>
            <div className={styles.items}>
                <ProductTable/>
            </div>
            <div className={styles.actionButtons}>
                <div className={styles.button}>
                    <Button label={"Submit"} onClick={handleSubmitButton}/>
                </div>
                <div className={styles.button}>
                        <Button label={"Cancel"} onClick={handleCancelButton}/>
                </div>
            </div>
        </>
    )
}

export default CreateInvoiceForm;