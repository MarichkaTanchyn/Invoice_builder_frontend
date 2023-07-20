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
