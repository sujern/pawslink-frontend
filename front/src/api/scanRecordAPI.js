import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ROOT}/api/scan-records`;

export const getScanStatistics = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};