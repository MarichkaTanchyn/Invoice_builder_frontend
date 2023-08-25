import React from "react";
import styles from './button.module.css'

const Button = ({label, onClick, className}) => {

    const mergedClassName = `${styles.button} ${className}`

    return (
        <button onClick={onClick} className={mergedClassName}>{label}</button>
    )
}

export default Button;