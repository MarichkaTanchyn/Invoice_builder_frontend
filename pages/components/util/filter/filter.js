import React, {useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";
import Select from 'react-select'

const CURRENCY_OPTIONS = [
    {value: 1, label: 'All'},
    {value: 2, label: 'Dolar'},
    {value: 3, label: 'Euro'},
    {value: 4, label: 'Zloty'},
]

const Filter = () => {

    const [useDateRange, setUseDateRange] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [useDate, setUseDate] = useState(false);
    const [date, setDate] = useState('');

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

    const handleDateCheckboxChange = (event) => {
        setUseDate(event.target.checked);
    };
    const handleDateChange = (event) => {
        setDate(event.target.value);
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

    const selectStyle = {
        control: base => ({
            ...base,
            boxShadow: "none",
            padding: '0',
            margin: ' 1em 0',
            border: '0px solid transparent',
            borderRadius: '.4em',
            '&:hover': {
                border: '0px solid #ccc',
                borderRadius: '.4em',
                backgroundColor: '#ccc'
            },
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        dropdownIndicator: base => ({
            ...base,
            color: '#A8A8A8',

            marginLeft: '-.5em',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#f5f5f5" : "white",
            color: "#333",
            cursor: "pointer",
            fontSize: ".8em",
            padding: "0.5em 1em"
        })
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
                                <span>From</span>
                                <input className={styles.checkboxContentInput} type="date" value={fromDate} onChange={handleFromDateChange}/>
                            </label>
                            <label className={styles.checkboxContentLabel}>
                                <span>To</span>
                                <input className={styles.checkboxContentInput} type="date" value={toDate} onChange={handleToDateChange}/>
                            </label>
                        </div>
                    )}
                </div>

                <div className={styles.filterOptionBox}>
                    <label className={styles.filterOptionLabel} onClick={handleDateCheckboxChange}>
                        <input className={styles.filterOptionInput} type="checkbox" checked={useDate} onChange={handleDateCheckboxChange}/>
                        Date
                    </label>
                    {useDate && (
                        <div className={styles.checkboxContent}>
                            <label className={styles.checkboxContentLabel}>
                                <span>Date</span>
                                <input className={styles.checkboxContentInput} type="date" value={date} onChange={handleDateChange}/>
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
                                <span>From </span>
                                <input className={styles.checkboxContentInput} type="number" value={fromTotalAmountDue}
                                       onChange={handleFromTotalAmountDueChange}/>
                            </label>
                            <label label className={styles.checkboxContentLabel}>
                                <span>To</span>
                                <input className={styles.checkboxContentInput} type="number" value={toTotalAmountDue} onChange={handleToTotalAmountDueChange}/>
                            </label>
                            <label label className={styles.checkboxContentLabel}>
                                <Select options={CURRENCY_OPTIONS} styles={selectStyle} placeholder={"Currency"}/>
                            </label>
                        </div>
                    )}
                </div>

            </Popup>
            <style jsx>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                     display: none;
                }
            `}</style>
        </>
    );
};

export default Filter;
