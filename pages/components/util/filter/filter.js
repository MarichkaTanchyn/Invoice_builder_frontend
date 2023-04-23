import React, {useEffect, useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";
import CheckboxWithLabel from "./checkboxWithLabel";
import InputWithLabel from "./inputWithLabel";
import SelectWithLabel from "./selectWithLabel";
import Button from "../button/button";
import useFilter from "./useFilter";
import {getEmployees} from "../../../api/employeesApi";


const CURRENCY_OPTIONS = [
    {value: 'all', label: 'All'},
    {value: 'dollar', label: 'Dollar'},
    {value: 'euro', label: 'Euro'},
    {value: 'zloty', label: 'Zloty'},
]
const INVOICE_STATUS_OPTIONS = [
    {value: 'draft', label: 'Draft'},
    {value: 'pending', label: 'Pending'},
    {value: 'paid', label: 'Paid'},
    {value: 'overdue', label: 'Overdue'},
    {value: 'void', label: 'Void'},
    {value: 'partiallyPaid', label: 'Partially Paid'},
]
const USERS_OPTIONS = [
    {value: 1, label: '@me'},
    {value: 2, label: 'Max Dubakov'},
    {value: 3, label: 'Mykchailo Smilianets'},
    {value: 4, label: 'Angelina Soroka'},
    {value: 5, label: 'Alex Shkap'},
    {value: 6, label: 'Olena Tanchyn'},
]

const Filter = ({updateFilterSettings}) => {

    const [useDateRange, setUseDateRange] = useState(false);
    const [useDate, setUseDate] = useState(false);
    const [useTotalAmountDue, setUseTotalAmountDue] = useState(false);
    const [useSelectStatus, setUseSelectStatus] = useState(false)
    const [useSelectUser, setUseSelectUser] = useState(false)

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [date, setDate] = useState('');

    const [fromTotalAmountDue, setFromTotalAmountDue] = useState(null)
    const [toTotalAmountDue, setToTotalAmountDue] = useState(null)

    const [selectCurrency, setSelectCurrency] = useState(CURRENCY_OPTIONS[0])
    const [selectStatus, setSelectStatus] = useState(null)
    const [selectUser, setSelectUser] = useState(null)


    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleNumberInputChange = (setter) => (event) => {
        const inputValue = event.target.value;
        const validatedValue = validateInputValue(inputValue);
        setter(validatedValue);
    };

    const handleSelectChange = (setter) => (option) => {
        setter(option);
    };

    const validateInputValue = (inputValue) => {
        const regex = /^[0-9.]*$/;
        if (!regex.test(inputValue)) {
            return inputValue.slice(0, -1); // removes last digit
        } else {
            return inputValue;
        }
    }
    //
    // useEffect(() => {
    //     return () => {
    //         setUseDateRange(false);
    //         setUseDate(false);
    //         setUseTotalAmountDue(false);
    //         setUseSelectStatus(false);
    //         setUseSelectUser(false);
    //
    //         setFromDate('');
    //         setToDate('');
    //
    //         setDate('');
    //
    //         setFromTotalAmountDue(null);
    //         setToTotalAmountDue(null);
    //
    //         setSelectCurrency(CURRENCY_OPTIONS[0]);
    //         setSelectStatus(null);
    //         setSelectUser(null);
    //     };
    // }, []);



    const handleApplyFilter = () => {
        updateFilterSettings({
            useDateRange,
            fromDate,
            toDate,
            useDate,
            date,
            useTotalAmountDue,
            fromTotalAmountDue,
            toTotalAmountDue,
            selectCurrency,
            useSelectStatus,
            selectStatus,
            useSelectUser,
            selectUser,
        });
    };

    const { clearFilterSettings } = useFilter();

    const handleClearFilter = () => {
        clearFilterSettings();
        updateFilterSettings({}); // Reset the filter settings in the parent component
    };

    return (
        <>
            <Popup>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Invoice Status"
                        checked={useSelectStatus}
                        onChange={handleCheckboxChange(setUseSelectStatus)}
                    />
                    {useSelectStatus && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="Status"
                                options={INVOICE_STATUS_OPTIONS}
                                value={selectStatus}
                                onChange={handleSelectChange(setSelectStatus)}
                                placeholder={"Select Status"}
                                isMulti={false}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Created By"
                        checked={useSelectUser}
                        onChange={handleCheckboxChange(setUseSelectUser)}
                    />
                    {useSelectUser && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="User"
                                options={USERS_OPTIONS}
                                value={selectUser}
                                onChange={handleSelectChange(setSelectUser)}
                                placeholder={"Select User"}
                                isMulti={true}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Date Range"
                        checked={useDateRange}
                        onChange={handleCheckboxChange(setUseDateRange)}
                    />
                    {useDateRange && (
                        <div className={styles.checkboxContent}>
                            <InputWithLabel
                                label="From"
                                inputType="date"
                                inputValue={fromDate}
                                onChange={handleInputChange(setFromDate)}
                            />
                            <InputWithLabel
                                label="To"
                                inputType="date"
                                inputValue={toDate}
                                onChange={handleInputChange(setToDate)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Date"
                        checked={useDate}
                        onChange={handleCheckboxChange(setUseDate)}
                    />
                    {useDate && (
                        <div className={styles.checkboxContent}>
                            <InputWithLabel
                                label="Date"
                                inputType="date"
                                inputValue={date}
                                onChange={handleInputChange(setDate)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterOptionBox}>
                    <CheckboxWithLabel
                        label="Total Amount Due"
                        checked={useTotalAmountDue}
                        onChange={handleCheckboxChange(setUseTotalAmountDue)}
                    />
                    {useTotalAmountDue && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="Currency"
                                options={CURRENCY_OPTIONS}
                                value={selectCurrency}
                                onChange={handleSelectChange(setSelectCurrency)}
                                isMulti={false}
                            />
                            <InputWithLabel
                                label="From"
                                inputType="text"
                                inputValue={fromTotalAmountDue}
                                onChange={handleNumberInputChange(setFromTotalAmountDue)}
                            />
                            <InputWithLabel
                                label="To"
                                inputType="text"
                                inputValue={toTotalAmountDue}
                                onChange={handleNumberInputChange(setToTotalAmountDue)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.filterButtons}>
                    <Button label="Clear" onClick={handleClearFilter}/>
                    <Button label="Apply" onClick={handleApplyFilter}/>
                </div>
            </Popup>
        </>
    );
};

export default Filter;
