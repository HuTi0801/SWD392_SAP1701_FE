import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/checkpoints/';
const axiosInstance = axios.create({baseURL});

export const getGroupTasks = async (studentId) => {
    try {
        const response = await axiosInstance.get(`group-tasks?studentId=${studentId}`);
        console.log('Appointment request response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
