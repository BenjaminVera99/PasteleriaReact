import axios from "axios";

// ✅ CORRECCIÓN 1: Definimos la base de la API, que es lo que faltaba.
// Usamos "http://localhost:9090" para luego poder construir la URL de registro.
const API_BASE_URL = "http://localhost:9090";

const API_URL_AUTH = `${API_BASE_URL}/auth`;


export const loginRequest = async (username, password) => {
  const response = await axios.post(`${API_URL_AUTH}/login`, { username, password });

  // Guarda el rol también
  localStorage.setItem("role", response.data.role);

  return response.data.token;
};


export const registerUser = async (userData) => { 
  // ✅ CORRECCIÓN 2: Usamos API_BASE_URL (o API_URL_AUTH si ese es el camino correcto)
  // Asumo que el endpoint completo es: http://localhost:9090/auth/register
  const response = await axios.post(`${API_URL_AUTH}/register`, {
    // Utilizamos las claves del objeto userData directamente:
    username: userData.username, 
    password: userData.password,
    nombres: userData.nombres,
    apellidos: userData.apellidos,
    fechaNac: userData.fechaNac
  });

  return response.data;
};