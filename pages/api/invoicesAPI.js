import axios from "axios";

export const getAllDocuments = async ({CompanyId, EmployeeId}) => {
    try {
        const { data: documents } = await axios.get(`http://localhost:3000/getAllDocuments/${CompanyId}/${EmployeeId}`);
        return {
            props: {
                documents,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                documents: [],
            },
        };
    }
}
