import {authorizedApi } from './api';
import {getCookie} from "cookies-next";

export const addProduct = async (productsData, CategoryId) => {
    try {
        await authorizedApi.post(`addProduct/${CategoryId}`, productsData);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }

}

export const getCategoryProducts = async (CategoryId) => {
    try {
        const response = await authorizedApi.get( `getCategoryProducts/${CategoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error receiving products data:", error.response || error);
    }
}

export const deleteProducts = async (data) => {
    try {
        await authorizedApi.post( `deleteProducts`, data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const updateProducts = async (data) => {
    try {
        await authorizedApi.post(`updateProducts`, data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const getProduct = async (ProductId) => {
    try {
        const response = await authorizedApi.get(`getProduct/${ProductId}`);
        return response.data;
    } catch (error) {
        console.error("Error receiving products data:", error.response || error);
    }
}