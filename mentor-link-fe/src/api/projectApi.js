import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/';
const axiosInstance = axios.create({baseURL});

export const projectCreate = async (groupId, topicName, description, lecturerId, requesterUserCode) => {
    try {
        const response = await axiosInstance.post('project/create', '', {
            params: {
                groupId,
                topicName,
                description,
                lecturerId,
                requesterUserCode
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const updateStatusProject = async (projectId, status, reasonReject) => {
    try {
        const response = await axiosInstance.post('project/create', '', {
            params: {
                projectId,
                status,
                reasonReject,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const searchProject = async (projectName, status) => {
    try {
        const response = await axiosInstance.get('project/search-project', {
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

export const getAllProjectsLecturer = async () => {
    try {
        const response = await axiosInstance.get('project/lecturer/get-all-project');
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
