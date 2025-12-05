// src/paginas/Perfil.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../componentes/Navbar";

const API_BASE_URL = "http://localhost:9090"; // mismo host/puerto que authService

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // Si no hay token, no hay sesión
        if (!token) {
          setLoading(false);
          return;
        }

        // Llamamos directo al backend: GET /api/auth/me
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // MUY IMPORTANTE
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Cargando perfil...
        </p>
      </>
    );

  if (!user)
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          Debes iniciar sesión para ver tu perfil.
        </p>
      </>
    );

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Mi Perfil</h2>

        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
          <p>
            <strong>Nombre:</strong> {user.nombres}
          </p>
          <p>
            <strong>Apellidos:</strong> {user.apellidos}
          </p>
          <p>
            <strong>Correo:</strong> {user.username}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong> {user.fechaNac}
          </p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
        </div>
      </div>
    </>
  );
}
