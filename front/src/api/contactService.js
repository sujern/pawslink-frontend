import axios from "axios";

// const API_URL = 'http://localhost:8080/api/contacts';
// const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/contacts`;
const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/contacts`;

// export async function getContacts() {
//   return await axios.get(`${API_ROOT}`);
// }

export async function getContacts() {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  if (token) {
    return await axios.get(API_ROOT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  } else {
    console.error("Error fetching pets:", err);
    return err;
  }
}

// export async function postContact(data) {
//   return await axios.post(`${API_ROOT}`, data);
// }

export const postContact = async (data) => {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  return await axios.post(`${API_ROOT}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};



// export async function putContact(id, data) {
//   return await axios.put(`${API_ROOT}/${id}`, data);
// }

// export const putContact = async (id, data) => {
//   const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
//   return await axios.put(`${API_ROOT}/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const putContact = async (id, data) => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.put(`${API_ROOT}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Data being sent:", data);
    console.log("Data type:", typeof data);
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error Response:", error.response?.data || "No error data");
    console.error("Full Error Object:", error);
    throw error;
  }
};



// export async function deleteContact(id) {
//   return await axios.delete(`${API_ROOT}/${id}`);
// }

export async function deleteContact(id) {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  return await axios.delete(`${API_ROOT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
