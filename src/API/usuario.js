// usuario.js
import axios from "axios";
import { getToken } from "./auth";
const token = getToken();

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const API_URL = 'https://localhost:44330/api';

export const postUsuario = async (usuario) => {
  const response = await axios.post(`${API_URL}/usuario`, usuario);
  return response.data;
};

export const postUsuarioLogin = async (usuario) => {
  const response = await axios.post(`${API_URL}/usuario/login`, usuario);
  return response.data;
}

export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/usuario`, config);
  return response.data;
}

export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/usuario/${id}`, config);
  return response.data;
}

export const updateUsuario = async (usuario) => {
  const response = await axios.put(`${API_URL}/usuario/${usuario.idUsuario}`, usuario, config);
  return response.data;
}


