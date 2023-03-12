import axios from "axios";

export const getCategories = async ({CompanyId}) => {
    try {
        const { data: categories } = await axios.get(`http://localhost:3000/getCategories/${CompanyId}`);
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
}
