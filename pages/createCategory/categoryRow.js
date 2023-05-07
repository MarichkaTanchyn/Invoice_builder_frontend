import React from 'react';
import CustomInput from "../components/util/input/customInput";
import {Checkbox} from "@nextui-org/react";
import SelectWithLabel from "../components/util/filter/selectWithLabel";
import DATATYPE_OPTIONS from "../components/data/dataTypes.json";
import OPTIONALITY_OPTIONS from "../components/data/optionality.json";
import styles from "./createCategory.module.css";

const CategoryRow = ({ field, showSubcategories, toggleSelectedCategory }) => (

    <tr>
        <td>
            <Checkbox checked={field.reg} onChange={() => toggleSelectedCategory(field.id)} />
        </td>
        <td>
            <CustomInput
                type="text"
                value={field.name}
                onChange={() => { }}
                placeholder="Enter name"
                className={styles.input}
            />
        </td>
        {!showSubcategories && (
            <>
                <td>
                    <SelectWithLabel options={DATATYPE_OPTIONS} onChange={() => { }} />
                </td>
                <td>
                    <SelectWithLabel options={OPTIONALITY_OPTIONS} onChange={() => { }} />
                </td>
            </>
        )}
    </tr>
);

export default CategoryRow;