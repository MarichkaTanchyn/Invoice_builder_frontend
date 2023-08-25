import {getCookie} from "cookies-next";
import {addProduct} from "../../../pages/api/productsApi";


export const processExtraRows = (newProduct, newColumns, extraRows) => {
    extraRows.forEach(row => {
        newProduct[row.name] = row.value;

        // Check if a column with this accessor already exists
        const columnExists = newColumns.some(column => column.accessor === row.name);

        // If it doesn't exist, add a new column
        if (!columnExists) {
            newColumns.push({Header: row.name, accessor: row.name});
        }
    });
}

export const initializeProductDB = () => {
    return {
        "name": null,
        "nameColumnName": null,
        "price": null,
        "priceColumnName": null,
        "description": null,
        "descriptionColumnName": null,
        "other": []
    };
}

export const processNewProduct = (newProductDB, extraRows) => {
    extraRows.forEach(row => {
        if (row.type === 'name' || row.type === 'price' || row.type === 'description') {
            newProductDB[row.type] = row.value;
            newProductDB[row.type + 'ColumnName'] = row.name;
        } else {
            newProductDB["other"].push(createOtherObject(row.name, row.value));
        }
    });
}

export const processExistingProduct = (newProduct, newProductDB, originalData) => {
    let maxFilledData = getMaxFilledData(originalData);

    // Mapping values based on maxFilledData's column names
    for (let key in newProduct) {
        const found = Object.keys(maxFilledData.item).some(columnName => {
            if (maxFilledData.item[columnName] === key) {
                const cleanColumnName = columnName.replace("ColumnName", "");
                newProductDB[cleanColumnName] = newProduct[key]; // Mapping value to name, price, description based on column names
                newProductDB[columnName] = key; // Also assign the column name
                return true;
            }
            return false;
        });

        if (!found && !['nameColumnName', 'priceColumnName', 'descriptionColumnName'].includes(key)) {
            newProductDB["other"].push(createOtherObject(key, newProduct[key]));
        }
    }
}

const getMaxFilledData = (originalData) => {
    return originalData.reduce((prev, current) => {
        let currentFilledCount = Object.values(current).reduce((count, value) => count + (value !== null && value !== undefined ? 1 : 0), 0);
        return (currentFilledCount > prev.count) ? {item: current, count: currentFilledCount} : prev;
    }, {item: null, count: 0});
}
export const addNewProductToDBAndUI = async (newProduct, newProductDB, {
    setData,
    originalData,
    setTempProduct,
    setExtraRows
}) => {
    const categoryId = getCookie("categoryId");
    await addProduct(newProductDB, categoryId);

    originalData.push(newProductDB);
    setData(prevData => [...prevData, newProduct]);
    setTempProduct({});
    setExtraRows([]);
}

const createOtherObject = (name, value) => {
    return {
        [name]: value, "type": "name", "useInInvoice": false
    };
}

export const normalizeProductData = (product) => {
    const {other, ...rest} = product;

    // Create new object with desired keys
    let productData = {
        id: product.id, ...(product.nameColumnName ? {[product.nameColumnName]: product.name} : {}), ...(product.priceColumnName ? {[product.priceColumnName]: product.price} : {}), ...(product.descriptionColumnName ? {[product.descriptionColumnName]: product.description} : {}),
    };

    productData = other.reduce((acc, curr) => {
        const key = Object.keys(curr).find(key => key !== "type" && key !== "useInInvoice");
        return key ? {...acc, [key]: curr[key]} : acc;
    }, productData);

    return productData;
}