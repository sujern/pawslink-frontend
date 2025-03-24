import axios from "axios";

const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/contacts`;

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

export const postContact = async (data) => {
  const token = localStorage.getItem("access_token");
  return await axios.post(`${API_ROOT}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putContact = async (id, data) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.put(`${API_ROOT}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export async function deleteContact(id) {
  const token = localStorage.getItem("access_token");
  return await axios.delete(`${API_ROOT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
