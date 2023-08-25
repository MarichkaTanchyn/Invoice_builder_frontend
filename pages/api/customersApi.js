import {authorizedApi} from './api';
import {getCookie} from "cookies-next";

export const getCustomers = async () => {
    try {
        const {data: customers} = await authorizedApi.get(`getCompanyCustomers/${getCookie('companyId')}`);
        return {
            customers,
        };
    } catch (error) {
        console.error(error);
        return {
            customers: [],
        };
    }
}

export const getCustomer = async (CustomerId) => {
    try {
        return await authorizedApi.get(`getCustomer/${CustomerId}`);
    } catch (error) {
        console.error(error);
    }
}

export const addCustomer = async (data) => {
    try {
        return await authorizedApi.post(`addCustomer/${getCookie('companyId')}`, data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}

export const updateCustomer = async (CustomerId, data) => {
    try {
        return await authorizedApi.post(`updateCustomer/${CustomerId}`, data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}