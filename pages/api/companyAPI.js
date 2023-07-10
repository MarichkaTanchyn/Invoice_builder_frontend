import axios from "axios";
import {getCookie} from "cookies-next";

export const getCompanyData = async () => {
    try {
        const data = await axios.get(process.env.API_URL + `getCompany/${getCookie('companyId')}`, {
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
            data: []
        };
    }
};

export const updateCompanyData = async (data) => {
    try {
        return await axios.post(process.env.API_URL + `updateCompany/${getCookie('companyId')}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}