import axios from "axios";

const API_ROOT = `${import.meta.env.VITE_API_ROOT}/api/public`;

export async function getPublicPet(profileUrl) {
  return await axios.get(`${API_ROOT}/${profileUrl}`);
}
