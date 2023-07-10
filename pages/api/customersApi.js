import axios from "axios";
import {getCookie} from "cookies-next";

export const getCustomers = async () => {
    try {
        const {data: employees} = await axios.get(process.env.API_URL + `getCompanyCustomers/${getCookie('companyId')}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        return {
            employees,
        };
    } catch (error) {
        console.error(error);
        return {
            employees: [],
        };
    }
}

export const getCustomer = async (CustomerId) => {
    try {
        return await axios.get(process.env.API_URL + `getCustomer/${CustomerId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const addCustomer = async (data) => {
    try {
        return await axios.post(process.env.API_URL + `addCustomer/${getCookie('companyId')}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}

export const updateCustomer = async (CustomerId, data) => {
    try {
        return await axios.post(process.env.API_URL + `updateCustomer/${CustomerId}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}