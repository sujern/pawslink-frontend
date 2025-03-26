import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_ROOT
  ? `${import.meta.env.VITE_API_ROOT}/api/pets`
  : "http://localhost:8080/api/pets";

export async function getPets(page = 0, size = 5) {

  const token = localStorage.getItem("access_token");
  if (token) {
    return await axios.get(API_ROOT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

  } else {
    return err;
  }
}

export async function getPetById(petId) {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      return await axios.get(`${API_ROOT}/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (err) {
    throw err;
  }
}

export async function deletePets(petId) {
  const token = localStorage.getItem("access_token");
  return await axios.delete(`${API_ROOT}/${petId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const createPet = async (petData) => {
  const token = localStorage.getItem("access_token");
  return await axios.post(`${API_ROOT}`, petData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putPet = async (petId, data) => {
  const token = localStorage.getItem("access_token");
  return await axios.put(`${API_ROOT}/${petId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};