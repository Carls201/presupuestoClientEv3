// metaahorro.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'http://localhost:5259/api';

// CREAR META AHORRO
export const postMetaAhorro = async (data) => {
  const response = await axios.post(`${API_URL}/metaahorro`, data, config);
  return response.data;
};


// OBTENER META AHORRO
export const getMetaAhorro = async () => {
  const response = await axios.get(`${API_URL}/metaahorro`, config);
  return response.data;
}

// ELIMINAR META AHORRO
export const deleteMetaAhorro = async (id) => {
  const response = await axios.delete(`${API_URL}/metaahorro/${id}`, config);
  return response.data;
}

// ACTUALIZAR META AHORRO
export const updateMetaAhorro = async (data) => {
  const response = await axios.put(`${API_URL}/metaahorro/${data.idMeta}`, data, config);
  return response.data;
}