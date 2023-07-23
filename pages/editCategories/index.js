import withLayout from "../components/layout/withLayout";
import React, {useEffect, useState} from "react";
import {getCategoriesWithSubcategories} from "../api/categoriesApi";
import {useRouter} from "next/router";
import Card from "../components/util/card/card";
import Link from "next/link";
import styles from "../createCategory/createCategory.module.css";
import CustomInput from "../components/util/input/customInput";
import CheckboxWithLabel from "../components/util/filter/checkboxWithLabel";
import SubCategoryHeaders from "../createCategory/subCategoryHeaders";
import Button from "../components/util/button/button";


const EditCategories = () => {
    const [originalData, setOriginalData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [categoryFields, setCategoryFields] = useState({});
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const resp = await getCategoriesWithSubcategories();
        setOriginalData(resp.data);
        initCategoryFields(resp.data);
    }

    const initCategoryFields = (data) => {
        const categories = data.reduce((acc, curr) => ({
            ...acc,
            [curr.id]: {
                selected: false,
                name: curr.name,
                subcategories: curr.Subcategories.reduce((subAcc, subCurr) => ({
                    ...subAcc,
                    [subCurr.id]: {
                        selected: false,
                        name: subCurr.name
                    }
                }), {})
            }
        }), {});
        setSelectedCategories(categories);
        setCategoryFields(categories);
    }

    const updateCategoryField = (id, fieldName, value) => {
        setCategoryFields(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [fieldName]: value
            }
        }));
    };

    const toggleSelectedCategory = (id, subcategoryId = null) => {
        setSelectedCategories(prevState => {
            if (subcategoryId) {
                return {
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        subcategories: {
                            ...prevState[id].subcategories,
                            [subcategoryId]: {
                                ...prevState[id].subcategories[subcategoryId],
                                selected: !prevState[id].subcategories[subcategoryId].selected
                            }
                        }
                    }
                }
            } else {
                return {
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        selected: !prevState[id].selected
                    }
                }
            }
        });
    };

    const handleDeleteColumn = async (categoryId, subcategoryId = null) => {
        // Call to delete API
        await deleteCategory(categoryId, subcategoryId);
        fetchCategories();
    }

    const submitData = async () => {
        for(let categoryId in selectedCategories) {
            if(selectedCategories[categoryId].selected) {
                const categoryData = categoryFields[categoryId];
                // Call to edit API
                await editCategory(categoryId, categoryData);
            }
        }
        fetchCategories();
    }
    const onClick = async () => {
        await router.push("/");
    }

    return (
        <Card>
            <div>
                <Link href={"/"} passHref>
                    <div className={styles.backToInvoices}>
                        <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                        <button onClick={onClick} className={styles.buttonWithImg}>Back to Invoices</button>
                    </div>
                </Link>
                <div className={styles.headers}>
                    <h1>Edit Categories</h1>
                </div>
                <hr className={styles.hr}/>
                <div>
                    <h5>Categories</h5>
                    {originalData && originalData.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <table className={styles.categoryTable}>
                                <thead className={styles.categoryTableHeaders}>
                                {(index === 0) && (
                                    <tr>
                                        <th><CheckboxWithLabel label={"REG"}/>
                                        </th>
                                        <th>Name</th>
                                    </tr>
                                )}
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <div className={styles.checkBox} style={{marginRight: ".8em"}}>
                                            <CheckboxWithLabel checked={selectedCategories[field.id].selected}
                                                               onChange={() => toggleSelectedCategory(field.id)}
                                                               label={`#${index + 1}`}/>
                                        </div>
                                    </td>
                                    <td>
                                        <CustomInput
                                            type="text"
                                            defaultValue={categoryFields[field.id].name}
                                            onChange={(value) => updateCategoryField(field.id, "name", value)}
                                            placeholder="Enter name"
                                            className={styles.input}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={"/x.svg"}
                                            alt={"x"}
                                            className={index !== 0 ? styles.x : styles.xFirst}
                                            onClick={() => handleDeleteColumn(column)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {field.Subcategories.map((subCategory, subCategoryIndex) => (
                                            <tr key={subCategory.id}>
                                                <div style={{marginLeft: "2em"}}>
                                                    {(subCategoryIndex === 0) && (
                                                        <tr>
                                                            <th><CheckboxWithLabel label={"REG"}/>
                                                            </th>
                                                            <th>Name</th>
                                                        </tr>
                                                    )}
                                                    <td>
                                                        <div className={styles.checkBox} style={{marginRight: ".8em"}}>
                                                            <CheckboxWithLabel
                                                                checked={selectedCategories[field.id].subcategories[subCategory.id].selected}
                                                                onChange={() => toggleSelectedCategory(field.id, subCategory.id)}
                                                                label={`#${subCategoryIndex + 1}`}/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <CustomInput
                                                            type="text"
                                                            defaultValue={categoryFields[field.id].subcategories[subCategory.id].name}
                                                            onChange={(value) => updateCategoryField(field.id, "name", value)}
                                                            placeholder="Enter name"
                                                            className={styles.input}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={"/x.svg"}
                                                            alt={"x"}
                                                            className={index !== 0 ? styles.x : styles.xFirst}
                                                            onClick={() => handleDeleteColumn(column)}
                                                        />
                                                    </td>
                                                </div>
                                            </tr>
                                        ))}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.actionButtons}>
                    <div>
                        <Button label={"Cancel"} onClick={onClick}/>
                    </div>
                    <div className={styles.button}>
                        <Button label={"Submit"}
                                onClick={submitData}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )

}

export default withLayout(EditCategories);