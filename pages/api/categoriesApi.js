import axios from "axios";

export const getCategories = async ({CompanyId}) => {
    try {
        const {data: categories} = await axios.get(`http://localhost:3000/getCategories/${CompanyId}`);
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

export const createCategories = async (categoriesData, CompanyId) => {
    const apiUrl = `http://localhost:3000/addCategories/${CompanyId}`;

    console.log(CompanyId)
    console.log("Categories data sent:", categoriesData);
    try {
        const response = await axios.post(apiUrl, categoriesData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Categories data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }

}

export const getCategoryProducts = async (CategoryId) => {
    const apiUrl = `http://localhost:3000/getCategoryProducts/${CategoryId}`;

    try {
        const response = await axios.get(apiUrl);
        console.log("Categories data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending categories data:", error.response || error);
    }
}
