import React, { useState } from "react";
import styles from './search.module.css'
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Search = ({ placeholder, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            onSearch(searchTerm);
        }
    };

    return (
        <div>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Search;
