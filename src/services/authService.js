import axios from "axios";

const API_URL = "http://localhost:9090/auth";

export const loginRequest  = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.token; // ← devuelve solo el token
};

export const registerUser = async (email, password) => {
  return await axios.post(`${API_URL}/register`, {
    username: email,
    password: password
  });
};