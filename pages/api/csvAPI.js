import axios from "axios";
import {getCookie} from "cookies-next";

export const readExcel = async (fileKey, data) => {
    // const apiUrl = process.env.NEXT_PUBLIC_HOST + `readExcelSheet/${fileKey}`;
    const apiUrl = `http://localhost:3000/readExcelSheet/${fileKey}`;
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Sheets data sent successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending sheets data:", error.response || error);
    }
}

export const preprocessCsv = async (fileKey, sheetData, headersRow, processType) => {
    const apiUrl = `http://localhost:3000/${processType}/${fileKey}`;

    const data = {
        categoryId: getCookie("categoryId"),
        data: sheetData,
        headersRow: headersRow
    }

    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data sent successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}