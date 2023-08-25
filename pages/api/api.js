import axios from 'axios';
import {getCookie} from "cookies-next";

const baseConfig = {
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

// API instance for non-authorized requests
const api = axios.create(baseConfig);

// API instance for authorized requests
const authorizedApi = axios.create(baseConfig);

// Using an interceptor to attach the Authorization header dynamically to the authorizedApi instance
authorizedApi.interceptors.request.use(config => {
    const token = getCookie("accToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { api, authorizedApi };


