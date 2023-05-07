import styles from "./createCategory.module.css";
import CustomInput from "../components/util/input/customInput";
import {Switch} from "@nextui-org/react";
import CreateCategoryForm from "./createCategoryForm";
import Button from "../components/util/button/button";
import React, {useState} from "react";

const CreateCategoryPageContent = () => {

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
    };

    const deleteCategoryField = () => {
        if (selectedCategories.length > 0) {
            setCategoryFields(categoryFields.filter((field) => !selectedCategories.includes(field.id)));
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

    const updateCategoryField = (fieldId, fieldName, fieldValue) => {
        const updatedCategoryFields = categoryFields.map((cf) =>
            cf.id === fieldId ? { ...cf, [fieldName]: fieldValue } : cf
        );
        setCategoryFields(updatedCategoryFields);
    };

    const updateSubcategoryField = (subcategoryId, fieldName, fieldValue) => {
        const updatedSubcategories = subcategories.map((sc) =>
            sc.id === subcategoryId ? { ...sc, [fieldName]: fieldValue } : sc
        );
        setSubcategories(updatedSubcategories);
    };

    const toggleSelectedCategory = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };


    const submitData = async () => {
        // Format the data into the desired structure
        const dataToSend = {
            withSubcategories: showSubcategories,
            name: categoryName,
            vat: vat,
            categories: categoryFields.map((category) => ({
                ...category,
                subcategories: subcategories.filter((subcategory) => subcategory.categoryId === category.id),
            })),
        };
        console.log(dataToSend);
    };

    return (
        <div className={styles.content}>
            <div className={styles.inputContainer}>
                <div>
                    <CustomInput label={"Name"}
                                 type={"text"}
                                 placeholder="Add a descriptive name..."
                                 className={styles.categoryNameInput}
                                 value={categoryName}
                                 onChange={(value) => setCategoryName(value)}
                    />
                </div>
                <div>
                    <CustomInput label={"Vat(%)"}
                                 placeholder=""
                                 type={"text"}
                                 className={styles.input}
                                 value={vat}
                                 onChange={(value) => setVat(value)}
                    />
                    <span style={{color: "#AFAFAF"}}>
                                * this will be default vat for all products in category,<br/>
                                can be changed in invoice creating process
                            </span>
                </div>
            </div>
            <div className={styles.subCategories}>
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
            />
            <div>
                <Button label={"Cancel"}></Button>
                <Button label={"Save"} onClick={submitData}></Button>
            </div>
        </div>
    )
}

export default CreateCategoryPageContent;