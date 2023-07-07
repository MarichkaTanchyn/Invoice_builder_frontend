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
import { Cascader } from 'antd';


const ProductTable = ({
                          summary,
                          rows,
                          addRow,
                          deleteSelectedRows,
                          handleInputChange,
                          toggleRowSelection,
                          selectAllRows,
    products
                      }) => {
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

    const handleCascadeChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
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
                                {products && <Cascader
                                    options={products}
                                    onChange={handleCascadeChange}
                                    placeholder="Please select"
                                    showSearch
                                />}

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