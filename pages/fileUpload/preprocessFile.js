import React from 'react';
import * as XLSX from 'xlsx';

let hasGuessedName = false;
const numPreviewRows = 10;
export const readDataFromExcelSheet = async (data, headersRow, sheetName) => {
    const wb = XLSX.read(data, { type: 'buffer' });

    const mySheetData = {};

    // Check if the workbook has the sheetName
    if(!wb.SheetNames.includes(sheetName)){
        console.error(`Sheet: ${sheetName} not found in the workbook`);
        return;
    }

    // TODO: it cut vertically also, but should cut only horizontally

    // const ws = wb.Sheets[sheetName];
    // if (!ws['!ref']) {
    //     console.error(`No data found in sheet: ${sheetName}`);
    //     return;
    // }
    // const startRow = headersRow - 1;
    // const endRow = Math.min(numPreviewRows, XLSX.utils.decode_range(ws['!ref']).e.r);  // total rows count
    //
    // const jsonData = XLSX.utils.sheet_to_json(ws, {
    //     range: XLSX.utils.encode_range({s: {r: startRow, c: 0}, e: {r: endRow, c: 0}}) // range should be specified as a cell range
    // });
    //
    // console.log("sheet",jsonData);

    //TODO: it works bad, it should delete everything what is upper headers row


    const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
        range: headersRow - 1
    });
    console.log(jsonData)
    let columns = [];
    for (const key in jsonData[0]) {
        if (jsonData[0].hasOwnProperty(key)) {
            const columnData = jsonData.map(row => row[key]);
            const dataType = guessDataType(columnData);
            columns.push({ "column": key, "dataType": dataType });
        }
    }
    mySheetData[sheetName] = columns;

    console.log(mySheetData);
    hasGuessedName = false;
    return mySheetData;
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
                    if (data.length <= 50) {
                        console.log('hasGuessedName: ', hasGuessedName)
                        if (hasGuessedName) {
                            // If we've already guessed 'name' before, then consider this as 'description' or 'other'
                            dataType = data.length > 40 ? 'description' : 'other';
                        } else {
                            console.log("Guessing name")
                            dataType = 'name';
                            hasGuessedName = true;  // Mark that we've guessed 'name'
                        }
                    } else {
                        dataType = 'description';
                    }
                    break;
                case 'number':
                    // If it's between 0 and 1000, it's likely a price
                    if (data >= 0 && data <= 1000) {
                        dataType = 'price';
                    }
                    // If it's between 1 and 300, it's likely a size
                    else if (data > 0 && data <= 300) {
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
                if (key === null || /[^\p{L}0-9_ ]/gu.test(key)) {
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