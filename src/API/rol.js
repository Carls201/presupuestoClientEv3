// rol.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'http://localhost:5259/api';

// CREAR ROL
export const postRol = async (rol) => {
  const response = await axios.post(`${API_URL}/rol`, rol, config);
  return response.data;
};

// OBTENER ROL
export const getRol = async () => {
  const response = await axios.get(`${API_URL}/rol`, config);
  return response.data;
}

// ELIMINAR ROL
export const deleteRol = async (id) => {
  const response = await axios.delete(`${API_URL}/rol/${id}`, config);
  return response.data;
}

// ACTUALIZAR ROL
export const updateRol = async (rol) => {
  const response = await axios.put(`${API_URL}/rol/${rol.idRol}`, rol, config);
  return response.data;
}
