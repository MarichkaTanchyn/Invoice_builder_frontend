import { api, authorizedApi } from './api';
import {getCookie} from "cookies-next";

export const companySignup = async (data) => {
    try {
        const response = await api.post(`companySignup`, data);
        return response.data.message;
    } catch (error) {
        console.error("Error in signUp process:", error.response || error);
    }
};

export const login = async (data) => {
    try {
        return await api.post(`signIn`, data);
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const getRegisterToken = async () => {
    try {
        return await api.get(`createInvite/${getCookie("companyId")}`);
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const employeeSignUp = async (data, token) => {
    try {
        return await api.post(`employeeSignup/${token}`, data);
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};

export const sendRegisterLinkViaEmail = async (email) => {
    try {
        return await authorizedApi.post(`sendRegisterLinkViaEmail/${getCookie("companyId")}`, email);
    } catch (error) {
        console.error("Error in login process:", error.response || error);
    }
};