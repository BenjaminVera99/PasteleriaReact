import axios from "axios";

// ✅ API base (con /api incluido)
const API_BASE_URL = "http://localhost:9090/api/auth";


export const loginRequest = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });

  const { token, role } = response.data;

  // Guardamos el token y el rol
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  return token;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    username: userData.username,
    password: userData.password,
    nombres: userData.nombres,
    apellidos: userData.apellidos,
    fechaNac: userData.fechaNac,
  });

  return response.data;
};
