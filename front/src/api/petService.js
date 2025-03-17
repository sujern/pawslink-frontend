import axios from "axios";

// const API_ROOT = 'http://localhost:8080/api/pets';
// const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pets`;
// const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/pets`;
const API_ROOT = import.meta.env.VITE_API_ROOT
  ? `${import.meta.env.VITE_API_ROOT}/api/pets`
  : "http://localhost:8080/api/pets";


// export async function getPets() {
//   const token = localStorage.getItem("token");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   try {
//     return await axios.get(API_ROOT, { headers });
//   } catch (error) {
//     console.error("Error fetching pets:", error);
//     throw error;
//   }
// }

// export async function getPets() {
//   try {
//     const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
//     const response = await axios.get(`${API_ROOT}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (err) {
//     console.error("Error fetching pets:", err);
//     throw err;
//   }
// }


// export async function getPets(token) {
//   if (!token) throw new Error("No access token found");
//   console.log("API Call Headers:", {
//     Authorization: `Bearer ${token}`,
//   });
//   return await axios.get(`${API_ROOT}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }

export async function getPets() {

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


// export async function getPetById(petId) {
//   try {
//     const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
//     const response = await axios.get(`${API_ROOT}/${petId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (err) {
//     console.error("Error fetching pet by ID:", err);
//     throw err;
//   }
// }

export async function getPetById(petId) {
  try {
    const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
    if (token) {
      return await axios.get(`${API_ROOT}/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (err) {
    console.error("Error fetching pets:", err);
    throw err;
  }
}

export async function deletePets(petId) {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  return await axios.delete(`${API_ROOT}/${petId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const createPet = async (petData) => {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  return await axios.post(`${API_ROOT}`, petData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putPet = async (petId, data) => {
  const token = localStorage.getItem("access_token"); // ใช้ getItem แทน
  return await axios.put(`${API_ROOT}/${petId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};


// return await axios.get(`${API_ROOT}`);
// return await axios.get(`${API_ROOT}`, {
//   headers: { Authorization: `Bearer ${token}` },
// });




// export async function getPetById(petId) {
//   // return await axios.get(`${API_ROOT}/${petId}`);
//   try {
//     const token = localStorage.setItem("access_token");
//     const response = await axios.get(`${API_ROOT}/${petId}`,
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//     return response.data;
//   } catch (err) {
//     console.error("Error fetching petsID:", error)
//     throw err;
//   }
// }

// export async function deletePets(petId) {
//   const token = localStorage.setItem("access_token");
//   return await axios.delete(`${API_ROOT}/${petId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// }

// export const createPet = async (petData) => {
//   const token = localStorage.setItem("access_token");
//   return await axios.post(`${API_ROOT}`, petData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`
//     },
//   });
// };

// export const putPet = async (petId, data) => {
//   const token = localStorage.setItem("access_token");
//   return await axios.put(`${API_ROOT}/${petId}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`
//     },
//   });
// };
