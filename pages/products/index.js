import Card from "../components/util/card/card";
import withLayout from "../components/layout/withLayout";
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import DefaultColumnFilter from "./DefaultColumnFilter";
import {EditableCell, ReadOnlyCell} from "./Cells";
import {useBlockLayout, useResizeColumns, useRowSelect, useSortBy, useTable} from "react-table";
import styles from "./productTable.module.css";
import {utils} from 'xlsx';
import Button from "../components/util/button/button";
import AddProductPopup from "./addProductPopup";
import ConfirmationDialog from "../components/util/confirmationDialog/confirmationDialog";
import {getCookie} from "cookies-next";
import {addProduct, deleteProducts, getCategoryProducts, updateProducts} from "../api/productsApi";
import globalStyles from "../global.module.css";
import _ from 'lodash';
import {useRouter} from "next/router";
import {
    addNewProductToDBAndUI,
    initializeProductDB,
    normalizeProductData,
    processExistingProduct,
    processExtraRows,
    processNewProduct
} from "./productHelpers";

const Products = () => {
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState([]);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [extraRows, setExtraRows] = React.useState([]);
    const [allHeaders, setAllHeaders] = useState([]);
    const [showConfirmationBeforeDelete, setShowConfirmationBeforeDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [originalData, setOriginalData] = useState([]);


    useEffect(() => {
        if (data.length) {
            let allKeys = [];
            data.forEach(row => {
                allKeys = [...allKeys, ...Object.keys(row)];
            });
            // Filter out the 'id' key
            allKeys = allKeys.filter(key => key !== 'id');
            const uniqueKeys = [...new Set(allKeys)]; // Removes duplicates
            setAllHeaders(uniqueKeys);
        }
    }, [data]);

    useEffect(() => {
        const fetchProducts = async () => {
            const categoryId = getCookie("cId");
            const products = await getCategoryProducts(categoryId);
            if (products && products.length > 0) {
                setOriginalData(products);
                const normalizedProducts = products.map(product => normalizeProductData(product));
                setData(normalizedProducts);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData((old) => old.map((row, i) => {
            if (i === rowIndex) {
                return {...old[i], [columnId]: value};
            }
            return row;
        }));
    };

    const tableColumns = useMemo(() => [{
        id: "selection", minWidth: 30, width: 30, maxWidth: 60, Header: ({getToggleAllRowsSelectedProps}) => (<div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>), Cell: ({row}) => (<div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>),
    }, {
        id: "index",
        minWidth: 40,
        width: 40,
        maxWidth: 60,
        Header: "Reg",
        Cell: ({row}) => (<div>{row.index + 1}</div>),
    }, ...allHeaders.map((key) => ({
        Header: key.toUpperCase(),
        accessor: key,
        Filter: DefaultColumnFilter,
        Cell: editMode ? (props) => <EditableCell {...props} updateMyData={updateMyData}/> : ReadOnlyCell,
    })),], [allHeaders, editMode]);

    const deleteRows = () => {
        setShowConfirmationBeforeDelete(true);
    };

    const onDeleteAgree = async () => {
        const productsIdToDelete = selectedFlatRows.map(row => row.original.id);
        await deleteProducts(productsIdToDelete);
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
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows, state: {selectedRowIds},
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

    const handleSubmitPopup = async () => {
        if (Object.keys(extraRows).length > 0) {
            let newProduct = {...tempProduct};
            let newColumns = [...tableColumns];  // Clone the current columns

            processExtraRows(newProduct, newColumns, extraRows);

            let newProductDB = initializeProductDB();
            if (originalData.length === 0) {
                // If no products exist yet
                processNewProduct(newProductDB, extraRows);
            } else {
                // If products exist
                processExistingProduct(newProduct, newProductDB, originalData);
            }
            await addNewProductToDBAndUI(newProduct, newProductDB, {
                setData,
                originalData,
                setTempProduct,
                setExtraRows
            });
        }
        setShowAddProductPopup(false);
    };

    const handleSaveChanges = async () => {
        console.log(data)
        let updatedProducts = [];

        data.forEach((product, index) => {
            // Make a deep copy of the original product object
            const originalProduct = _.cloneDeep(originalData[index]);
            const normalizedProductKeys = Object.keys(product);
            normalizedProductKeys.forEach(key => {
                if (key === originalProduct.nameColumnName) {
                    originalProduct.name = product[key];
                } else if (key === originalProduct.priceColumnName) {
                    originalProduct.price = product[key];
                } else if (key === originalProduct.descriptionColumnName) {
                    originalProduct.description = product[key];
                } else {
                    const otherIndex = originalProduct.other.findIndex(item => Object.keys(item).includes(key));
                    if (otherIndex !== -1) {
                        originalProduct.other[otherIndex][key] = product[key];
                    }
                }
            });

            // Compare the original product and the updated product
            if (!_.isEqual(originalProduct, originalData[index])) {
                // If they're not equal, add the updated product to the updatedProducts array
                updatedProducts.push(originalProduct);
            }
        });

        // await updateProducts(updatedProducts);
        setData(updatedProducts);
        console.log(updatedProducts);
        setEditMode(false);
    };

    const router = useRouter();
    const handleImportFromFile = async () => {
        await router.push({
            pathname: '/fileUpload',
        })
    }


    return (<Card>
            {/*TODO: get the category name*/}
            <div className={styles.pageHeaders}>
                <h1>Products</h1>
                <div className={styles.buttonContainer}>
                    <Button label={"Import from file"} onClick={handleImportFromFile}/>
                    <Button label={"Export to csv"} onClick={exportToCsv}/>
                </div>
            </div>
            <hr/>
            {loading ? (<div className={globalStyles.loadingWave}>
                <div className={globalStyles.loadingBar}></div>
                <div className={globalStyles.loadingBar}></div>
                <div className={globalStyles.loadingBar}></div>
                <div className={globalStyles.loadingBar}></div>
            </div>) : (<div>
                <div className={styles.container}>
                    {data.length !== 0 && (<table className={styles.table} {...getTableProps()}>
                        <thead>
                        {headerGroups.map((headerGroup) => (<tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={styles.header}>
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
                    </table>)}
                </div>
                <div className={styles.bottomButtonContainer}>
                    {selectedFlatRows.length > 0 && <Button label={"Delete"} onClick={deleteRows}/>}
                    {data.length !== 0 && (<Button label={editMode ? 'Save changes' : 'Edit rows'}
                                                   onClick={editMode ? handleSaveChanges : () => setEditMode(true)}/>)}
                    <Button label={"Add new product"} onClick={handleOpenPopup}/>
                </div>
            </div>)}
            {showAddProductPopup && <AddProductPopup
                data={data}
                setData={setData}
                allHeaders={allHeaders}
                handleClosePopup={handleClosePopup}
                handleSubmitPopup={handleSubmitPopup}
                setExtraRows={setExtraRows}
                extraRows={extraRows}
                tempProduct={tempProduct}
                setTempProduct={setTempProduct}
            />}
            {showConfirmationBeforeDelete && <ConfirmationDialog
                type={"Delete"}
                header={"Delete rows"}
                message={"Are you sure you want to delete the selected rows?"}
                onAgree={onDeleteAgree}
                onCancel={onCancelDelete}
            />}
        </Card>

    );
}

export default withLayout(Products);