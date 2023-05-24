import React from 'react';
import * as XLSX from 'xlsx';

export const readDataFromExcel = async (data, {setSheetData, headersRow, setErrorMessage}) => {
    const wb = XLSX.read(data, { type: 'buffer' });
    const mySheetData = {};
    let startRow = headersRow + 1;
    let endRow = startRow + 9;

    for (let i = 0; i < wb.SheetNames.length; ++i) {
        let SheetName = wb.SheetNames[i];
        let attempts = 1;

        while (attempts > 0) { 
            const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[SheetName], {
                range: startRow - 1 
            });

            const slicedData = jsonData.slice(0, endRow - startRow + 1);
            const filledColumns = calculateFilledColumns(slicedData);
            const averageFilled = checkAllColumnsFilled(filledColumns);

            if (averageFilled > 60 || attempts == 1) {
                let columns = [];
                for (const key in slicedData[0]) {
                    if (slicedData[0].hasOwnProperty(key)) {
                        if (key === null || /[^a-zA-Z0-9]/.test(key)) {
                            setErrorMessage(`Invalid column name: ${key}. Column names should not be null or contain special characters.`);
                            return false;
                        }
                        const columnData = slicedData.map(row => row[key]);
                        const dataType = (filledColumns[key] > 30) ? guessDataType(columnData) : "string"; 
                        columns.push({ "column" : key, "dataType": dataType });
                    }
                }
                mySheetData[SheetName] = columns;
                break;
            } else {
                startRow = endRow + 1;
                endRow = startRow + 9;
                attempts--;
            }
        }
    }
    console.log(mySheetData);
    setSheetData(mySheetData);
    return true;
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
    let typeCounts = { string: 0, number: 0, boolean: 0, object: 0, undefined: 0 };
    columnData.forEach(data => {
        const dataType = typeof data;
        if (dataType in typeCounts) {
            typeCounts[dataType]++;
        } else {
            typeCounts[dataType] = 1;
        }
    });
    let maxCount = 0;
    let guessedType = 'undefined';
    for (const dataType in typeCounts) {
        if (typeCounts[dataType] > maxCount) {
            maxCount = typeCounts[dataType];
            guessedType = dataType;
        }
    }
    return guessedType;
}
