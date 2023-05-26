import React from 'react';
import * as XLSX from 'xlsx';

export const readDataFromExcelSheet = async (data, headersRow, sheetName) => {
    const wb = XLSX.read(data, { type: 'buffer' });

    const mySheetData = {};
    let startRow = headersRow;
    let endRow = startRow + 9;

    // Check if the workbook has the sheetName
    if(!wb.SheetNames.includes(sheetName)){
        console.error(`Sheet: ${sheetName} not found in the workbook`);
        return;
    }

    let attempts = 3;

    while (attempts > 0) {
        const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
            range: startRow - 1
        });
        console.log('jsonData:', jsonData); // Debugging line

        const slicedData = jsonData.slice(0, endRow - startRow + 1);
        console.log('slicedData:', slicedData); // Debugging line

        const filledColumns = calculateFilledColumns(slicedData);
        const averageFilled = checkAllColumnsFilled(filledColumns);
        console.log('averageFilled:', averageFilled, 'attempts:', attempts);

        if (averageFilled || attempts === 1) {
            let columns = [];
            for (const key in slicedData[0]) {
                if (slicedData[0].hasOwnProperty(key)) {
                    const columnData = slicedData.map(row => row[key]);
                    const dataType = (filledColumns[key] > 30) ? guessDataType(columnData) : "string";
                    columns.push({ "column": key, "dataType": dataType });
                }
            }
            mySheetData[sheetName] = columns;
            break;
        } else {
            startRow = endRow + 1;
            endRow = startRow + 9;
            attempts--;
        }
    }
    console.log(mySheetData);
    return mySheetData;
}

const calculateFilledColumns = (slicedData) => {
    const filledColumns = {};
    for (const row of slicedData) {
        for (const column in row) {
            if (row[column] !== null && row[column] !== '') {
                filledColumns[column] = (filledColumns[column] || 0) + 1;
            }
        }
    }
    for (const column in filledColumns) {
        filledColumns[column] = (filledColumns[column] / slicedData.length) * 100;
    }
    return filledColumns;
}

const checkAllColumnsFilled = (filledColumns) => {
    let sumFilledPercentages = 0;
    let columnCount = 0;
    for (const column in filledColumns) {
        sumFilledPercentages += filledColumns[column];
        columnCount++;
    }
    return (sumFilledPercentages / columnCount) > 60;
}

const guessDataType = (columnData) => {
    let typeCounts = { name: 0, price: 0, date: 0, size: 0, height: 0, weight: 0, length: 0, description: 0, other: 0 };
    columnData.forEach(data => {
        let dataType;
        if (data instanceof Date) {
            dataType = 'date';
        } else {
            dataType = typeof data;
            switch(dataType) {
                case 'string':
                    // This is a basic assumption, you need to adjust this logic based on your data
                    if (data.length <= 50) {
                        dataType = 'name';
                    } else {
                        dataType = 'description';
                    }
                    break;
                case 'number':
                    // This is a basic assumption, you need to adjust this logic based on your data
                    if (data < 1000) {
                        dataType = 'price';
                    } else if (data < 10000) {
                        dataType = 'size';
                    } else {
                        dataType = 'other';
                    }
                    break;
                default:
                    dataType = 'other';
            }
        }
        if (dataType in typeCounts) {
            typeCounts[dataType]++;
        } else {
            typeCounts[dataType] = 1;
        }
    });
    let maxCount = 0;
    let guessedType = 'other';
    for (const dataType in typeCounts) {
        if (typeCounts[dataType] > maxCount) {
            maxCount = typeCounts[dataType];
            guessedType = dataType;
        }
    }
    return guessedType;
}

export const checkDataIsValid = async (data, {setErrorMessage}) => {
    const wb = XLSX.read(data);
    // Loop through the sheets
    for (let i = 0; i < wb.SheetNames.length; ++i) {
        let SheetName = wb.SheetNames[i];
        const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[SheetName]);

        // Validate column names
        for (const key in jsonData[0]) {
            if (jsonData[0].hasOwnProperty(key)) {
                if (key === null || /[^a-zA-Z0-9]/.test(key)) {
                    setErrorMessage(`Invalid column name: ${key}. Column names should not be null or contain special characters.`);
                    return false;
                }
            }
        }
    }
    return true;
}

export const getFileSheets = async (data) => {
    const wb = XLSX.read(data);
    const sheets = [];
    for (let i = 0; i < wb.SheetNames.length; ++i) {
        let SheetName = wb.SheetNames[i];
        sheets.push(SheetName);
    }
    console.log(sheets);
    return sheets;
}