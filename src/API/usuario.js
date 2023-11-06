import axios from "axios";

const API_URL = 'https://localhost:44330/api';

export const postUsuario = async (usuario) => {
  const response = await axios.post(`${API_URL}/usuario`, usuario);
  return response.data;
};

export const postUsuarioLogin = async (usuario) => {
  const response = await axios.post(`${API_URL}/usuario/login`, usuario);
  return response.data;
}