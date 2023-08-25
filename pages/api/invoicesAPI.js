import {authorizedApi } from './api';
import axios from "axios";
import {getCookie} from "cookies-next";

export const getAllDocuments = async ({CompanyId, EmployeeId}) => {

    try {
        const {data: documents} = await authorizedApi.get( `getAllDocuments/${CompanyId}/${EmployeeId}`);
        return {
            documents,
        };
    } catch (error) {
        console.error(error);
        return {
            documents: [],
        };
    }
}

export const sendInvoiceData = async (invoiceData) => {
    try {
        return await authorizedApi.post(`createInvoice/${getCookie("employeeId")}`, invoiceData);
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }
}

export const getCustomerInvoices = async (CustomerId) => {
    try {
        return await authorizedApi.get(`getCustomerInvoices/${CustomerId}`);
    } catch (error) {
        console.error("Error sending invoice data:", error.response || error);
    }

}

export const getInvoicePdf = async (InvoiceId) => {
    try {
        const { data: pdfData } = await axios.get(process.env.API_URL + `getInvoicePdf/${InvoiceId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`,
                'Accept': 'application/pdf',
            },
            responseType: 'arraybuffer',
        });

        const blob = await new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error("Error getting invoice pdf:", error.response || error);
    }
}
