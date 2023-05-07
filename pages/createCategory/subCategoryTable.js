import React from 'react';
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import styles from "./createCategory.module.css";
import CategoryHeaders from "./categoryHeaders";
import CategoryRow from "./categoryRow";
import DATATYPE_OPTIONS from "../components/data/dataTypes.json";
import OPTIONALITY_OPTIONS from "../components/data/optionality.json";
import {Checkbox} from "@nextui-org/react";
import CustomInput from "../components/util/input/customInput";

const SubcategoryTable = ({ index, subCategoryId, subCategoryReg, subCategoryName, updateSubcategoryField}) => (
    <table>
        <thead>
        {index === 0 && (
            <tr>
                <th>REG</th>
                <th>Name</th>
                <th>Data type</th>
                <th>Optionality</th>
            </tr>
        )}
        </thead>
        <tbody>
        <tr key={subCategoryId}>
            <td>
                <Checkbox checked={subCategoryReg} onChange={() => {
                }}/>
            </td>
            <td>
                <CustomInput
                    type="text"
                    value={subCategoryName}
                    onChange={(value) => updateSubcategoryField(subCategoryId, "name", value)}
                    placeholder="Enter name"
                    className={styles.input}
                />
            </td>
            <td>
                <SelectWithLabel options={DATATYPE_OPTIONS}
                                 onChange={(selectedOption) => updateSubcategoryField(subCategoryId, "dataType", selectedOption.value)}/>
            </td>
            <td>
                <SelectWithLabel options={OPTIONALITY_OPTIONS}
                                 onChange={(selectedOption) => updateSubcategoryField(subCategoryId, "optionality", selectedOption.value)}/>
            </td>
        </tr>
        </tbody>
    </table>
);

export default SubcategoryTable;