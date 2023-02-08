import axios from "axios";

export const getCategories = async ({id}) => {
    try {
        const { data: categories } = await axios.get(`http://localhost:3000/getCategories/${id}`);
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
