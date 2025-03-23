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
        console.log('Project Create Response:', response.data);
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
        console.log('Update Status Response:', response.data);
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
        console.log('Search Project Response:', response.data);
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
        console.log('Get All Projects Response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const getProjectLecturer = async (id, token) => {
    try {
        const response = await axiosInstance.get(`project/lecturer/get-a-project?projectId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Get Project Lecturer Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const updateStatusProjectLecturer = async (projectId, status, reasonReject = null, token) => {
    try {
        const params = {
            projectId,
            status
        };
        
        if (reasonReject) {
            params.reasonReject = reasonReject;
        }

        const response = await axiosInstance.patch('project/lecturer/update-status-project', '', {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Update Status Project Lecturer Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

