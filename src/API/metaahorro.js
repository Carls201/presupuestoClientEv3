import axios from "axios";
import {getToken} from "./auth";

const API_URL = 'https://localhost:44330/api';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYXNlUHJlc3VwdWVzdG9BUEkiLCJqdGkiOiI1YzY4ZjI5NS00ZjI3LTQ3NGEtYTZhMi1hYzAzYzkzMTgwNjYiLCJpYXQiOiIwNi0xMS0yMDIzIDIxOjM4OjQzIiwiSWRVc3VhcmlvIjoiMTkiLCJFbWFpbCI6Imxlb0BtYWlsLmNvbSIsImV4cCI6MTY5OTMxMDMyMywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAxNi8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDE2LyJ9.nZFJeNq9wlHRwfT5mXcajbpArO5FzWC_qaJefyf46q4";
const config = {
    headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`
    }
}

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