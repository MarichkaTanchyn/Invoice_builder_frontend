import styles from "./filter.module.css";
import React from 'react';

const InputWithLabel = ({
                            label,
                            onChange,
                            inputType,
                            inputValue,
                        }) => {


    return (<>
            <label className={styles.checkboxContentLabel}>
                <span>{label}</span>
                <input className={styles.checkboxContentInput} type={inputType} value={inputValue} onChange={onChange}/>
            </label>
            <style jsx>{`
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                display: none;
              }
            `}</style>
        </>
    )
}
export default InputWithLabel