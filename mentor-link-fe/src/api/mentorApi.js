import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/';
const axiosInstance = axios.create({baseURL});

export const mentorSearch = async (token, expertise, minRating, year, startTime, endTime) => {
    try {
        const response = await axiosInstance.get('mentor/search', {
            headers: {
                Authorization: `Bearer ${token}`
            },
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

