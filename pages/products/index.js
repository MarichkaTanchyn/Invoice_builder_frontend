import Card from "../components/util/card/card";
import withLayout from "../components/layout/withLayout";
import * as React from "react";
import {useMemo, useState} from "react";
import fakeData from "./productsMock.json";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import DefaultColumnFilter from "./DefaultColumnFilter";
import {EditableCell, ReadOnlyCell} from "./Cells";
import {useBlockLayout, useResizeColumns, useRowSelect, useSortBy, useTable} from "react-table";
import styles from "./productTable.module.css";
import * as XLSX from 'xlsx';
import Button from "../components/util/button/button";
import {utils} from "xlsx";
import AddProductPopup from "./addProductPopup";

const Products = () => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(fakeData);
    const originalData = useMemo(() => data, [data]);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [extraRows, setExtraRows] = React.useState([]);


    // Extract all headers from the originalData
    const allHeaders = useMemo(() => Object.keys(originalData[0]), [originalData]);

    const columns = useMemo(
        () => [
            {
                id: "selection",
                minWidth: 30,
                width: 30,
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
                id: "index",
                minWidth: 40,
                width: 40,
                maxWidth: 60,
                Header: "Reg",
                Cell: ({ row }) => (
                    <div>{row.index + 1}</div>
                ),
            },
            ...allHeaders.map((key) => ({
                Header: key.toUpperCase(),
                accessor: key,
                Filter: DefaultColumnFilter,
                Cell: editMode ? (props) => <EditableCell {...props} updateMyData={updateMyData} /> : ReadOnlyCell,
            })),
        ],
        [allHeaders, editMode]
    );

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, i) => {
                if (i === rowIndex) {
                    return { ...row, [columnId]: value };
                }
                return row;
            })
        );
    };

    const deleteRows = () => {
        setData(old => old.filter((row, i) => !selectedFlatRows.some((selectedRow) => selectedRow.index === i)));
    };

    const exportToCsv = () => {
        const ws = utils.json_to_sheet(data);
        const csv = utils.sheet_to_csv(ws);
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
        link.click();
    }

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows, state: {selectedRowIds},
    } = useTable({
        columns,
        data,
        autoResetPage: !skipPageReset,
        autoResetSelectedRows: !skipPageReset,
        defaultColumn: useMemo(() => ({
            minWidth: 30, width: 150, maxWidth: 400,
        }), []),
    }, useBlockLayout, useResizeColumns, useSortBy, useRowSelect,);

    const handleOpenPopup = () => {
        setShowAddProductPopup(true);
    };

    const handleClosePopup = () => {
        setShowAddProductPopup(false);
    };

    const handleSubmitPopup = () => {
        console.log(data)
        setData(prevData => {
            const newData = [...prevData];

            // Add the extra rows to the new product
            extraRows.forEach(row => {
                newData[newData.length - 1][row.name] = row.value;
            });

            return newData;
        });

        // Reset the extra rows
        setExtraRows([]);

    };

    return (
        <Card>
            {/*TODO: get the category name*/}
            <div className={styles.pageHeaders}>
                <h1>Products</h1>
                <div className={styles.buttonContainer}>
                    <Button label={"Delete"} onClick={deleteRows}/>
                    <Button label={editMode ? 'Save changes' : 'Edit rows'} onClick={() => setEditMode(!editMode)}/>
                    <Button label={"Add new product"} onClick={handleOpenPopup}/>
                    <Button label={"Export to csv"} onClick={exportToCsv} />
                </div>
            </div>
            <hr/>
            <div className={styles.container}>

                <table className={styles.table} {...getTableProps()}>
                    <thead>
                    {headerGroups.map((headerGroup) => (<tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.header}>
                                    <div className={styles.headerContent}>
                                        <span>{column.render("Header")}</span>
                                        {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                        {column.id !== "selection" && (
                                            <div {...column.getResizerProps()} className={styles.resizer}>
                                                <img className={styles.img} src={"/resize.svg"} alt={"resize"}/>
                                            </div>)}
                                    </div>
                                </th>))}
                        </tr>))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (<tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (<td {...cell.getCellProps()}> {cell.render("Cell")} </td>))}
                            </tr>);
                    })}
                    </tbody>
                </table>
            </div>
            {showAddProductPopup && <AddProductPopup
                data={data}
                setData={setData}
                allHeaders={allHeaders}
                handleClosePopup={handleClosePopup}
                handleSubmitPopup={handleSubmitPopup}
                setExtraRows={setExtraRows}
                extraRows={extraRows}
            />}
        </Card>

    );
}

export default withLayout(Products);