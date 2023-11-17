// ingreso.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'http://localhost:5259/api';

// CREAR INGRESO
export const postIngreso = async (data) => {
  const response = await axios.post(`${API_URL}/ingreso`, data, config);
  return response.data;
};


// OBTENER INGRESO
export const getIngreso = async () => {
  const response = await axios.get(`${API_URL}/ingreso`, config);
  return response.data;
}

// ELIMINAR INGRESO
export const deleteIngreso = async (id) => {
  const response = await axios.delete(`${API_URL}/ingreso/${id}`, config);
  return response.data;
}

// ACTUALIZAR INGRESO
export const updateIngreso = async (data) => {
  const response = await axios.put(`${API_URL}/ingreso/${data.idIngreso}`, data, config);
  return response.data;
}