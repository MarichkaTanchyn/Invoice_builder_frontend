import fakeData from "./productsMock.json";
import * as React from "react";
import {useMemo, useState} from "react";
import {useBlockLayout, useResizeColumns, useSortBy, useTable, useRowSelect} from "react-table";
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

const DefaultCell = ({ value }) => <>{value}</>;

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
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(fakeData);
    const originalData = useMemo(() => data, [data]);
    const [skipPageReset, setSkipPageReset] = useState(false);

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef();
            const resolvedRef = ref || defaultRef;

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    )

    const columns = useMemo(() => {
        if (data.length > 0) {
            return [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...Object.keys(data[0]).map((key) => {
                    return {
                        Header: key.toUpperCase(),
                        accessor: key,
                        Filter: DefaultColumnFilter,
                        Cell: editMode
                            ? (props) => <EditableCell {...props} updateMyData={updateMyData} />
                            : DefaultCell,
                    };
                }),
            ];
        }
        return [];
    }, [data, editMode]);

    React.useEffect(() => {
        // This function will run whenever `data` changes
        // Put any code here that needs to run after the data has been updated
    }, [data]);
    const deleteRows = () => {
        setData(old =>
            old.filter((row, i) => !selectedFlatRows.some((selectedRow) => selectedRow.index === i))
        );
    };

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData(old => old.map((row, i) => {
            if (i === rowIndex) {
                return { ...row, [columnId]: value };
            }
            return row;
        }));
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
                                    <div {...column.getResizerProps()} className={styles.resizer}>
                                        <img className={styles.img} src={"/resize.svg"} alt={"resize"}/>
                                    </div>
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
                                <td {...cell.getCellProps()}> {cell.render("Cell")} </td> // Removed extra checkbox
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
