import React, {useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";

const Filter = () => {

    const [useDateRange, setUseDateRange] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [useTotalAmountDue, setUseTotalAmountDue] = useState(false);
    const [fromTotalAmountDue, setFromTotalAmountDue] = useState(null)
    const [toTotalAmountDue, setToTotalAmountDue] = useState(null)


    const handleDateRangeCheckboxChange = (event) => {
        setUseDateRange(event.target.checked);
    };
    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const handleTotalAmountDueRangeCheckboxChange = (event) => {
        setUseTotalAmountDue(event.target.checked);
    };
    const handleFromTotalAmountDueChange = (event) => {
        setFromTotalAmountDue(event.target.value);
    };

    const handleToTotalAmountDueChange = (event) => {
        setToTotalAmountDue(event.target.value);
    };


    // TODO: filter by created user, status

    return (
        <>
            <Popup>
                <div className={styles.filterOptionBox}>
                    <label className={styles.filterOptionLabel} onClick={handleDateRangeCheckboxChange}>
                        <input className={styles.filterOptionInput} type="checkbox" checked={useDateRange} onChange={handleDateRangeCheckboxChange}/>
                        Date Range
                    </label>
                    {useDateRange && (
                        <div className={styles.checkboxContent}>
                            <label className={styles.checkboxContentLabel}>
                                From
                                <input className={styles.checkboxContentInput} type="date" value={fromDate} onChange={handleFromDateChange}/>
                            </label>
                            <label>
                                To
                                <input className={styles.checkboxContentInput} type="date" value={toDate} onChange={handleToDateChange}/>
                            </label>
                        </div>
                    )}
                </div>

                <div className={styles.filterOptionBox}>
                    <label className={styles.filterOptionLabel} onClick={handleTotalAmountDueRangeCheckboxChange}>
                        <input className={styles.filterOptionInput} type="checkbox" checked={useTotalAmountDue}
                               onChange={handleTotalAmountDueRangeCheckboxChange}/>
                        Total Amount Due
                    </label>
                    {useTotalAmountDue && (
                        <div className={styles.checkboxContent}>
                            <label className={styles.checkboxContentLabel}>
                                From:
                                <input className={styles.checkboxContentInput} type="number" value={fromTotalAmountDue}
                                       onChange={handleFromTotalAmountDueChange}/>
                            </label>
                            <label>
                                To:
                                <input className={styles.checkboxContentInput} type="number" value={toTotalAmountDue} onChange={handleToTotalAmountDueChange}/>
                            </label>
                        </div>
                    )}
                </div>

            </Popup>
        </>
    );
};

export default Filter;
