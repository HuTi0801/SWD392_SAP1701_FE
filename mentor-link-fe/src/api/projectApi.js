import axios from 'axios'

const baseURL = 'http://localhost:8080/v1';
const axiosInstance = axios.create({baseURL});

export const getAllProjects = async () => {
    try {
        const response = await axiosInstance.get('/project/get-all-project');
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const searchProject = async (projectName, status) => {
    try {
        const response = await axiosInstance.get('/project/search-project', {
            params: {
                projectName,
                status
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}