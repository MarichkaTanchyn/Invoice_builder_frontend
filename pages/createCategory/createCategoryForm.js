import styles from './createCategory.module.css';
import React, {useState, useEffect} from 'react';
import CategoryRow from "./categoryRow";
import SubCategoryHeaders from "./subCategoryHeaders";
import CategoryHeaders from "./categoryHeaders";
import SubcategoryTable from "./subCategoryTable";

const CreateCategoryForm = ({showSubcategories}) => {
    const [categoryFields, setCategoryFields] = useState([
        {
            id: 1,
            name: "",
            dataType: "",
            optionality: "",
        },
    ]);

    const [subcategories, setSubcategories] = useState([
        {
            id: 1,
            categoryId: 1,
            reg: false,
            name: "",
            dataType: "",
            optionality: "",
        },
    ]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const addCategoryField = () => {
        const id = categoryFields.length + 1;
        setCategoryFields([...categoryFields, {id, name: "", dataType: "", optionality: ""}]);

        const newSubcategory = {
            id: subcategories.length + 1,
            categoryId: id,
            reg: false,
            name: "",
            dataType: "",
            optionality: "",
        };
        setSubcategories([...subcategories, newSubcategory]);
    };

    const deleteCategoryField = () => {
        if (selectedCategories.length > 0) {
            setCategoryFields(categoryFields.filter((field) => !selectedCategories.includes(field.id)));
            setSelectedCategories([]); // Reset the selected categories
        }
    }

    const toggleSelectedCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const addSubcategory = (categoryId) => {
        // Find the highest subcategory id associated with the current category
        const maxSubcategoryId = subcategories
            .filter((subcategory) => subcategory.categoryId === categoryId)
            .reduce((maxId, currentSubcategory) => {
                return Math.max(maxId, currentSubcategory.id);
            }, 0);

        const newSubcategory = {
            id: maxSubcategoryId + 1,
            categoryId,
            reg: false,
            name: "",
            dataType: "",
            optionality: "",
        };

        setSubcategories([...subcategories, newSubcategory]);
    };

    const deleteSubcategory = (subcategoryId, categoryId) => {
        const subcategoriesForCurrentCategory = subcategories.filter(
            (subcategory) => subcategory.categoryId === categoryId
        );

        if (subcategoriesForCurrentCategory.length > 1) {
            const updatedSubcategories = subcategories.filter(
                (subcategory) => subcategory.id !== subcategoryId
            );
            setSubcategories(updatedSubcategories);
        }
    }

    return (
        <>
            <CategoryHeaders addCategoryField={addCategoryField}
                             deleteCategoryField={deleteCategoryField}/>
            {categoryFields.map((field, index) => (
                <React.Fragment key={field.id}>
                    <table>
                        <thead>
                        {((!showSubcategories && index === 0) || showSubcategories) && (
                            <tr>
                                <th>REG</th>
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
                        />
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
                                                              index={index}/>
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
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </>
    );
}

export default CreateCategoryForm;