import React from 'react';
import styles from "./button.module.css"

const ButtonWithImg = ({imgSrc, alt, label, onClick}) => {
    return (
        <div className={styles.buttonBox}>
            <img className={styles.img} src={imgSrc} alt={alt}/>
            <button onClick={onClick} className={styles.buttonWithImg}>{label}</button>
        </div>
    )
}

export default ButtonWithImg;