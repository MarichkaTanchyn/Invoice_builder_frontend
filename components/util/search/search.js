import React from "react";
import styles from './search.module.css'
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Search = ({placeholder, onSearch}) => {
    return (
        <div>
            <FontAwesomeIcon icon={faSearch} className={styles.icon}/>
            <input
                type={"text"}
                className={styles.input}
                placeholder={placeholder}
                onChange={onSearch}
            />
        </div>
    );
};

export default Search;
