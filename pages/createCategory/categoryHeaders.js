import React from 'react';
import styles from "./createCategory.module.css";

const CategoryHeaders = ({ addCategoryField, deleteCategoryField }) => (
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
);

export default CategoryHeaders;