import axios from "axios";
import {getCookie} from "cookies-next";

export const getAllDocuments = async ({CompanyId, EmployeeId}) => {
    try {
        console.log(CompanyId, EmployeeId)
        const { data: documents } = await axios.get(`http://localhost:3000/getAllDocuments/${CompanyId}/${EmployeeId}`,
            {
                headers: {
                    'Authorization': `Bearer ${getCookie("accToken")}`
                }
            });
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
    const apiUrl = `http://localhost:3000/createInvoice/${EmployeeId}`;

    try {
        const response = await axios.post(apiUrl, invoiceData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie("accToken")}`
                }
            });
        console.log("Invoice data sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }
}

export const getCustomerInvoices = async (CustomerId) => {
    const apiUrl = `http://localhost:3000/getCustomerInvoices/${CustomerId}`;

    try {
        return await axios.get(apiUrl,
            {
                headers: {
                    'Authorization': `Bearer ${getCookie("accToken")}`
                }
            });
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }

}
