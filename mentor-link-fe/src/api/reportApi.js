import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/report/';
const axiosInstance = axios.create({ baseURL });

export const reportCreate = async (studentId, groupId, projectId, receiverId, receiverType, title, content) => {
    try {
        const response = await axiosInstance.post(`student/create-report?studentId=${studentId}&groupId=${groupId}&projectId=${projectId}&receiverId=${receiverId}&receiverType=${receiverType}&title=${title}&content=${content}`);
        console.log('Project Create Response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}


