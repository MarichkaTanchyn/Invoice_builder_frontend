import React, { useState } from 'react';
import CustomInput from "../components/util/input/customInput";
import SelectWithUnderline from "../components/util/select/selectWithUnderline";
import SmallSelectWithUnderline from "../components/util/select/smallSelectWithUnderline";
import styles from "./createInvoice.module.css";
import ButtonWithImg from "../components/util/button/buttonWithImg";


const ProductTable = () => {
      const productOptions = [
        // Add your product options here
        { value: 'productA', label: 'Product A' },
        { value: 'productB', label: 'Product B' },
      ];
    
      const unitOptions = [
        // Add your unit options here
        { value: 'unitA', label: 'Unit A' },
        { value: 'unitB', label: 'Unit B' },
      ];
    
      const vatOptions = [
        // Add your VAT options here
        { value: 0, label: '0%' },
        { value: 5, label: '5%' },
        { value: 10, label: '10%' },
        { value: 20, label: '20%' },
      ];
      const [rows, setRows] = useState([
        {
          id: 1,
          product: productOptions[0].value,
          unit: unitOptions[0].value,
          amount: '',
          unitPrice: '',
          vat: vatOptions[0].value,
          netValue: '',
          vatValue: '',
          grossValue: '',
          discount: '',
        },
      ]);
    
      const addRow = () => {
        const newRow = {
          id: rows.length + 1,
          product: '',
          unit: '',
          amount: '',
          unitPrice: '',
          vat: '',
          netValue: '',
          vatValue: '',
          grossValue: '',
          discount: '',
        };
        setRows((prevRows) => [...prevRows, newRow]);
      };
    
      const deleteSelectedRows = () => {
        const updatedRows = rows.filter((row) => !row.checked);
        setRows(updatedRows);
      };
    
      const handleInputChange = (id, field, value) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
          )
        );
      };
    
      const toggleRowSelection = (id) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, checked: !row.checked } : row
          )
        );
      };

      return (
        <>
        <h2>Items</h2>
            <hr/>
            <div className={styles.itemsActions}>
                <ButtonWithImg label={"Add"} imgSrc={"/add.svg"} alt={"add"} onClick={addRow}/>
                <ButtonWithImg label={"Delete"} imgSrc={"/bin.svg"} alt={"bin"} onClick={deleteSelectedRows}/>
            </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Unit</th>
                <th>Amount</th>
                <th>Unit Price</th>
                <th>VAT%</th>
                <th>Net Value</th>
                <th>VAT Value</th>
                <th>Gross Value</th>
                <th>Discount (%)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    {/* TODO: remake to checkbox librarary */}
                    <input
                      type="checkbox"
                      checked={row.checked || false}
                      onChange={() => toggleRowSelection(row.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
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
                        options={unitOptions}
                        onChange={(e) =>
                          handleInputChange(row.id, 'unit', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CustomInput
                        value={row.amount}
                        onChange={(e) =>
                          handleInputChange(row.id, 'amount', e.target.value)
                        }
                      />
                    </td>
                    <td>{row.unitPrice}</td>
                    <td>
                      <SmallSelectWithUnderline
                      placeholder={"vat%"}
                        options={vatOptions}
                        onChange={(e) =>
                          handleInputChange(row.id, 'vat', e.target.value)
                        }
                      />
                    </td>
                    {/* You can calculate and display the netValue, vatValue, and grossValue here */}
                    <td>{row.netValue}</td>
                    <td>{row.vatValue}</td>
                    <td>{row.grossValue}</td>
                    <td>
                      <CustomInput
                        value={row.discount}
                        onChange={(e) =>
                          handleInputChange(row.id, 'discount', e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      };
      
export default ProductTable;