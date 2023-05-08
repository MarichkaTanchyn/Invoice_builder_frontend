import React from 'react';
import styles from './card.module.css';

const Card = ({ children, customStyle}) => {

    const mergedClassNames = `${styles.card} ${customStyle}`;

    return (
        <div className={mergedClassNames}>
        <div className={styles.cardBody}>{children}</div>
        </div>
    );
}
export default Card;