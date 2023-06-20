import Card from "../components/util/card/card";
import withLayout from "../components/layout/withLayout";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import fakeData from "./productsMock.json";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import DefaultColumnFilter from "./DefaultColumnFilter";
import {EditableCell, ReadOnlyCell} from "./Cells";
import {useBlockLayout, useResizeColumns, useRowSelect, useSortBy, useTable} from "react-table";
import styles from "./productTable.module.css";
import {utils} from 'xlsx';
import Button from "../components/util/button/button";
import AddProductPopup from "./addProductPopup";
import ConfirmationDialog from "../components/util/confirmationDialog/confirmationDialog";

const Products = () => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(fakeData);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [extraRows, setExtraRows] = React.useState([]);

    const [allHeaders, setAllHeaders] = useState(Object.keys(data[0]));

    const [showConfirmationBeforeDelete, setShowConfirmationBeforeDelete] = useState(false);

    useEffect(() => {
        let allKeys = [];
        data.forEach(row => {
            allKeys = [...allKeys, ...Object.keys(row)];
        });
        const uniqueKeys = [...new Set(allKeys)]; // Removes duplicates
        setAllHeaders(uniqueKeys);
    }, [data]);

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData((old) =>
            old.map((row, i) => {
                if (i === rowIndex) {
                    return {...old[i], [columnId]: value};
                }
                return row;
            })
        );
    };

    const tableColumns = useMemo(
        () => [
            {
                id: "selection",
                minWidth: 30,
                width: 30,
                maxWidth: 60,
                Header: ({getToggleAllRowsSelectedProps}) => (
                    <div>
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({row}) => (
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
                Cell: ({row}) => (
                    <div>{row.index + 1}</div>
                ),
            },
            ...allHeaders.map((key) => ({
                Header: key.toUpperCase(),
                accessor: key,
                Filter: DefaultColumnFilter,
                Cell: editMode ? (props) => <EditableCell {...props} updateMyData={updateMyData}/> : ReadOnlyCell,
            })),
        ],
        [allHeaders, editMode]
    );

    const deleteRows = () => {
        setShowConfirmationBeforeDelete(true);
    };

    const onDeleteAgree = () => {
        setData(old => old.filter((row, i) => !selectedFlatRows.some((selectedRow) => selectedRow.index === i)));
        setShowConfirmationBeforeDelete(false);
    }
    const onCancelDelete = () => {
        setShowConfirmationBeforeDelete(false);
    }


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
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: {selectedRowIds},
    } = useTable({
        columns: tableColumns,
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


    const [tempProduct, setTempProduct] = useState({});

    const handleSubmitPopup = () => {
        const newProduct = {...tempProduct};
        extraRows.forEach(row => {
            newProduct[row.name] = row.value;
        });

        setData(prevData => [...prevData, newProduct]);

        setTempProduct({});
        setExtraRows([]);
        setShowAddProductPopup(false);
    };


    return (
        <Card>
            {/*TODO: get the category name*/}
            <div className={styles.pageHeaders}>
                <h1>Products</h1>
                <div className={styles.buttonContainer}>
                    <Button label={"Export to csv"} onClick={exportToCsv}/>
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
            {showAddProductPopup &&
                <AddProductPopup
                    data={data}
                    setData={setData}
                    allHeaders={allHeaders}
                    handleClosePopup={handleClosePopup}
                    handleSubmitPopup={handleSubmitPopup}
                    setExtraRows={setExtraRows}
                    extraRows={extraRows}
                    tempProduct={tempProduct}
                    setTempProduct={setTempProduct}
                />
            }
            {showConfirmationBeforeDelete &&
                <ConfirmationDialog
                    type={"Delete"}
                    header={"Delete rows"}
                    message={"Are you sure you want to delete the selected rows?"}
                    onAgree={onDeleteAgree}
                    onCancel={onCancelDelete}
                />
            }
            <div className={styles.bottomButtonContainer}>
                {selectedFlatRows.length > 0 &&
                    <Button label={"Delete"} onClick={deleteRows}/>
                }
                <Button label={editMode ? 'Save changes' : 'Edit rows'} onClick={() => setEditMode(!editMode)}/>
                <Button label={"Add new product"} onClick={handleOpenPopup}/>
            </div>
        </Card>

    );
}

export default withLayout(Products);