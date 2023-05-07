import styles from "./createCategory.module.css";
import React from "react";


const SubCategoryHeaders = ({index, fieldId, subCategoryId, addSubcategory, deleteSubcategory}) => (
    <>
        {index === 0 && (
            <>
                <div className={styles.categoryHeaders}>
                    <h6>Subcategory Fields</h6>
                    <div className={styles.tableActionButtons}>
                        <button
                            onClick={() => addSubcategory(fieldId)}
                            aria-label={"Add subCategory"}>
                            Add
                        </button>
                        <button
                            onClick={() => deleteSubcategory(subCategoryId, fieldId)}
                            aria-label={"Delete subCategory"}>
                            Delete
                        </button>
                    </div>
                </div>
                <hr className={styles.hr}/>
            </>
        )}
    </>
);

export default SubCategoryHeaders;