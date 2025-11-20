import axios from "axios";

const API_URL = "http://localhost:9090/auth";

export const loginRequest  = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.token; // ← devuelve solo el token
};

export const registerUser = async (email, password) => {
  const response = await axios.post(`http://localhost:9090/auth/register`, {
    username: email,
    password: password
  });

  return response.data; // puede contener "message" o "error"
};
