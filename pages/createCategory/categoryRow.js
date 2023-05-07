import React from 'react';
import CustomInput from "../components/util/input/customInput";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import DATATYPE_OPTIONS from "../components/data/dataTypes.json";
import OPTIONALITY_OPTIONS from "../components/data/optionality.json";
import styles from "./createCategory.module.css";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";

const CategoryRow = ({field, showSubcategories, toggleSelectedCategory, updateCategoryField}) => (

    <tr>
        <td>
            <div className={styles.checkBox} style={{marginRight:".8em"}}>
            <CheckboxWithLabel checked={field.reg}
                               onChange={() => toggleSelectedCategory(field.id)}
                               label={`#${field.id}`}/>
            </div>
        </td>
        <td>
            <CustomInput
                type="text"
                value={field.name}
                onChange={(value) => updateCategoryField(field.id, "name", value)}
                placeholder="Enter name"
                className={styles.input}
            />
        </td>
        {!showSubcategories && (
            <>
                <td>
                    <SelectWithLabel options={DATATYPE_OPTIONS}
                                     onChange={(selectedOption) => updateCategoryField(field.id, "dataType", selectedOption.value)}
                    />
                </td>
                <td>
                    <SelectWithLabel options={OPTIONALITY_OPTIONS}
                                     onChange={(selectedOption) => updateCategoryField(field.id, "optionality", selectedOption.value)}
                    />
                </td>
            </>
        )}
    </tr>
);

export default CategoryRow;