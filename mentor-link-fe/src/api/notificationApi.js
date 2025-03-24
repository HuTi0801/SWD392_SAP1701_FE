import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/notification/';
const axiosInstance = axios.create({baseURL});

export const updateStatusNotif = async (notificationId) => {
    try {
        const response = await axiosInstance.post(`system/update-status-notifi?notificationId=${notificationId}`);
        return response.data.result;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const sendNotifMentorLecturer = async () => {
    try {
        const response = await axiosInstance.post('system/send-notifi-proj');
        return response.data.result;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const sendNotifAppointmentStudent = async (appointmentId, studentId) => {
    try {
        const response = await axiosInstance.post(`system/send-notifi-appointment-to-student?appointmentId=${appointmentId}&studentId=${studentId}`);
        return response.data.result;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const getNotifByAccountId = async (accountId) => {
    try {
        const response = await axiosInstance.get(`get-by-account/${accountId}`);
        return response.data.result;  // This returns the array of notifications directly
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}
