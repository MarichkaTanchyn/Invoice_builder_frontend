import fakeData from "./productsMock.json";
import * as React from "react";
import {useMemo, useState} from "react";
import {useBlockLayout,
    useRowSelect, useResizeColumns, useTable} from "react-table";
import styles from "./productTable.module.css";
import withLayout from "../components/layout/withLayout";


const EditableCell = ({
                          value: initialValue,
                          row: {index},
                          column: {id},
                          updateMyData,
                      }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    return <input value={value} onChange={onChange} onBlur={onBlur}/>;
};

const DefaultColumnFilter = ({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
};

const ProductTable = () => {
    const data = useMemo(() => fakeData, []);
    const [originalData] = useState(data);
    const [skipPageReset, setSkipPageReset] = useState(false);

    const columns = useMemo(() => {
        if (data.length > 0) {
            return Object.keys(data[0]).map((key) => {
                return {
                    Header: key.toUpperCase(),
                    accessor: key,
                    Filter: DefaultColumnFilter,
                    Cell: EditableCell,
                };
            });
        }
        return [];
    }, [data]);

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        data[rowIndex][columnId] = value;
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            updateMyData,
            autoResetPage: !skipPageReset,
            autoResetSelectedRows: !skipPageReset,
            defaultColumn: useMemo(
                () => ({
                    minWidth: 30,
                    width: 150,
                    maxWidth: 400,
                }),
                []
            ),
        },
        useBlockLayout,
        useResizeColumns
    );

    return (
        <div className={styles.container}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th  {...column.getHeaderProps()} {...column.getResizerProps()} {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default withLayout(ProductTable);
