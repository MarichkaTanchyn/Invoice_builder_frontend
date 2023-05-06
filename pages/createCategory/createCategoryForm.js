import styles from './createCategory.module.css';
import React, {useState, useEffect} from 'react';
import CustomInput from "../components/util/input/customInput";
import {Checkbox} from "@nextui-org/react";
import {ta} from "date-fns/locale";
import SelectWithLabel from "../components/util/filter/selectWithLabel";

const DATATYPE_OPTIONS = [
    {value: "String", label: "String"},
    {value: "Number", label: "Number"},
    {value: "Date", label: "Date"},
];

const OPTIONALITY_OPTIONS = [
    {value: "Mandatory", label: "Mandatory"},
    {value: "Optional", label: "Optional"},
];
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
            <div>
                <div className={styles.categoryHeaders}>
                    <h4>Category Fields</h4>
                    <div className={styles.tableActionButtons}>
                        <button onClick={addCategoryField}>Add</button>
                        <button onClick={deleteCategoryField}>Delete</button>
                    </div>
                </div>
                <hr className={styles.hr}/>
            </div>
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
                        <tr>
                            <td>
                                <Checkbox checked={field.reg} onChange={() => toggleSelectedCategory(field.id)}/>
                            </td>
                            <td>
                                <CustomInput
                                    type="text"
                                    value={field.name}
                                    onChange={() => {
                                    }}
                                    placeholder="Enter name"
                                    className={styles.input}
                                />
                            </td>
                            <td>
                                {!showSubcategories &&
                                    <SelectWithLabel options={DATATYPE_OPTIONS} onChange={() => {
                                    }}/>
                                }
                            </td>
                            <td>
                                {!showSubcategories &&
                                    <SelectWithLabel options={OPTIONALITY_OPTIONS} onChange={() => {
                                    }}/>
                                }
                            </td>
                        </tr>
                        {showSubcategories &&
                            subcategories
                                .filter((subcategory) => subcategory.categoryId === field.id)
                                .map((subcategory, index) => (
                                    <tr key={`subcat-${subcategory.id}`}>
                                        <td colSpan={showSubcategories ? 2 : 4}>
                                            {index === 0 && (
                                                <>
                                                    <div className={styles.categoryHeaders}>
                                                        <h6>Subcategory Fields</h6>
                                                        <div className={styles.tableActionButtons}>
                                                            <button onClick={() => addSubcategory(field.id)}>
                                                                Add
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    deleteSubcategory(subcategory.id, field.id)
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <hr className={styles.hr}/>
                                                </>
                                            )}
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
                                                <tr key={subcategory.id}>
                                                    <td>
                                                        <Checkbox checked={subcategory.reg} onChange={() => {
                                                        }}/>
                                                    </td>
                                                    <td>
                                                        <CustomInput
                                                            type="text"
                                                            value={subcategory.name}
                                                            onChange={() => {
                                                            }}
                                                            placeholder="Enter name"
                                                            className={styles.input}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectWithLabel options={DATATYPE_OPTIONS}/>
                                                    </td>
                                                    <td>
                                                        <SelectWithLabel options={OPTIONALITY_OPTIONS} onChange={() => {
                                                        }}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ))}
                        {showSubcategories && (
                            <tr>
                                <td colSpan={showSubcategories ? 3 : 4}>
                                    <hr/>
                                </td>
                            </tr>
                        )
                        }

                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </>
    );
}

export default CreateCategoryForm;