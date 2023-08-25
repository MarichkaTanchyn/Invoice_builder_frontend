import {authorizedApi} from './api';
import {getCookie} from "cookies-next";

export const getEmployees = async () => {
    try {
        const {data: employees} = await authorizedApi.get(`getCompanyEmployees/${getCookie('companyId')}`);
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
        const data = await authorizedApi.get(`getEmployee/${getCookie('employeeId')}`);
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
        return await authorizedApi.post(process.env.API_URL + `updateEmployeePerson/${getCookie('employeeId')}`, data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }

}

export const deleteEmployee = async (EmployeeId) => {
    try {
        return await authorizedApi.delete(`deleteEmployee/${EmployeeId}`);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const updateEmployeePermissions = async (EmployeeId, permissions) => {
    try {
        return await authorizedApi.post(`updateEmployeePermissions/${EmployeeId}`, permissions);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const acceptEmployee = async (EmployeeId) => {
    try {
        return await authorizedApi.post(process.env.API_URL + `acceptEmployee/${EmployeeId}`, {},);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}