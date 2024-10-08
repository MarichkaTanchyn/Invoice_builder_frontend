import styles from "./createCategory.module.css";
import React from "react";


const SubCategoryHeaders = ({index, fieldId, addSubcategory, deleteSubcategory}) => (
    <>
        {index === 0 && (
            <>
                <div className={styles.subCategoryHeaders}>
                    <h6></h6>
                    <div className={styles.tableActionButtons}>
                        <button
                            onClick={() => addSubcategory(fieldId)}
                            aria-label={"Add subCategory"}>
                            Add
                        </button>
                        <button
                            onClick={() => deleteSubcategory(fieldId)}
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