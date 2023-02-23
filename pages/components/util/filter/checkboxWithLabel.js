import styles from './filter.module.css'

const CheckboxWithLabel = ({
                               label,
                               checked,
                               onChange,
                           }) => {
    return (
        <label className={styles.filterOptionLabel} onClick={onChange}>
            <input
                className={styles.filterOptionInput}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    )
}

export default CheckboxWithLabel