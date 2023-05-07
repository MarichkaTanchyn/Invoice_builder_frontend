import React from 'react';
import CustomInput from "../components/util/input/customInput";
import styles from "./createCategory.module.css";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";

const CategoryRow = ({field,toggleSelectedCategory, updateCategoryField}) => (

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
    </tr>
);

export default CategoryRow;