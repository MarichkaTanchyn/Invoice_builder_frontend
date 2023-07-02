import axios from "axios";
import {getCookie} from "cookies-next";

export const getCompanyData = async () => {
    try {
        const data = await axios.get(`http://localhost:3000/getCompany/${getCookie('companyId')}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        return {
            data: data.data,
        };
    } catch (error) {
        console.error(error);
        return {
            data : []
        };
    }
};

export const updateCompanyData = async (data) => {
    const apiUrl = `http://localhost:3000/updateCompany/${getCookie('companyId')}`;
    try {
        return await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}