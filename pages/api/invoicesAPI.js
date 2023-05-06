import axios from "axios";

export const getAllDocuments = async ({CompanyId, EmployeeId}) => {
    try {
        console.log(CompanyId, EmployeeId)
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

export const sendInvoiceData = async ({invoiceData, EmployeeId}) => {
    const apiUrl = `http://localhost:3000/createInvoice/${EmployeeId}`; // Replace with your backend API URL

    try {
        const response = await axios.post(apiUrl, invoiceData);
        console.log("Invoice data sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }
}
