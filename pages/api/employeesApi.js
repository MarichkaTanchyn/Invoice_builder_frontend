import axios from "axios";
import {getCookie} from "cookies-next";

export const getEmployees = async () => {
    try {
        const {data: employees} = await axios.get(`http://localhost:3000/getCompanyEmployees/${getCookie('companyId')}`, {
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

export const getEmployeeData = async () => {
    try {
        const data = await axios.get(`http://localhost:3000/getEmployee/${getCookie('employeeId')}`, {
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
}

export const updatePersonData = async (data) => {
    const apiUrl = `http://localhost:3000/updateEmployeePerson/${getCookie('employeeId')}`;
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
