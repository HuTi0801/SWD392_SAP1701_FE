import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/lecturer/';
const axiosInstance = axios.create({baseURL});

export const lecturerGetAll = async () => {
    try {
        const response = await axiosInstance.get('get-all');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
