import {Radio} from '@nextui-org/react';
import React, {useEffect, useState} from 'react';
import styles from "./createInvoice.module.css"
import CustomInput from "../../components/util/input/customInput";
import SelectWithUnderline from "../../components/util/select/selectWithUnderline";
import ProductTable from './productTable';
import Button from "../../components/util/button/button";
import {useRouter} from "next/router";
import {getCustomer} from "../api/customersApi";
import TERMS_OPTIONS from "../../components/data/paymentTerms";
import PaymentActions from "./paymentActions";
import InvoicePreview from "../../components/invoicePreview/invoicePreview";
import {generateHTML} from "../../components/invoicePreview/generateHtml";
import {sendInvoiceData} from "../api/invoicesAPI";
import globalStyle from "../global.module.css";
import WarningPopup from "../../components/util/warningPopup/warningPopup";

const CreateInvoiceForm = ({
                               customers,
                               products,
                               clickedOpenPreview,
                               setClickedOpenPreview,
                               companyDetails = [{}],
                               employee
                           }) => {

    const [customer, setCustomer] = useState(null)
    const [documentType, setDocumentType] = useState("invoice")
    const [documentNumber, setDocumentNumber] = useState(`INV-${Date.now()}`);
    const today = new Date().toISOString().substr(0, 10);
    const [validFrom, setValidFrom] = useState(today);
    const [validUntil, setValidUntil] = useState('');
    const [paymentTerm, setPaymentTerm] = useState(null);
    const [currency, setCurrency] = useState();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [openPreview, setOpenPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(null);
    const [showFillDataPopup, setShowFillDataPopup] = useState(false);
    const [showFillCompanyDataPopup, setShowFillCompanyDataPopup] = useState(false);
    const [htmlString, setHtmlString] = useState('');


    useEffect(() => {
        if (clickedOpenPreview) {
            setOpenPreview(true);
            setHtmlString(generateHTML(collectInvoiceData()));
        }
    }, [clickedOpenPreview])

    useEffect(() => {
        let newValidUntil;
        if (paymentTerm && paymentTerm.value !== 'custom') {
            const daysToAdd = paymentTerm.value === 'net30' ? 30 : paymentTerm.value === 'net60' ? 60 : 90;
            newValidUntil = new Date(new Date(validFrom).setDate(new Date(validFrom).getDate() + daysToAdd));
            setValidUntil(newValidUntil.toISOString().substr(0, 10));
        } else if (!paymentTerm) {
            newValidUntil = new Date(new Date(validFrom).setDate(new Date(validFrom).getDate() + 20));
            setValidUntil(newValidUntil.toISOString().substr(0, 10));
        }
    }, [validFrom, paymentTerm]);

    useEffect(() => {
        const diffDays = Math.ceil((new Date(validUntil) - new Date(validFrom)) / (1000 * 60 * 60 * 24));
        if (diffDays !== 30 && diffDays !== 60 && diffDays !== 90) {
            setPaymentTerm(TERMS_OPTIONS.find(option => option.value === 'custom'));
        }
    }, [validUntil, validFrom]);

    const router = useRouter();
    const handleCancelButton = async () => {
        await router.push("/")
    }

    const [rows, setRows] = useState([{
        id: 1,
        product: [],
        unit: '',
        amount: '1',
        unitPrice: '0.00',
        vat: '23',
        netValue: '0.00',
        vatValue: '0.00',
        grossValue: '0.00',
        discount: '0',
        selectedProduct: null,
        categories: '',
    },]);
    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            product: [],
            unit: '',
            amount: '1',
            unitPrice: '0.00',
            vat: '23',
            netValue: '0.00',
            vatValue: '0.00',
            grossValue: '0.00',
            discount: '0',
            selectedProduct: null,
            categories: '',
        };
        setRows((prevRows) => [...prevRows, newRow]);
    };
    const [summary, setSummary] = useState({
        totalAmount: 0, totalNetValue: 0, totalVatValue: 0, totalGrossValue: 0,
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
        const productData = selectedProduct ? {
            unit: selectedProduct.unit, unitPrice: selectedProduct.unitPrice, vat: selectedProduct.vat
        } : {};

        setRows((prevRows) => prevRows.map((row) => {
            if (row.id === id) {
                const updatedRow = {...row, [field]: value, ...productData};

                // Ensure amount is greater than 0 or not null
                const amount = (field === 'amount' && (parseFloat(value) <= 0 || !value)) ? 1 : parseFloat(updatedRow.amount);

                // Calculate Net Value before applying the discount
                const netValueBeforeDiscount = amount * parseFloat(updatedRow.unitPrice);

                // Calculate discount amount
                const discountValue = updatedRow.discount ? parseFloat(updatedRow.discount) : 0;
                const discountAmount = netValueBeforeDiscount * (discountValue * 0.01);

                // Calculate Net Value after applying the discount
                updatedRow.netValue = (netValueBeforeDiscount - discountAmount).toFixed(2);

                // Calculate VAT Value
                updatedRow.vatValue = (parseFloat(updatedRow.netValue) * parseFloat(updatedRow.vat) * 0.01).toFixed(2);

                // Calculate Gross Value
                updatedRow.grossValue = (parseFloat(updatedRow.netValue) + parseFloat(updatedRow.vatValue)).toFixed(2);

                // Update amount if it was changed in the previous check
                if (field === 'amount') {
                    updatedRow.amount = amount;
                }

                return updatedRow;
            } else {
                return row;
            }
        }));
    };

    const toggleRowSelection = (id) => {
        setRows((prevRows) => prevRows.map((row) => row.id === id ? {...row, checked: !row.checked} : row));
    };

    const selectAllRows = () => {
        setRows((prevRows) => prevRows.map((row) => ({...row, checked: true})));
    };

    useEffect(() => {
        const updatedSummary = calculateSummary();

        setSummary(updatedSummary);
    }, [rows]);

    const calculateSummary = () => {
        const totalAmount = parseFloat(rows.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0)).toFixed(2);
        const totalNetValue = parseFloat(rows.reduce((sum, row) => sum + parseFloat(row.netValue || 0), 0)).toFixed(2);
        const totalVatValue = parseFloat(rows.reduce((sum, row) => sum + parseFloat(row.vatValue || 0), 0)).toFixed(2);
        const totalGrossValue = parseFloat(rows.reduce((sum, row) => sum + parseFloat(row.grossValue || 0), 0)).toFixed(2);
        const leftToPay = parseFloat(totalGrossValue - paid).toFixed(2);
        return {
            totalAmount, totalNetValue, totalVatValue, totalGrossValue, leftToPay, paid
        };
    };


    const collectInvoiceData = () => {
        return {
            documentType: documentType,
            documentNumber: documentNumber,
            validFrom: validFrom,
            validUntil: validUntil,
            paymentTerm: paymentTerm.value ? paymentTerm.label : '',
            customer: customer,
            products: rows,
            bankAccount: companyDetails[0].bankAccountNumber,
            currency: currency ? currency : '',
            paymentMethod: paymentMethod ? paymentMethod.label : '',
            companyDetails: companyDetails[0],
            employee: employee,
            summary: summary
        };
    };

    const handleSubmitButton = async () => {
        let notEnoughData = false;

        for (let key in companyDetails[0]) {
            if (companyDetails[0][key] === null) {
                setShowFillCompanyDataPopup(true)
            }
        }
        for (let key in rows) {
            if (rows[key].selectedProduct === null) {
                notEnoughData = true
            }
        }
        if (!customer) {
            notEnoughData = true
        }
        if (notEnoughData) {
            setShowFillDataPopup(true)
        } else {
            let invoiceData = collectInvoiceData();
            const htmlString = generateHTML(invoiceData);
            invoiceData = [{...invoiceData, html: htmlString}];
            setLoading(true)
            const response = await sendInvoiceData(invoiceData);
            if (response.message === "success") {
                setOpenPreview(true)
            }
            await router.push("/")
        }
    }

    const handleClosePreview = async () => {
        setOpenPreview(false)
        setClickedOpenPreview(false)
    }

    const handleCustomerChange = async (value) => {
        const data = await getCustomer(value.value)
        setCustomer(data.data)
    }


    return (<>
        {loading && (<div className={globalStyle.loadingWave}>
            <div className={globalStyle.loadingBar}></div>
            <div className={globalStyle.loadingBar}></div>
            <div className={globalStyle.loadingBar}></div>
            <div className={globalStyle.loadingBar}></div>
        </div>)}
        {/*// <>*/}
        <div className={styles.invoiceHeaders}>
            <Radio.Group label={"Type"} defaultValue={"Invoice"} className={styles.blackRadio}
                         onChange={(value) => setDocumentType(value)}>
                <Radio value={"Invoice"} size={"sm"}>Invoice</Radio>
                <Radio value={"Quote"} size={"sm"}>Quote</Radio>
            </Radio.Group>
            <CustomInput
                isValid={true}
                className={styles.input}
                defaultValue={documentNumber ? documentNumber : ''}
                onChange={(value) => setDocumentNumber(value)}
                label={"Document Num"}
                placeholder={"Document Number"}
                type={"text"}
            />
            <CustomInput
                label={"Valid from"}
                isValid={true}
                defaultValue={validFrom}
                placeholder={"Valid from"}
                type={"date"}
                onChange={(value) => setValidFrom(value)}
            />
            <CustomInput
                label={"Valid until"}
                isValid={true}
                defaultValue={validUntil}
                placeholder={"Valid until"}
                type={"date"}
                onChange={(value) => setValidUntil(value)}
            />
            <SelectWithUnderline
                label={"Payment terms"}
                placeholder={"Payment terms"}
                options={TERMS_OPTIONS}
                value={paymentTerm}
                onChange={option => setPaymentTerm(option)}
                customStyles={styles.selectLabel}
            />
        </div>
        <div className={styles.customerInfo}>
            <SelectWithUnderline
                label={"Customer"}
                placeholder={"Customer"}
                options={customers}
                onChange={handleCustomerChange}
                customStyles={styles.selectLabel}
            />
            <CustomInput
                className={styles.input}
                isValid={true}
                defaultValue={customer ? customer.nip : ''}
                label={"NIP"}
                type={"text"}
            />
            <CustomInput
                className={styles.input}
                isValid={true}
                defaultValue={customer ? customer.address : ''}
                label={"Address"}
                type={"text"}
            />
            <CustomInput
                label={"Country"}
                placeholder={"Country"}
                isValid={true}
                defaultValue={customer ? customer.country : ''}
                customStyles={styles.selectLabel}
                className={styles.input}
            />
            <CustomInput className={styles.input}
                         isValid={true}
                         defaultValue={customer ? customer.city : ''}
                         label={"City"}
                         type={"text"}
            />
            <CustomInput className={styles.input}
                         isValid={true}
                         defaultValue={customer ? customer.postalCode : ''}
                         label={"Postcode"}
                         type={"text"}
            />

        </div>
        <div className={styles.items}>
            {summary &&
                <ProductTable summary={summary}
                              rows={rows}
                              addRow={addRow}
                              deleteSelectedRows={deleteSelectedRows}
                              handleInputChange={handleInputChange}
                              toggleRowSelection={toggleRowSelection}
                              selectAllRows={selectAllRows}
                              products={products}
                />}
            <PaymentActions bankAccount={companyDetails[0] ? companyDetails[0].bankAccountNumber : ''}
                            setCurrency={setCurrency}
                            currency={currency}
                            setPaymentMethod={setPaymentMethod}
                            leftToPay={summary.leftToPay}
                            setPaid={setPaid}
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
        {openPreview && <InvoicePreview handleClosePreview={handleClosePreview}>
            <div className={styles.previewInvoice} dangerouslySetInnerHTML={{__html: htmlString}}/>
        </InvoicePreview>
        }
        {showFillCompanyDataPopup && <WarningPopup type={"Error"}
                                                   handleClose={() => setShowFillCompanyDataPopup(false)}
                                                   actionMessage={"Please complete the company data fields or consult with your manager to do so before proceeding."}
                                                   message={"Without filled company data, invoice creation is not possible."}
        />}
        {showFillDataPopup && <WarningPopup
            actionMessage={"To create an invoice successfully, enter essential data like customer details and product descriptions."}
            message={"Invoice creation requires all necessary information to be properly filled in."}
            handleClose={() => {
                setShowFillDataPopup(false)
            }}
            type={"Error"}/>}
    </>)
}

export default CreateInvoiceForm;