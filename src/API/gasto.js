// ingreso.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'https://localhost:44330/api';

// CREAR GASTO
export const postGasto = async (data) => {
  const response = await axios.post(`${API_URL}/gasto`, data, config);
  return response.data;
};


// OBTENER GASTO
export const getGasto = async () => {
  const response = await axios.get(`${API_URL}/gasto`, config);
  return response.data;
}

// ELIMINAR GASTO
export const deleteGasto = async (id) => {
  const response = await axios.delete(`${API_URL}/gasto/${id}`, config);
  return response.data;
}

// ACTUALIZAR GASTO
export const updateGasto = async (data) => {
  const response = await axios.put(`${API_URL}/gasto/${data.idGasto}`, data, config);
  return response.data;
}