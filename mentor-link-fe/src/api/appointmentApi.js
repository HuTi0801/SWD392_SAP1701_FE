import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/appointment/';
const axiosInstance = axios.create({baseURL});

export const requestAppointment = async (mentorId, studentId, startTime, endTime, description) => {
    try {
        console.log('Requesting appointment with params:', {
            mentorId,
            studentId,
            startTime,
            endTime,
            description
        });
        const response = await axiosInstance.post(`request-appointment`, null, {
            params: {
                mentorId,
                studentId,
                startTime,
                endTime,
                description
            }
        });
        console.log('Appointment request response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const updateStatusAppointment = async (appointmentId, status, reasonReject) => {
    try {
        const response = await axiosInstance.patch(`/mentor/update-status-appointment`, null, {
            params: {
                appointmentId,
                status,
                reasonReject,
            }
        });
        console.log('Appointment request response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const getAllAppointments = async () => {
    try {
        const response = await axiosInstance.get('mentor/get-all-appointments');
        console.log('Get all appointments response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const getAnAppointment = async (appointmentId) => {
    try {
        const response = await axiosInstance.get(`mentor/get-a-appointment-by-id?appointmentId=${appointmentId}`);
        console.log('Get appointment detail response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

