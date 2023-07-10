import axios from "axios";
import {getCookie} from "cookies-next";

export const addProduct = async (productsData, CategoryId) => {
    console.log(CategoryId)
    console.log("Products data sent:", productsData);
    try {
        const response = await axios.post(process.env.API_URL + `addProduct/${CategoryId}`, productsData, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }

}

export const getCategoryProducts = async (CategoryId) => {
    try {
        const response = await axios.get(process.env.API_URL + `getCategoryProducts/${CategoryId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data received successfully", response.data);

        return response.data;
    } catch (error) {
        console.error("Error receiving products data:", error.response || error);
    }
}

export const deleteProducts = async (data) => {
    console.log("Products data sent:", data);
    try {
        const response = await axios.post(process.env.API_URL + `deleteProducts`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data deleted", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const updateProducts = async (data) => {
    console.log("Products data sent:", data);
    try {
        const response = await axios.post(process.env.API_URL + `updateProducts`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Products data updated", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const getProduct = async (ProductId) => {
    try {
        const response = await axios.get(process.env.API_URL + `getProduct/${ProductId}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error receiving products data:", error.response || error);
    }
}