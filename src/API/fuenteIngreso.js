// metaahorro.js
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
export const postFuenteIngreso = async (data) => {
  const response = await axios.post(`${API_URL}/fuenteingreso`, data, config);
  return response.data;
};


// OBTENER META AHORRO
export const getFuenteIngreso = async () => {
  const response = await axios.get(`${API_URL}/fuenteingreso`, config);
  return response.data;
}

// ELIMINAR META AHORRO
export const deleteFuenteIngreso = async (id) => {
  const response = await axios.delete(`${API_URL}/fuenteingreso/${id}`, config);
  return response.data;
}

// ACTUALIZAR META AHORRO
export const updateFuenteIngreso = async (data) => {
  const response = await axios.put(`${API_URL}/fuenteingreso/${data.idFuente}`, data, config);
  return response.data;
}