import axios from "axios";
import {getCookie} from "cookies-next";

export const getCategoriesWithSubcategories = async () => {
    try {
        return await axios.get(process.env.API_URL + `getCategoriesWithSubcategories/${getCookie('companyId')}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });

    } catch (error) {
        console.error(error);
        return {
            data: [],
        };
    }
}

export const createCategories = async (categoriesData) => {
    try {
        const response = await axios.post(process.env.API_URL + `addCategories/${getCookie('companyId')}`, categoriesData, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Categories data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}


export const updateCategory = async (CategoryId, data) => {
    console.log(data)
    try {
        const response = await axios.post(process.env.API_URL + `updateCategory/${CategoryId}`, data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Category updated successfully", response.data);
    } catch (error) {
        console.error("Error sending category data:", error.response || error);
    }

}

export const deleteCategory = async (CategoryId) => {
    try {
        const response = await axios.delete(process.env.API_URL + `deleteCategory/${CategoryId}`, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Category deleted successfully", response.data);
    } catch (error) {
        console.error("Error sending category data:", error.response || error);
    }
}