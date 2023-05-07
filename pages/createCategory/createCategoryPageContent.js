import styles from "./createCategory.module.css";
import CustomInput from "../components/util/input/customInput";
import {Switch} from "@nextui-org/react";
import CreateCategoryForm from "./createCategoryForm";
import Button from "../components/util/button/button";
import React, {useState} from "react";
import {createCategories} from "../api/categoriesApi";

const CreateCategoryPageContent = () => {
    const [selectAllCategories, setSelectAllCategories] = useState(false);
    const [selectAllSubcategories, setSelectAllSubcategories] = useState(false);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [showSubcategories, setShowSubcategories] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [vat, setVat] = useState("");
    const toggleSubcategories = () => {
        setShowSubcategories(!showSubcategories);
    };
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

        // Update selectAllCategories state
        if (selectAllCategories) {
            setSelectAllCategories(false);
        }
    };

    const deleteCategoryField = () => {
        if (selectedCategories.length > 0) {
            setCategoryFields(categoryFields.filter((field) => !selectedCategories.includes(field.id) || field.id === 1));
            setSelectedCategories([]); // Reset the selected categories
        }
    }

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

        // Update selectAllSubcategories state
        if (selectAllSubcategories) {
            setSelectAllSubcategories(false);
        }
    };

    const deleteSubcategory = (categoryId) => {
        const subcategoriesForCurrentCategory = subcategories.filter(
            (subcategory) => subcategory.categoryId === categoryId
        );

        // Prevent deletion if there's only one subcategory left
        if (subcategoriesForCurrentCategory.length > 1) {
            const updatedSubcategories = subcategories.filter(
                (subcategory) =>
                    !(subcategory.categoryId === categoryId &&
                        selectedSubcategories.some(
                            (selected) =>
                                selected.id === subcategory.id &&
                                selected.categoryId === subcategory.categoryId
                        ))
            );
            setSubcategories(updatedSubcategories);

            // Remove the deleted subcategories from the selectedSubcategories
            setSelectedSubcategories(
                selectedSubcategories.filter(
                    (selected) =>
                        !(selected.categoryId === categoryId && subcategoriesForCurrentCategory.some(sc => sc.id === selected.id))
                )
            );
        }
    };

    const updateCategoryField = (fieldId, fieldName, fieldValue) => {
        const updatedCategoryFields = categoryFields.map((cf) =>
            cf.id === fieldId ? {...cf, [fieldName]: fieldValue} : cf
        );
        setCategoryFields(updatedCategoryFields);
    };

    const updateSubcategoryField = (subcategoryId, fieldName, fieldValue) => {
        const updatedSubcategories = subcategories.map((sc) =>
            sc.id === subcategoryId ? {...sc, [fieldName]: fieldValue} : sc
        );
        setSubcategories(updatedSubcategories);
    };

    const handleSelectAllCategories = () => {
        setSelectAllCategories(!selectAllCategories);
        if (!selectAllCategories) {
            setSelectedCategories(categoryFields.map((field) => field.id));
            setCategoryFields(categoryFields.map((field) => ({...field, reg: true})));
        } else {
            setSelectedCategories([]);
            setCategoryFields(categoryFields.map((field) => ({...field, reg: false})));
        }
    };

    const handleSelectAllSubcategories = (categoryId, checked) => {
        setSubcategories(
            subcategories.map((subcategory) => {
                if (subcategory.categoryId === categoryId) {
                    return {...subcategory, reg: checked};
                } else {
                    return subcategory;
                }
            })
        );
    };
    const toggleSelectedCategory = (categoryId) => {
        const updatedCategoryFields = categoryFields.map((field) => {
            if (field.id === categoryId) {
                return {...field, reg: !field.reg};
            }
            return field;
        });

        setCategoryFields(updatedCategoryFields);

        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const toggleSelectedSubcategory = (subcategory) => {
        const subcategoryId = subcategory.id;
        const categoryId = subcategory.categoryId;

        if (
            selectedSubcategories.some(
                (selected) =>
                    selected.id === subcategoryId && selected.categoryId === categoryId
            )
        ) {
            setSelectedSubcategories(
                selectedSubcategories.filter(
                    (selected) =>
                        !(selected.id === subcategoryId && selected.categoryId === categoryId)
                )
            );
        } else {
            setSelectedSubcategories([
                ...selectedSubcategories,
                {id: subcategoryId, categoryId},
            ]);
        }

        // Toggle the subcategory.reg property to keep the checkbox state consistent
        setSubcategories(
            subcategories.map((currentSubcategory) => {
                if (
                    currentSubcategory.id === subcategoryId &&
                    currentSubcategory.categoryId === categoryId
                ) {
                    return {...currentSubcategory, reg: !currentSubcategory.reg};
                }
                return currentSubcategory;
            })
        );
    };

    const params = {
        CompanyId: 1
    }

    const submitData = async () => {
        // Format the data into the desired structure
        const categoriesData = {
            withSubcategories: showSubcategories,
            categories: categoryFields.map((category) => ({
                ...category,
                subcategories: subcategories.filter((subcategory) => subcategory.categoryId === category.id),
            })),
        };
        console.log(categoriesData);
        await createCategories(categoriesData , params.CompanyId);
    };

    return (
        <div className={styles.content}>
            <div>
                <div className={styles.subCategoriesSwitch}>
                    <label>Subcategories</label>
                    <Switch
                        size={"sm"}
                        squared
                        color="primary"
                        checked={showSubcategories}
                        onChange={toggleSubcategories}
                    >
                        Squared option
                    </Switch>
                </div>
                <CreateCategoryForm showSubcategories={showSubcategories}
                                    addSubcategory={addSubcategory}
                                    addCategoryField={addCategoryField}
                                    categoryFields={categoryFields}
                                    subcategories={subcategories}
                                    toggleSelectedCategory={toggleSelectedCategory}
                                    deleteCategoryField={deleteCategoryField}
                                    deleteSubcategory={deleteSubcategory}
                                    updateCategoryField={updateCategoryField}
                                    updateSubcategoryField={updateSubcategoryField}
                                    selectAllCategories={selectAllCategories}
                                    toggleSelectAllCategories={handleSelectAllCategories}
                                    selectAllSubcategories={selectAllSubcategories}
                                    toggleSelectAllSubcategories={handleSelectAllSubcategories}
                                    toggleSelectedSubcategory={toggleSelectedSubcategory}
                />
            </div>
            <div className={styles.actionButtons}>
                <div className={styles.button}>
                    <Button label={"Save"} onClick={submitData}></Button>
                </div>
                <div>
                    <Button label={"Cancel"}></Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryPageContent;