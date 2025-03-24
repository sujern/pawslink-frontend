import axios from "axios";
const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/register`;


export async function getContacts() {
    const token = localStorage.getItem("access_token");
    if (token) {
        return await axios.get(API_ROOT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    } else {
        return err;
    }
}