import axios from "axios";
import {getCookie} from "cookies-next";

export const getEmployees = async ({CompanyId}) => {
    try {
        const { data: employees } = await axios.get(`http://localhost:3000/getCompanyEmployees/${CompanyId}`,
            {
                headers: {
                    'Authorization': `Bearer ${getCookie("accToken")}`
                }
            });
        return {
            props: {
                employees,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                employees: [],
            },
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
        console.log(data);
        console.log(data.data);
        return {
            data: data.data,
        };
    } catch (error) {
        console.error(error);
        return {
            data : []
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
