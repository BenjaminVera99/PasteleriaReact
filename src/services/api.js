import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090",
});

// 👉 INTERCEPTOR DE REQUEST: agrega el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 INTERCEPTOR DE RESPUESTA: si el token expira → cerrar sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem("token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
