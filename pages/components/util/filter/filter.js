import React, {useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";
import CheckboxWithLabel from "./checkboxWithLabel";
import InputWithLabel from "./inputWithLabel";
import SelectWithLabel from "./selectWithLabel";
import Button from "../button/button";
import useFilter from "./useFilter";


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

    // checkbox handlers
    const handleDateRangeCheckboxChange = (event) => {
        setUseDateRange(event.target.checked);
    };

    const handleTotalAmountDueRangeCheckboxChange = (event) => {
        setUseTotalAmountDue(event.target.checked);
    };

    const handleStatusCheckboxChange = (event) => {
        setUseSelectStatus(event.target.checked)
    }

    const handleUserCheckboxChange = (event) => {
        setUseSelectUser(event.target.checked)
    }
    // date input handlers
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

    // number input handlers
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

    //select handlers
    const handleSelectCurrencyChange = (option) => {
        setSelectCurrency(option)
        console.log("selected Currency", option)
    }

    const handleSelectInvoiceStatus = (option) => {
        setSelectStatus(option)
        console.log("Selected status", option)
    }

    const handleSelectUser = (option) => {
        setSelectUser(option)
        console.log("Selected user", option)
    }

    const validateInputValue = (inputValue) => {
        const regex = /^[0-9.]*$/;
        if (!regex.test(inputValue)) {
            return inputValue.slice(0, -1); // removes last digit
        } else {
            return inputValue;
        }
    }

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
                        onChange={handleStatusCheckboxChange}
                    />
                    {useSelectStatus && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="Status"
                                options={INVOICE_STATUS_OPTIONS}
                                value={selectStatus}
                                onChange={handleSelectInvoiceStatus}
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
                        onChange={handleUserCheckboxChange}
                    />
                    {useSelectUser && (
                        <div className={styles.checkboxContent}>
                            <SelectWithLabel
                                label="User"
                                options={USERS_OPTIONS}
                                value={selectUser}
                                onChange={handleSelectUser}
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
                                isMulti={false}
                            />
                            <InputWithLabel
                                label="From"
                                inputType="text"
                                inputValue={fromTotalAmountDue}
                                onChange={handleFromTotalAmountDueChange}
                            />
                            <InputWithLabel
                                label="To"
                                inputType="text"
                                inputValue={toTotalAmountDue}
                                onChange={handleToTotalAmountDueChange}
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
