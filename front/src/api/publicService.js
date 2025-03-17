import axios from "axios";

// const API_URL = 'http://localhost:8080/api/public';
// const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/public`;
const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/public`;

export async function getPublicPet(profileUrl) {
  return await axios.get(`${API_ROOT}/${profileUrl}`);
}
