import axios from "axios";
import {getCookie} from "cookies-next";


export const getCustomers = async () => {
    try {
        const {data: employees} = await axios.get(`http://localhost:3000/getCompanyCustomers/${getCookie('companyId')}`, {
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
        return await axios.get(`http://localhost:3000/getCustomer/${CustomerId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error(error);
    }
}