import axios from "axios";

const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/public/generate-qr`;

export async function getQRcode(profileUrl) {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const response = await axios.get(`${API_ROOT}?profileUrl=${profileUrl}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    return URL.createObjectURL(response.data);
  } catch (err) {
    return null;
  }
}