import axios from "axios";

export const getEmployees = async ({CompanyId}) => {
    try {
        const { data: employees } = await axios.get(`http://localhost:3000/getCompanyEmployees/${CompanyId}`);
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