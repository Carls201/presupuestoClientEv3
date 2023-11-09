// ahorro.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'https://localhost:44330/api';

// CREAR META AHORRO
export const postAhorro = async (data) => {
  const response = await axios.post(`${API_URL}/ahorro`, data, config);
  return response.data;
};


// OBTENER META AHORRO
export const getAhorro = async () => {
  const response = await axios.get(`${API_URL}/ahorro`, config);
  return response.data;
}

// ELIMINAR META AHORRO
export const deleteAhorro = async (id) => {
  const response = await axios.delete(`${API_URL}/ahorro/${id}`, config);
  return response.data;
}

// ACTUALIZAR META AHORRO
export const updateAhorro = async (data) => {
  const response = await axios.put(`${API_URL}/ahorro/${data.idAhorro}`, data, config);
  return response.data;
}