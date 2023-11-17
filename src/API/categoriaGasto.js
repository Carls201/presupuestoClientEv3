// categoriaGasto.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'http://localhost:5259/api';

// CREAR CATEGORIA GASTO
export const postCategoriaGasto = async (data) => {
  const response = await axios.post(`${API_URL}/categoriagasto`, data, config);
  return response.data;
};


// OBTENER CATEGORIA GASTO
export const getCategoriaGasto = async () => {
  const response = await axios.get(`${API_URL}/categoriagasto`, config);
  return response.data;
}

// ELIMINAR CATEGORIA GASTO
export const deleteCategoriaGasto = async (id) => {
  const response = await axios.delete(`${API_URL}/categoriagasto/${id}`, config);
  return response.data;
}

// ACTUALIZAR CATEGORIA GASTO
export const updateCategoriaGasto = async (data) => {
  const response = await axios.put(`${API_URL}/categoriagasto/${data.idCategoria}`, data, config);
  console.log(response.data);
  return response.data;
}