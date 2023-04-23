import React from 'react';
import styles from './card.module.css';

const Card = ({ children }) => {
    return (
        <div className={styles.card}>
        <div className={styles.cardBody}>{children}</div>
        </div>
    );
}
export default Card;