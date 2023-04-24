import React, {useState} from 'react';
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import SmallSelectWithUnderline from "../components/util/select/smallSelectWithUnderline";
import styles from "./createInvoice.module.css";
import ButtonWithImg from "../components/util/button/buttonWithImg";
import units from "../components/mocks/units.json";

const ProductTable = () => {
    const productOptions = [
        // Add your product options here
        {value: 'productA', label: 'Product A'},
        {value: 'productB', label: 'Product B'},
    ];

    const unitOptions = [
        // Add your unit options here
        {value: 'unitA', label: 'Unit A'},
        {value: 'unitB', label: 'Unit B'},
    ];

    const vatOptions = [
        // Add your VAT options here
        {value: 0, label: '0%'},
        {value: 5, label: '5%'},
        {value: 10, label: '10%'},
        {value: 20, label: '20%'},
    ];
    const [rows, setRows] = useState([
        {
            id: 1,
            product: productOptions[0].value,
            unit: unitOptions[0].value,
            amount: '0',
            unitPrice: '0.00',
            vat: vatOptions[0].value,
            netValue: '0.00',
            vatValue: '0.00',
            grossValue: '0.00',
            discount: '0',
        },
    ]);

    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            product: productOptions[0].value,
            unit: unitOptions[0].value,
            amount: '0',
            unitPrice: '0.00',
            vat: vatOptions[0].value,
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

    const handleInputChange = (id, field, value) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? {...row, [field]: value} : row
            )
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
            prevRows.map((row) => ({ ...row, checked: true }))
        );
    };

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

    const summary = calculateSummary();

    return (
        <>
            <h2>Items</h2>
            <hr/>
            <div className={styles.itemsActions}>
                <ButtonWithImg label={"Add"} imgSrc={"/add.svg"} alt={"add"} onClick={addRow}/>
                <ButtonWithImg label={"Delete"} imgSrc={"/bin.svg"} alt={"bin"} onClick={deleteSelectedRows}/>
                <ButtonWithImg label={"Select All"} imgSrc={"/selectAll.svg"} alt={"SelectAll"} onClick={selectAllRows}/>
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
                            <SelectWithUnderline
                                options={productOptions}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'product', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <SmallSelectWithUnderline
                                placeholder={"unit"}
                                options={units}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'unit', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <CustomInput
                                type={"number"}
                                value={row.amount}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'amount', e.target.value)
                                }
                                className={styles.itemsInput}
                            />
                        </td>
                        <td className={styles.tableDisabledInput}>{row.unitPrice}</td>
                        <td>
                            <SmallSelectWithUnderline
                                placeholder={"%"}
                                options={vatOptions}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'vat', e.target.value)
                                }
                                className={styles.itemsInput}
                            />
                        </td>
                        {/* You can calculate and display the netValue, vatValue, and grossValue here */}
                        <td className={styles.tableDisabledInput}>{row.netValue}</td>
                        <td className={styles.tableDisabledInput}>{row.vatValue}</td>
                        <td className={styles.tableDisabledInput}>{row.grossValue}</td>
                        <td>
                            <CustomInput
                                value={row.discount}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'discount', e.target.value)
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
                    <td >{summary.totalNetValue}</td>
                    <td>{summary.totalVatValue}</td>
                    <td>{summary.totalGrossValue}</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ProductTable;