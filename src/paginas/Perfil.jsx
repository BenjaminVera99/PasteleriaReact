import React, { useEffect, useState } from "react";
import api from "../services/api"; 
import Navbar from "../componentes/Navbar";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        console.log("Error al obtener usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando perfil...</p>;

  if (!user) return <p>Error al cargar el perfil</p>;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Mi Perfil</h2>

        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
          <p><strong>Nombre:</strong> {user.nombres}</p>
          <p><strong>Apellidos:</strong> {user.apellidos}</p>
          <p><strong>Correo:</strong> {user.username}</p>
          <p><strong>Fecha de nacimiento:</strong> {user.fechaNac}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      </div>
    </>
  );
}
