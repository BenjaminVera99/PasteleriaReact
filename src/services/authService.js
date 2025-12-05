import axios from "axios";

// ✅ CORRECCIÓN 1: Definimos la base de la API, que es lo que faltaba.
// Usamos "http://localhost:9090" para luego poder construir la URL de registro.
const API_BASE_URL = "http://localhost:9090";

const API_URL_AUTH = `${API_BASE_URL}/api/auth`;

// ⬇️ AJUSTADO PARA QUE MANDE LO QUE ESPERA EL BACKEND
//    Y DEVUELVA { token, role } (lo que usa InicioSesion)
export const loginRequest = async (username, password) => {
  try {
    // guestIdentifier es opcional, pero tu backend lo soporta.
    const guestIdentifier = localStorage.getItem("guestIdentifier") || null;

    const response = await axios.post(`${API_URL_AUTH}/login`, {
      username,          // 👉 mismo nombre que en InicioSesion DTO
      password,
      guestIdentifier,   // puede ir null, el backend lo maneja
    });

    // backend devuelve: { token: "...", role: "..." }
    const { token, role } = response.data;

    // Guarda el rol también
    localStorage.setItem("role", role);

    // (opcional) guardar token aquí también, por si quieres centralizar
    // localStorage.setItem("token", token);

    // 👉 IMPORTANTE: ahora devolvemos un objeto, no solo el token
    return { token, role };

  } catch (error) {
    console.error("Error en loginRequest:", error);

    // Si hay respuesta del servidor (401, 500, etc.)
    if (error.response) {
      throw new Error("Credenciales incorrectas");
    }

    // Si ni siquiera se pudo conectar (backend caído, puerto mal, etc.)
    throw new Error("No se pudo conectar con el servidor");
  }
};

export const registerUser = async (userData) => { 
  // ✅ CORRECCIÓN 2: Usamos API_BASE_URL (o API_URL_AUTH si ese es el camino correcto)
  // Asumo que el endpoint completo es: http://localhost:9090/api/auth/register
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
