import axios from "axios";

export const addProducts = async (productsData, CategoryId) => {
    const apiUrl = `http://localhost:3000/addProducts/${CategoryId}`;

    console.log(CategoryId)
    console.log("Products data sent:", productsData);
    try {
        const response = await axios.post(apiUrl, productsData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Products data sent successfully", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }

}