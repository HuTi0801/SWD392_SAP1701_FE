import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/';
const axiosInstance = axios.create({ baseURL });

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post(`account/login?username=${username}&password=${password}`, {}, {
            headers: {
                'accept': '*/*'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const logout = async (authorization) => {
    try {
        const response = await axiosInstance.post(`account/logout`, {}, {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${authorization}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

