import withLayout from "../../components/layout/withLayout";
import React, {useCallback, useEffect, useState} from "react";
import {deleteCategory, getCategoriesWithSubcategories, updateCategory} from "../api/categoriesApi";
import {useRouter} from "next/router";
import Card from "../../components/util/card/card";
import Link from "next/link";
import styles from "../createCategory/createCategory.module.css";
import CustomInput from "../../components/util/input/customInput";
import Button from "../../components/util/button/button";
import ConfirmationDialog from "../../components/util/confirmationDialog/confirmationDialog";
import _ from 'lodash';


const EditCategories = () => {
    const router = useRouter();

    const [originalData, setOriginalData] = useState([]);
    const [categoryFields, setCategoryFields] = useState({});
    const [subCategoryFields, setSubCategoryFields] = useState({});
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showConfirmationDialogBeforeCategoryDelete, setShowConfirmationDialogBeforeCategoryDelete] = useState(false);

    const formatData = useCallback((data) => {
        return data.reduce((acc, curr) => ({
            ...acc,
            [curr.id]: {
                name: curr.name,
                subcategories: curr.Subcategories.reduce((subAcc, subCurr) => ({
                    ...subAcc,
                    [subCurr.id]: {
                        name: subCurr.name
                    }
                }), {})
            }
        }), {});
    }, []);

    const fetchCategories = useCallback(async () => {
        const resp = await getCategoriesWithSubcategories();
        const categories = formatData(resp.data)
        setOriginalData(resp.data);
        setCategoryFields(categories);
    }, [formatData]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const updateCategoryField = useCallback((id, value) => {
        setCategoryFields(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                name: value
            }
        }));
    }, []);

    const updateSubCategoryField = useCallback((categoryId, subCategoryId, value) => {
        setSubCategoryFields(prevState => ({
            ...prevState,
            [subCategoryId]: {
                categoryId,
                name: value
            }
        }));
    }, []);

    const handleDeleteColumn = useCallback((category) => {
        setShowConfirmationDialogBeforeCategoryDelete(true);
        setCategoryToDelete(category);
    }, []);

    const onConfirmDeleteCategory = useCallback(async () => {
        await deleteCategory(categoryToDelete.id);
        fetchCategories();
        setCategoryToDelete(null);
        setShowConfirmationDialogBeforeCategoryDelete(false);
    }, [categoryToDelete, fetchCategories]);

    const onCancelDeleteCategory = useCallback(() => {
        setCategoryToDelete(null);
        setShowConfirmationDialogBeforeCategoryDelete(false);
    }, []);

    // Submit Data
    const submitData = useCallback(async () => {
        const formattedOriginalData = formatData(originalData)

        const changedCategories = Object.entries(categoryFields).reduce((acc, [id, value]) => {
            if (!_.isEqual(value, formattedOriginalData[id])) {
                acc[id] = value;
            }
            return acc;
        }, {});

        for (const [id, data] of Object.entries(subCategoryFields)) {
            await updateCategory(id, data);
        }

        for (const [id, data] of Object.entries(changedCategories)) {
            await updateCategory(id, data);
        }

        await handleClick()
    }, [categoryFields, subCategoryFields, fetchCategories]);

    const handleClick = useCallback(async () => {
        await router.push("/");
    }, [router]);

    return (
        <Card>
            <div>
                <Link href={"/"} passHref>
                    <div className={styles.backToInvoices}>
                        <img className={styles.img} src="/arrowLeft.svg" alt={"arrowBack"}/>
                        <button onClick={handleClick} className={styles.buttonWithImg}>Back to Invoices</button>
                    </div>
                </Link>
                <div className={styles.headers}>
                    <h1>Edit Categories</h1>
                </div>
                <hr className={styles.hr}/>
                <div>
                    <h5 className={styles.header}>Categories</h5>
                    {originalData && originalData.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <table className={styles.categoryTable}>
                                <thead className={styles.categoryTableHeaders}>
                                {(index === 0) && (
                                    <tr className={styles.categoryTableHeaders}>
                                        <th><span>REG</span> <span style={{marginLeft: '1.5em'}}>Name</span></th>
                                    </tr>

                                )}
                                </thead>
                                <tbody>
                                <tr>
                                    <div>
                                        <td>
                                            <span className={styles.spanBox}>#{index + 1}</span>
                                        </td>
                                        <td>
                                            <CustomInput
                                                type="text"
                                                defaultValue={categoryFields[field.id].name}
                                                onChange={(value) => updateCategoryField(field.id, value)}
                                                placeholder="Enter name"
                                                className={styles.input}
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src={"/x.svg"}
                                                alt={"x"}
                                                className={styles.x}
                                                onClick={() => handleDeleteColumn(field)}
                                            />
                                        </td>
                                    </div>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {field.Subcategories.map((subCategory, subCategoryIndex) => (
                                            <tr key={subCategory.id}>
                                                <div style={{marginLeft: "2em"}}>
                                                    {(subCategoryIndex === 0) && (
                                                        <tr className={styles.categoryTableHeaders}>
                                                            <th><span>REG</span></th>
                                                            <th>Name</th>
                                                        </tr>
                                                    )}
                                                    <td>
                                                        <span className={styles.spanBox}>#{subCategoryIndex + 1}</span>
                                                    </td>
                                                    <td>
                                                        <CustomInput
                                                            type="text"
                                                            defaultValue={categoryFields[field.id].subcategories[subCategory.id].name}
                                                            onChange={(value) => updateSubCategoryField(field.id, subCategory.id, value)}
                                                            placeholder="Enter name"
                                                            className={styles.input}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={"/x.svg"}
                                                            alt={"x"}
                                                            className={styles.x}
                                                            onClick={() => handleDeleteColumn(subCategory.id)}
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
                        <Button label={"Cancel"} onClick={handleClick}/>
                    </div>
                    <div className={styles.button}>
                        <Button label={"Submit"}
                                onClick={submitData}
                        />
                    </div>
                </div>
                {showConfirmationDialogBeforeCategoryDelete && <ConfirmationDialog type={'Delete'}
                                                                                   onCancel={onCancelDeleteCategory}
                                                                                   onAgree={onConfirmDeleteCategory}
                                                                                   message={`Confirm deletion of "${categoryToDelete.name}" ? Please note that this action will also erase any associated subcategories.`}
                                                                                   header={'Delete Category'}
                />}
            </div>
        </Card>
    )

}

export default withLayout(EditCategories);