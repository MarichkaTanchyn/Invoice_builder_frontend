import axios from "axios";
import {getCookie} from "cookies-next";

export const readExcel = async (fileKey, data) => {
    try {
        const response = await axios.post(process.env.API_URL + `readExcelSheet/${fileKey}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Sheets data sent successfully", response.data);
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
        const response = await axios.post(process.env.API_URL + `${processType}/${fileKey}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data sent successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}