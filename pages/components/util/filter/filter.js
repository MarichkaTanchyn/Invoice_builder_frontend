import React, {useState} from 'react';
import styles from './filter.module.css'
import Popup from "../popup/popup";

const Filter = () => {

    const [useDateRange, setUseDateRange] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleCheckboxChange = (event) => {
        setUseDateRange(event.target.checked);
    };

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };


    return (
        <>
            <Popup>
                <label onClick={handleCheckboxChange}>
                    <input type="checkbox" checked={useDateRange} onChange={handleCheckboxChange}/>
                    Date Range
                </label>
                {useDateRange && (
                    <div>
                        <label>
                            From:
                            <input type="date" value={fromDate} onChange={handleFromDateChange}/>
                        </label>
                        <label>
                            To:
                            <input type="date" value={toDate} onChange={handleToDateChange}/>
                        </label>
                    </div>
                )}
            </Popup>
        </>
    );
};

export default Filter;
