import axios from "axios";
import {getCookie} from "cookies-next";

export const companySignup = async (data) => {
    try {
        const response = await axios.post(process.env.API_URL + `companySignup`, data, {
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

export const login = async (data) => {
    try {
        const response = await axios.post(process.env.API_URL + `signIn`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("response", response);
        return response;
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const getRegisterToken = async () => {
    try {
        return await axios.get(process.env.API_URL + `createInvite/${getCookie("companyId")}`);
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const employeeSignUp = async (data, token) => {
    try {
        const response = await axios.post(process.env.API_URL + `employeeSignup/${token}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("response", response);
        return response;
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const sendRegisterLinkViaEmail = async (email) => {
    try {
        return await axios.post(process.env.API_URL + `sendRegisterLinkViaEmail/${getCookie("companyId")}`, email, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie("accToken")}`
            }
        });
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};