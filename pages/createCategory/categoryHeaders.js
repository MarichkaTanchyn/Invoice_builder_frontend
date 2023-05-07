import React from 'react';
import styles from "./createCategory.module.css";

const CategoryHeaders = ({ addCategoryField, deleteCategoryField }) => (
    <div style={{width: "50em"}}>
        <div className={styles.categoryHeaders}>
            <h4>Categories</h4>
            <div className={styles.tableActionButtons}>
                <button aria-label={"Add category"} onClick={addCategoryField}>Add</button>
                <button aria-label={"Delete category"} onClick={deleteCategoryField}>Delete</button>
            </div>
        </div>
        <hr className={styles.hr}/>
    </div>
);

export default CategoryHeaders;