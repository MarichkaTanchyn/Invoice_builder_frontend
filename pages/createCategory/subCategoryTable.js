import React from 'react';
import styles from "./createCategory.module.css";

import CustomInput from "../components/util/input/customInput";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";

const SubcategoryTable = ({
                              index,
                              subcategory,
                              subCategoryId,
                              subCategoryReg,
                              subCategoryName,
                              updateSubcategoryField,
                              toggleSelectedSubcategory,
                              selectAllSubcategories,
                              toggleSelectAllSubcategories
                          }) => (
    <table className={styles.subcategoryTable}>
        <thead className={styles.subcategoryTableHeaders}>
        {index === 0 && (
            <tr>
                <th>
                    <CheckboxWithLabel checked={selectAllSubcategories}
                                       onChange={(e) => toggleSelectAllSubcategories(subCategoryId, e.target.checked)}
                                       label={"REG"}/>
                </th>
                <th>Name</th>
            </tr>
        )}
        </thead>
        <tbody>
        <tr className={styles.subcategoryTableFields} key={subCategoryId}>
            <td>
                <div className={styles.checkBox}>
                    <CheckboxWithLabel checked={subCategoryReg}
                                       label={`#${index + 1}`}
                                       onChange={() => toggleSelectedSubcategory(subcategory)}/>
                </div>
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
        </tr>
        </tbody>
    </table>
);

export default SubcategoryTable;