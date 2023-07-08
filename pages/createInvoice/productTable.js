import React, {useState, useEffect} from 'react';
import CustomInput from "../components/util/input/customInput";
import SmallSelectWithUnderline from "../components/util/select/smallSelectWithUnderline";
import styles from "./createInvoice.module.css";
import ButtonWithImg from "../components/util/button/buttonWithImg";
import units from "../components/data/units.json";
import PaymentActions from "./paymentActions";
import { Cascader } from 'antd';
import {getProduct} from "../api/productsApi";


const ProductTable = ({
                          summary,
                          rows,
                          addRow,
                          deleteSelectedRows,
                          handleInputChange,
                          toggleRowSelection,
                          selectAllRows,
                          products,
                      }) => {


    const vatOptions = [
        // Add your VAT options here
        {value: 0, label: '0%'},
        {value: 5, label: '5%'},
        {value: 10, label: '10%'},
        {value: 20, label: '20%'},
        {value: 23, label: '23%'},
    ];

    const handleCascadeChange = async (value, selectedOptions) => {
        console.log(value, selectedOptions);

        const lastObject = getLastChild(selectedOptions);

        console.log(lastObject);

        if (lastObject.type !== "product") {
            //deselect value
        } else {
            rows[rows.length - 1].id = lastObject.value;
            rows[rows.length - 1].product = await getProduct(lastObject.value)
            rows[rows.length - 1].unitPrice = rows[rows.length - 1].product.price;

            rows[rows.length - 1].selectedProduct = value;
            handleInputChange(rows[rows.length - 1].id, 'unitPrice', rows[rows.length - 1].unitPrice)
        }

    };

    function getLastChild(arr) {
        // Get the last element of the array
        const last = arr[arr.length - 1];

        // If it has children, recursively call this function again
        if (last.children && last.children.length > 0) {
            return getLastChild(last.children);
        } else {
            // If it doesn't have children, return the element
            return last;
        }
    }


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
                        <td style={{textAlign: 'center'}}>
                            <div className={styles.container}>
                                {products &&  <Cascader
                                    className={styles.selectProduct}
                                    options={products}
                                    value={row.selectedProduct}
                                    onChange={(value, selectedOptions) => handleCascadeChange(value, selectedOptions, index)}
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
                                defaultValue={row.amount}
                                onChange={(value) =>
                                    handleInputChange(row.id, 'amount', value)
                                }
                                className={styles.itemsInput}
                            />
                        </td>
                        <td className={styles.tableDisabledInput}>{row.unitPrice}
                            <hr/>
                        </td>
                        <td>
                            <SmallSelectWithUnderline
                                placeholder={"%"}
                                options={vatOptions}
                                value={vatOptions.find((option) => option.value === parseInt(row.vat))}
                                onChange={(e) =>
                                    handleInputChange(row.id, 'vat', e.value)
                                }
                                className={styles.itemsInput}
                            />
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
        </>
    );
};

export default ProductTable;