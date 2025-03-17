import axios from "axios";

const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/scan-records`;

export const saveScanRecord = async (petId, latitude, longitude) => {
    try {
      const response = await axios.post(`${API_ROOT}`, {
        petId,
        latitude,
        longitude,
      });
      console.log("Scan record saved successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving scan record:", error);
      throw error;
    }
};

export async function getScanRecord() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.get(`${API_ROOT}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching scan records:", error);
      throw error;
    }
  }