import React, {useState, useEffect} from 'react';
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import SmallSelectWithUnderline from "../components/util/select/smallSelectWithUnderline";
import styles from "./createInvoice.module.css";
import ButtonWithImg from "../components/util/button/buttonWithImg";
import units from "../components/data/units.json";
import PaymentActions from "./paymentActions";
import ProductSelect from "../components/util/select/productSelect";
import productsMock from "..//components/mock/products.json";

const ProductTable = () => {
    const productOptions = productsMock.map(product => ({
        value: product.name,
        label: product.name,
        unit: product.unit,
        unitPrice: product.unitPrice,
        vat: product.vat
    }));

    const vatOptions = [
        // Add your VAT options here
        {value: 0, label: '0%'},
        {value: 5, label: '5%'},
        {value: 10, label: '10%'},
        {value: 20, label: '20%'},
        {value: 23, label: '23%'},
    ];
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

    const deleteSelectedRows = () => {
        const selectedRows = rows.filter((row) => row.checked);

        if (selectedRows.length === rows.length) {
            setRows([rows[0]]);
        } else {
            setRows((prevRows) => prevRows.filter((row) => !row.checked));
        }
    };

    const validateInputValue = (inputValue) => {
        const regex = /^[0-9.]*$/;
        if (!regex.test(inputValue)) {
            return inputValue.slice(0, -1); // removes last digit
        } else {
            return inputValue;
        }
    }

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
                    const updatedRow = { ...row, [field]: value, ...productData };

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

    const [summary, setSummary] = useState({
        totalAmount: 0,
        totalNetValue: 0,
        totalVatValue: 0,
        totalGrossValue: 0,
    });

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


    return (
        <>
            <h2>Items</h2>
            <hr/>
            <div className={styles.itemsActions}>
                <ButtonWithImg label={"Add"} imgSrc={"/add.svg"} alt={"add"} onClick={addRow}/>
                <ButtonWithImg label={"Delete"} imgSrc={"/bin.svg"} alt={"bin"} onClick={deleteSelectedRows}/>
                <ButtonWithImg label={"Select All"} imgSrc={"/selectAll.svg"} alt={"SelectAll"}
                               onClick={selectAllRows}/>
            </div>
            <table className={styles.table}>
                <thead className={styles.tableHeaders}>
                <tr>
                    <th>Num</th>
                    <th>Product</th>
                    <th>Unit</th>
                    <th>Amount</th>
                    <th>Unit Price</th>
                    <th>VAT%</th>
                    <th>Net Value</th>
                    <th>VAT Value</th>
                    <th>Gross Value</th>
                    <th>Discount (%)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id}>
                        <td>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    className={styles.checkboxInput}
                                    checked={row.checked || false}
                                    onChange={() => toggleRowSelection(row.id)}
                                />
                                <span>{index + 1}</span>
                            </label>
                        </td>
                        <td>
                            <div className={styles.select}>
                            <ProductSelect
                                options={productOptions}
                                onChange={(e) => {
                                    const selectedProduct = productOptions.find(
                                        (option) => option.value === e.value
                                    );
                                    handleInputChange(row.id, 'product', e.value, selectedProduct);
                                }}
                            />
                            </div>
                        </td>
                        <td>
                            <div className={styles.select}>
                            <SmallSelectWithUnderline
                                placeholder={"unit"}
                                value={units.find((option) => option.value === row.unit)}
                                options={units}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'unit', e.value)
                                }
                            />
                            </div>
                        </td>
                        <td>
                            <CustomInput
                                type={"number"}
                                value={row.amount}
                                onChange={(value) =>
                                    handleInputChange(row.id, 'amount', value)
                                }
                                className={styles.itemsInput}
                                placeholder={"1"}
                            />
                        </td>
                        <td className={styles.tableDisabledInput}>{row.unitPrice}
                            <hr/>
                        </td>
                        <td>
                            <div className={styles.select}>
                            <SmallSelectWithUnderline
                                placeholder={"%"}
                                options={vatOptions}
                                value={vatOptions.find((option) => option.value === row.vat)}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'vat', e.value)
                                }
                                className={styles.itemsInput}
                            />
                            </div>
                        </td>
                        <td className={styles.tableDisabledInput}>{row.netValue}
                            <hr/>
                        </td>

                        <td className={styles.tableDisabledInput}>{row.vatValue}
                            <hr/>
                        </td>
                        <td className={styles.tableDisabledInput}>{row.grossValue}
                            <hr/>
                        </td>
                        <td>
                            <CustomInput
                                value={row.discount}
                                onChange={(value) =>
                                    handleInputChange(row.id, 'discount', value)
                                }
                                className={styles.itemsInput}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot className={styles.tableFooters}>
                <tr>
                    <td>Summary</td>
                    <td></td>
                    <td></td>
                    <td>{summary.totalAmount}</td>
                    <td></td>
                    <td></td>
                    <td>{summary.totalNetValue}</td>
                    <td>{summary.totalVatValue}</td>
                    <td>{summary.totalGrossValue}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
            <PaymentActions totalGrossValue={summary.totalGrossValue}/>
        </>
    );
};

export default ProductTable;