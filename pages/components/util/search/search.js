import React from "react";
import styles from './search.module.css'
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomInput from "../input/customInput";

const Search = ({ placeholder, onSearch }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <CustomInput placeholder={placeholder} onInput={onSearch} type={"text"}/>
        </div>
    );
};

export default Search;
