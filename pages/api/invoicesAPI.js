import axios from "axios";
import {getCookie} from "cookies-next";

export const getAllDocuments = async ({CompanyId, EmployeeId}) => {

    try {
        const {data: documents} = await axios.get(process.env.API_URL + `getAllDocuments/${CompanyId}/${EmployeeId}`, {
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

export const sendInvoiceData = async (invoiceData) => {
    try {
        return await axios.post(process.env.API_URL + `createInvoice/${getCookie("employeeId")}`, invoiceData, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }
}

export const getCustomerInvoices = async (CustomerId) => {
    try {
        return await axios.get(process.env.API_URL + `getCustomerInvoices/${CustomerId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }

}
