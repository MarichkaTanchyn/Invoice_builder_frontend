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