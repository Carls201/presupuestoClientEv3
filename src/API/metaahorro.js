import axios from "axios";
import {getToken} from "./auth";
const token = getToken();

const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const API_URL = 'https://localhost:44330/api';

//GET
export const getMetaAhorro = async() => {
    const response = await axios.get(`${API_URL}/MetaAhorro`);
    return response.data;
}

// POST
export const postMetaAhorro = async (metaahorro) => {
    const response = await axios.post(`${API_URL}/MetaAhorro`, metaahorro, config);
    return response.data;
}

// DELETE
export const deleteMetaAhorro = async (idMetaAhorro) => {
    const response = await axios.delete(`${API_URL}/MetaAhorro/${idMetaAhorro}`, config);
    return response.data;
}

//PUT
export const putMetaAhorro = async (idMetaAhorro) => {
    const response = await axios.put(`${API_URL}/MetaAhorro/${idMetaAhorro}`, config);
    return response.data;
}

// GET POR ID
export const getIdMetaAhorro = async (idMetaAhorro) => {
    const response = await axios.get(`${API_URL}/MetaAhorro/${idMetaAhorro}`, config);
    return response.data;
}