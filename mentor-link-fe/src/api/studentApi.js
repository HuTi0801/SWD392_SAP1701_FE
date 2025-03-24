import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/student/';
const axiosInstance = axios.create({ baseURL });

export const viewAllReportStudent = async (accountSudentId) => {
    try {
        const response = await axiosInstance.get(`view-all-report-of-student?accountSudentId=${accountSudentId}`);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
