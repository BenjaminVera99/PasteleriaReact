import axios from "axios";

const API_URL = "http://localhost:9090/auth";

export const loginRequest = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });

  // Guarda el rol también
  localStorage.setItem("role", response.data.role);

  return response.data.token;
};

export const registerUser = async (email, password, nombres, apellidos, fechaNac) => {
  const response = await axios.post(`http://localhost:9090/auth/register`, {
    username: email,
    password: password,
    nombres,
    apellidos,
    fechaNac
  });

  return response.data;
};
