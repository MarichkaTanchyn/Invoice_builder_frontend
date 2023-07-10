import axios from "axios";
import {getCookie} from "cookies-next";

export const getEmployees = async () => {
    try {
        const {data: employees} = await axios.get(process.env.API_URL + `getCompanyEmployees/${getCookie('companyId')}`, {
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
        const data = await axios.get(process.env.API_URL + `getEmployee/${getCookie('employeeId')}`, {
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
    try {
        return await axios.post(process.env.API_URL + `updateEmployeePerson/${getCookie('employeeId')}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }

}

export const deleteEmployee = async (EmployeeId) => {
    try {
        return await axios.delete(process.env.API_URL + `deleteEmployee/${EmployeeId}`, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const updateEmployeePermissions = async (EmployeeId, permissions) => {
    try {
        return await axios.post(process.env.API_URL + `updateEmployeePermissions/${EmployeeId}`, permissions, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const acceptEmployee = async (EmployeeId) => {
    try {
        return await axios.post(process.env.API_URL + `acceptEmployee/${EmployeeId}`, {}, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}