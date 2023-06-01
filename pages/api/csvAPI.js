import axios from "axios";

export const readExcel = async (fileKey, data) => {
    const apiUrl = `http://localhost:3000/readExcelSheet/${fileKey}`;
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Products data sent successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

