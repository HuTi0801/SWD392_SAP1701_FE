import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/lecturer/';
const axiosInstance = axios.create({baseURL});

export const updateFeedbackReportLecturer = async (lecturerId, reportId, feedback) => {
    try {
        const response = await axiosInstance.post(`update-feedback-report?lecturerId=${lecturerId}&reportId=${reportId}&feedback=${feedback}`);
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const lecturerGetAll = async () => {
    try {
        const response = await axiosInstance.get('get-all-lecture-from-lecturer-table');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}


export const lecturerGetAllFromAccount = async () => {
    try {
        const response = await axiosInstance.get('get-all-lecture-from-account-table');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const viewAllReportOfLecture = async (lecturerId) => {
    try {
        const response = await axiosInstance.get(`view-all-report-of-lecture?lecturerId=${lecturerId}`);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
