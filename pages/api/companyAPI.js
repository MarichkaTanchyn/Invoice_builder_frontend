import {authorizedApi} from './api';
import {getCookie} from "cookies-next";

export const getCompanyData = async () => {
    try {
        const data = await authorizedApi.get(`getCompany/${getCookie('companyId')}`);
        return {
            data: data.data,
        };
    } catch (error) {
        console.error(error);
        return {
            data: []
        };
    }
};

export const updateCompanyData = async (data) => {
    try {
        return await authorizedApi.post(`updateCompany/${getCookie('companyId')}`, data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}