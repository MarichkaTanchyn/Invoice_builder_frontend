import fakeData from "./productsMock.json";
import * as React from "react";
import {useMemo, useState} from "react";
import {useBlockLayout, useResizeColumns, useSortBy, useTable, useRowSelect} from "react-table";
import styles from "./productTable.module.css";
import withLayout from "../components/layout/withLayout";

import IndeterminateCheckbox from "./IndeterminateCheckbox";
import {EditableCell, ReadOnlyCell} from "./Cells";
import DefaultColumnFilter from "./DefaultColumnFilter";


const ProductTable = () => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(fakeData);
    const originalData = useMemo(() => data, [data]);
    const [skipPageReset, setSkipPageReset] = useState(false);

    const columns = useMemo(() => [
        {
            id: "selection",
            minWidth: 60,
            width: 60,
            maxWidth: 60,
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            Cell: ({ row }) => (
                <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
            ),
        },
        {
            id: 'index',
            Header: 'Index',
            Cell: ({ row }) => (
                <div>
                    {row.index}
                </div>
            ),
        },
        ...Object.keys(originalData[0]).map((key) => ({
            Header: key.toUpperCase(),
            accessor: key,
            Filter: DefaultColumnFilter,
            Cell: editMode
                ? (props) => <EditableCell {...props} updateMyData={updateMyData} />
                : ReadOnlyCell,
        })),
    ], [editMode]);

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData(old => old.map((row, i) => {
            if (i === rowIndex) {
                return { ...row, [columnId]: value };
            }
            return row;
        }));
    };

    const deleteRows = () => {
        setData(old =>
            old.filter((row, i) => !selectedFlatRows.some((selectedRow) => selectedRow.index === i))
        );
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
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
        useResizeColumns,
        useSortBy,
        useRowSelect,
    );

    return (
        <div className={styles.container}>
            <button onClick={deleteRows}>Delete selected rows</button>
            <button onClick={() => setEditMode(!editMode)}>
                {editMode ? 'Save changes' : 'Edit rows'}
            </button>

            <table className={styles.table} {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.header}>
                                <div className={styles.headerContent}>
                                    <span>{column.render("Header")}</span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                    {column.id !== "selection" && (
                                        <div {...column.getResizerProps()} className={styles.resizer}>
                                            <img className={styles.img} src={"/resize.svg"} alt={"resize"}/>
                                        </div>
                                    )}
                                </div>
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
