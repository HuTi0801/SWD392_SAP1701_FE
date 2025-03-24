import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/mentor/';
const axiosInstance = axios.create({baseURL});

export const updateFeedbackReportMentor = async (token, mentorId, reportId, feedback) => {
    try {
        const response = await axiosInstance.post(`update-feedback-report?mentorId=${mentorId}&reportId=${reportId}&feedback=${feedback}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const viewMentorDetails = async (mentorId) => {
    try {
        const response = await axiosInstance.get(`view_mentor_details/${mentorId}`);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const viewAllReportOfMentor = async (mentorId) => {
    try {
        const response = await axiosInstance.get(`view-all-report-of-mentor?mentorId=${mentorId}`);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}


export const mentorSearch = async (expertise, minRating, year, startTime, endTime) => {
    try {
        const response = await axiosInstance.get('search', {
            params: {
                expertise,
                minRating,
                year,
                startTime,
                endTime
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const mentorGetAll = async () => {
    try {
        const response = await axiosInstance.get('get-all-mentor-from-mentor-table');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const mentorGetAllFromAccount = async () => {
    try {
        const response = await axiosInstance.get('get-all-mentor-from-account-table');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
