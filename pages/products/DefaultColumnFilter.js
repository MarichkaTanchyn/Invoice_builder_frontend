import * as React from "react";

const DefaultColumnFilter = ({
                                 column,
                             }) => {
    const filterValue = column?.filterValue || '';
    const preFilteredRows = column?.preFilteredRows || [];
    const setFilter = column?.setFilter || function() {};

    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
};

export default DefaultColumnFilter;