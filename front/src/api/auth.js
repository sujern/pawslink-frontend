import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ROOT}/api`;

export const apiLogin = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const apiGetUser = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${API_URL}/login/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};