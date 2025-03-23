import axios from 'axios'

const baseURL = 'http://localhost:8080/auth/v1/group/';
const axiosInstance = axios.create({ baseURL });

export const createGroup = async (groupData, token) => {
    try {
        const response = await axiosInstance.post(`create`, groupData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("API ERROR: ", error);
        throw error;
    }
}

export const getGroupInfoById = async (id, token) => {
    try {
        const response = await axiosInstance.get(`get-group-information-by/${id}`, {
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

export const removeMember = async (groupId, memberUserCode, requesterUserCode, newLeaderUserCode, token) => {
    try {
        const response = await axiosInstance.patch(`remove-member?groupId=${groupId}&memberUserCode=${memberUserCode}&requesterUserCode=${requesterUserCode}&newLeaderUserCode=${newLeaderUserCode}`, null, {
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

export const addMember = async (groupId, memberUserCode, requesterUserCode, token) => {
    try {
        const response = await axiosInstance.patch(`add-member?groupId=${groupId}&memberUserCode=${memberUserCode}&requesterUserCode=${requesterUserCode}`, null, {
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