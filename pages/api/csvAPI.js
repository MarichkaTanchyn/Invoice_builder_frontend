import {authorizedApi} from './api';
import {getCookie} from "cookies-next";

export const readExcel = async (fileKey, data) => {
    try {
        const response = await authorizedApi.post(`readExcelSheet/${fileKey}`, data);
        return response.data;
    } catch (error) {
        console.error("Error sending sheets data:", error.response || error);
    }
}

export const preprocessCsv = async (fileKey, sheetData, headersRow, processType) => {
    const data = {
        categoryId: getCookie("categoryId"), data: sheetData, headersRow: headersRow
    }
    try {
        const response = await authorizedApi.post(`${processType}/${fileKey}`, data);
        return response.data;
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}