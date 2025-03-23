import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/mentor/';
const axiosInstance = axios.create({baseURL});

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
        const response = await axiosInstance.get('get-all');
        return response.data.result || [];
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
