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

export const getInvoicePdf = async (InvoiceId) => {
    try {
        const { data: pdfData } = await axios.get(process.env.API_URL + `getInvoicePdf/${InvoiceId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`,
                'Accept': 'application/pdf',
            },
            responseType: 'arraybuffer', // This is important because the data is a PDF file
        });

        // This will create a blob URL for the PDF
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        return url;
    } catch (error) {
        console.error("Error getting invoice pdf:", error.response || error);
    }
}
