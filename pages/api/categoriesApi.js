import {authorizedApi } from './api';
import {getCookie} from "cookies-next";

export const getCategoriesWithSubcategories = async () => {
    try {
        return await authorizedApi.get(`getCategoriesWithSubcategories/${getCookie('companyId')}`);
    } catch (error) {
        console.error(error);
        return {
            data: [],
        };
    }
}

export const createCategories = async (categoriesData) => {
    try {
        await authorizedApi.post(`addCategories/${getCookie('companyId')}`, categoriesData);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}


export const updateCategory = async (CategoryId, data) => {
    try {
        await authorizedApi.post(`updateCategory/${CategoryId}`, data);
    } catch (error) {
        console.error("Error sending category data:", error.response || error);
    }

}

export const deleteCategory = async (CategoryId) => {
    try {
        await authorizedApi.delete(`deleteCategory/${CategoryId}`);
    } catch (error) {
        console.error("Error sending category data:", error.response || error);
    }
}