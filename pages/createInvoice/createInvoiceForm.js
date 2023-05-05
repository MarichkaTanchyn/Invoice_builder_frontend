import {Radio} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import styles from "./createInvoice.module.css"
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import CountryOptions from "../components/data/countries";
import ProductTable from './productTable';
import Button from "../components/util/button/button";
import {useRouter} from "next/router";
import {sendInvoiceData} from "../api/invoicesAPI";


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
    const [rows, setRows] = useState([
        {
            id: 1,
            product: '',
            unit: '',
            amount: '1',
            unitPrice: '0.00',
            vat: '',
            netValue: '0.00',
            vatValue: '0.00',
            grossValue: '0.00',
            discount: '0',
        },
    ]);
    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            product: '',
            unit: '',
            amount: '1',
            unitPrice: '0.00',
            vat: '',
            netValue: '0.00',
            vatValue: '0.00',
            grossValue: '0.00',
            discount: '0',
        };
        setRows((prevRows) => [...prevRows, newRow]);
    };
    const [summary, setSummary] = useState({
        totalAmount: 0,
        totalNetValue: 0,
        totalVatValue: 0,
        totalGrossValue: 0,
    });


    const deleteSelectedRows = () => {
        const selectedRows = rows.filter((row) => row.checked);

        if (selectedRows.length === rows.length) {
            setRows([rows[0]]);
        } else {
            setRows((prevRows) => prevRows.filter((row) => !row.checked));
        }
    };

    const handleInputChange = (id, field, value, selectedProduct) => {
        const productData = selectedProduct
            ? {
                unit: selectedProduct.unit,
                unitPrice: selectedProduct.unitPrice,
                vat: selectedProduct.vat
            }
            : {};

        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    const updatedRow = {...row, [field]: value, ...productData};

                    // Ensure amount is greater than 0 or not null
                    const amount = (field === 'amount' && (parseFloat(value) <= 0 || !value))
                        ? 1
                        : parseFloat(updatedRow.amount);

                    // Calculate Net Value before applying the discount
                    const netValueBeforeDiscount = amount * parseFloat(updatedRow.unitPrice);

                    // Calculate discount amount
                    const discountValue = updatedRow.discount ? parseFloat(updatedRow.discount) : 0;
                    const discountAmount = netValueBeforeDiscount * (discountValue * 0.01);

                    // Calculate Net Value after applying the discount
                    updatedRow.netValue = (netValueBeforeDiscount - discountAmount).toFixed(2);

                    // Calculate VAT Value
                    updatedRow.vatValue = (
                        parseFloat(updatedRow.netValue) *
                        parseFloat(updatedRow.vat) *
                        0.01
                    ).toFixed(2);

                    // Calculate Gross Value
                    updatedRow.grossValue = (
                        parseFloat(updatedRow.netValue) + parseFloat(updatedRow.vatValue)
                    ).toFixed(2);

                    // Update amount if it was changed in the previous check
                    if (field === 'amount') {
                        updatedRow.amount = amount;
                    }

                    return updatedRow;
                } else {
                    return row;
                }
            })
        );
    };

    const toggleRowSelection = (id) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? {...row, checked: !row.checked} : row
            )
        );
    };

    const selectAllRows = () => {
        setRows((prevRows) =>
            prevRows.map((row) => ({...row, checked: true}))
        );
    };

    useEffect(() => {
        const updatedSummary = calculateSummary();
        setSummary(updatedSummary);
    }, [rows]);

    const calculateSummary = () => {
        const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
        const totalNetValue = rows.reduce((sum, row) => sum + parseFloat(row.netValue || 0), 0);
        const totalVatValue = rows.reduce((sum, row) => sum + parseFloat(row.vatValue || 0), 0);
        const totalGrossValue = rows.reduce((sum, row) => sum + parseFloat(row.grossValue || 0), 0);

        return {
            totalAmount,
            totalNetValue,
            totalVatValue,
            totalGrossValue,
        };
    };


    const collectInvoiceData = () => {
        const invoiceData = {
            products: rows,
            summary
        };
        //todo: add payment details and invoice&client details
        return invoiceData;
    };

    const handleSubmitButton = async () => {
        const invoiceData = collectInvoiceData();
        console.log(invoiceData);
        // await sendInvoiceData(invoiceData);
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
                <ProductTable summary={summary}
                              rows={rows}
                              addRow={addRow}
                              deleteSelectedRows={deleteSelectedRows}
                              handleInputChange={handleInputChange}
                              toggleRowSelection={toggleRowSelection}
                              selectAllRows={selectAllRows}
                />
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