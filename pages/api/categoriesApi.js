import axios from "axios";
import {getCookie} from "cookies-next";

export const getCategories = async () => {
    try {
        const {data: categories} = await axios.get(`http://localhost:3000/getCategories/${getCookie('companyId')}`, {
            headers: {
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        return {
            props: {
                categories,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                categories: [],
            },
        };
    }
};

export const getCategoriesWithSubcategories = async () => {
    try {
        return await axios.get(`http://localhost:3000/getCategoriesWithSubcategories/${getCookie('companyId')}`, {
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
    const apiUrl = `http://localhost:3000/addCategories/${getCookie('companyId')}`;

    try {
        const response = await axios.post(apiUrl, categoriesData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
        console.log("Categories data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}
