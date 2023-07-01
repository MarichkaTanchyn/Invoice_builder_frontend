import axios from "axios";

export const companySignup = async (data) => {
    const apiUrl = `http://localhost:3000/signUp`;

    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("response", response);
        console.log("response", response.data.message);
        return response.data.message;
    } catch (error) {
        console.error("Error in signUp process:", error.response || error);
    }
};