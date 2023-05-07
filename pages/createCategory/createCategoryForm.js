import styles from './createCategory.module.css';
import React, {useState, useEffect} from 'react';
import CategoryRow from "./categoryRow";
import SubCategoryHeaders from "./subCategoryHeaders";
import CategoryHeaders from "./categoryHeaders";
import SubcategoryTable from "./subCategoryTable";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";

const CreateCategoryForm = ({
                                showSubcategories,
                                categoryFields,
                                subcategories,
                                addCategoryField,
                                deleteCategoryField,
                                addSubcategory,
                                deleteSubcategory,
                                toggleSelectedCategory,
                                updateSubcategoryField,
                                updateCategoryField,
                                selectAllCategories,
                                toggleSelectAllCategories,
                                selectAllSubcategories,
                                toggleSelectAllSubcategories,
                                toggleSelectedSubcategory,
                                selectedSubcategories
                            }) => {

    return (
        <>
            <CategoryHeaders addCategoryField={addCategoryField}
                             deleteCategoryField={deleteCategoryField}/>
            {categoryFields.map((field, index) => (
                <React.Fragment key={field.id}>
                    <table className={styles.categoryTable}>
                        <thead className={styles.categoryTableHeaders}>
                        {((!showSubcategories && index === 0) || showSubcategories) && (
                            <tr>
                                <th><CheckboxWithLabel label={"REG"}
                                                       checked={selectAllCategories}
                                                       onChange={toggleSelectAllCategories}/>
                                </th>
                                <th>Name</th>
                                {!showSubcategories && <th>Data type</th>}
                                {!showSubcategories && <th>Optionality</th>}
                            </tr>
                        )}
                        </thead>
                        <tbody>
                        <CategoryRow
                            field={field}
                            showSubcategories={showSubcategories}
                            toggleSelectedCategory={toggleSelectedCategory}
                            updateCategoryField={updateCategoryField}
                        />
                        <tr>
                            <td></td>
                            <td colSpan={showSubcategories ? 1 : 3}>
                                {showSubcategories &&
                                    subcategories
                                        .filter((subcategory) => subcategory.categoryId === field.id)
                                        .map((subcategory, index) => (
                                            <tr key={`subcat-${subcategory.id}`}>
                                                <td colSpan={showSubcategories ? 2 : 4}>
                                                    <SubCategoryHeaders addSubcategory={addSubcategory}
                                                                        deleteSubcategory={deleteSubcategory}
                                                                        index={index}
                                                                        fieldId={field.id}
                                                                        subCategoryId={subcategory.id}
                                                    />
                                                    <SubcategoryTable subCategoryId={subcategory.id}
                                                                      subCategoryName={subcategory.name}
                                                                      subCategoryReg={subcategory.reg}
                                                                      subcategory={subcategory}
                                                                      index={index}
                                                                      updateSubcategoryField={updateSubcategoryField}
                                                                      toggleSelectedSubcategory={toggleSelectedSubcategory}
                                                                      selectedSubcategories={selectedSubcategories}
                                                                      toggleSelectAllSubcategories={toggleSelectAllSubcategories}
                                                                      selectAllSubcategories={selectAllSubcategories}

                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                {showSubcategories && (
                                    <tr>
                                        <td colSpan={showSubcategories ? 3 : 4}>
                                            <hr/>
                                        </td>
                                    </tr>
                                )}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </>
    );
}

export default CreateCategoryForm;