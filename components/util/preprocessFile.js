import React from 'react';
import * as XLSX from 'xlsx';

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