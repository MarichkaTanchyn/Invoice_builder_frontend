import React, {useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";
import CheckboxWithLabel from "./checkboxWithLabel";
import InputWithLabel from "./inputWithLabel";
import SelectWithLabel from "./selectWithLabel";


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

    const [selectCurrency, setSelectCurrency] = useState(CURRENCY_OPTIONS[0])


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
        const inputValue = event.target.value;
        const validatedValue = validateInputValue(inputValue);
        setFromTotalAmountDue(validatedValue);
    };

    const handleToTotalAmountDueChange = (event) => {
        const inputValue = event.target.value;
        const validatedValue = validateInputValue(inputValue);
        setToTotalAmountDue(validatedValue);
    };

    const handleSelectCurrencyChange = (option) => {
        setSelectCurrency(option)
        console.log("selected Currency", option)
    }

    const validateInputValue = (inputValue) => {
        if (inputValue < 0) {
            return 0;
        } else {
            return inputValue;
        }
    }

    // TODO: filter by created user, status

    return (
        <>
            <Popup>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Date Range"
                        checked={useDateRange}
                        onChange={handleDateRangeCheckboxChange}
                    />
                    {useDateRange && (
                        <div className={styles.checkboxContent}>
                            <InputWithLabel
                            label="From"
                            inputType="date"
                            inputValue={fromDate}
                            onChange={handleFromDateChange}
                            />
                            <InputWithLabel
                                label="To"
                                inputType="date"
                                inputValue={toDate}
                                onChange={handleToDateChange}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Date"
                        checked={useDate}
                        onChange={handleDateCheckboxChange}
                    />
                    {useDate && (
                        <div className={styles.checkboxContent}>
                            <InputWithLabel
                                label="Date"
                                inputType="date"
                                inputValue={date}
                                onChange={handleDateChange}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Total Amount Due"
                        checked={useTotalAmountDue}
                        onChange={handleTotalAmountDueRangeCheckboxChange}
                    />
                    {useTotalAmountDue && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="Currency"
                                options={CURRENCY_OPTIONS}
                                value={selectCurrency}
                                onChange={handleSelectCurrencyChange}
                            />
                            <InputWithLabel
                                label="From"
                                inputType="number"
                                inputValue={fromTotalAmountDue}
                                onChange={handleFromTotalAmountDueChange}
                            />
                            <InputWithLabel
                                label="To"
                                inputType="number"
                                inputValue={toTotalAmountDue}
                                onChange={handleToTotalAmountDueChange}
                            />
                        </div>
                    )}
                </div>
            </Popup>
        </>
    );
};

export default Filter;
