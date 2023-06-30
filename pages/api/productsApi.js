import axios from "axios";

export const addProduct = async (productsData, CategoryId) => {
    const apiUrl = `http://localhost:3000/addProduct/${CategoryId}`;

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

export const getCategoryProducts = async (CategoryId) => {
    const apiUrl = `http://localhost:3000/getCategoryProducts/${CategoryId}`;
    try {
        const response = await axios.get(apiUrl);
        console.log("Products data received successfully", response.data);

        return response.data;
    } catch (error) {
        console.error("Error receiving products data:", error.response || error);
    }
}

export const deleteProducts = async (data) => {
    const apiUrl = `http://localhost:3000/deleteProducts`;
    console.log("Products data sent:", data);
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Products data deleted", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}

export const updateProducts = async (data) => {
    const apiUrl = `http://localhost:3000/updateProducts`;
    console.log("Products data sent:", data);
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Products data updated", response.data);
    } catch (error) {
        console.error("Error sending products data:", error.response || error);
    }
}