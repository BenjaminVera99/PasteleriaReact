import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../Registrarse.css'
// Asumo que registerUser y loginRequest están en authService.js
import { registerUser, loginRequest } from '../services/authService'; 

export default function Registrarse() {

  const navigate = useNavigate()

  // Campos visibles del formulario
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [fechaNac, setFechaNac] = useState('')
  const [direccion, setDireccion] = useState('')
  const [password1, setPassword1] = useState('')

  const [showPass1, setShowPass1] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 👉 FUNCIÓN DE ENVÍO DEL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validaciones
    if (!nombres || !apellidos || !email || !password1 || !fechaNac || !direccion) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Limpiar errores previos
    setError('');
    setSuccess('');

    // 2. Construir el objeto de datos (PAYLOAD) con las claves que el backend espera
    // 🚨 IMPORTANTE: Mapear 'email' a 'username' y usar 'fechaNac' y 'direccion'
    const userData = {
      username: email,          // Mapea email (frontend) a username (backend)
      password: password1,      // Contraseña única
      nombres: nombres,
      apellidos: apellidos,
      fechaNac: fechaNac,       // input type="date" -> YYYY-MM-DD
      direccion: direccion
    };

    try {
      // 3. Llamar a registerUser pasando el objeto completo
      const result = await registerUser(userData);

      // ⛔ Si el backend devuelve { error: "..." }
      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess("Registro exitoso. Iniciando sesión...");

      // ✓ Registro OK → iniciar sesión automáticamente
      // loginRequest espera (username, password)
      const { token, role } = await loginRequest(email, password1);
      
      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      localStorage.setItem("username", email);

      navigate("/");

    } catch (err) {
      console.error('Error de registro o red:', err);
      
      const backendError = err.response?.data?.error || err.message;
      
      if (backendError) {
        setError(`Error al registrar: ${backendError}`);
      } else {
        setError("Error de conexión con el servidor. Intenta más tarde.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="Registrarse" onSubmit={handleSubmit} noValidate>
          <h1>Registrarse</h1>

          {/* CAMPOS DEL FORMULARIO */}
          <div className="row">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              className="form-control input-control"
              placeholder="Ingrese su nombre"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              className="form-control input-control"
              placeholder="Ingrese su apellido"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="emailRegistro">Correo</label>
            <input
              type="email"
              id="emailRegistro"
              className="form-control input-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="fechaNac">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNac"
              className="form-control input-control"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              className="form-control input-control"
              placeholder="Ingrese su dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="row">
            <label htmlFor="password1">Contraseña</label>
            <div className="input-group password-group">
              <input
                type={showPass1 ? 'text' : 'password'}
                id="password1"
                className="form-control input-control"
                placeholder="Ingrese su contraseña"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPass1(v => !v)}
              >
                {showPass1 ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* MENSAJES */}
          {error && <div className="error-alert">{error}</div>}
          {success && <div className="success-alert">{success}</div>}

          <button type="submit">Enviar Registro</button>

          <Link id="linkInicio" to="/login" className="link-login">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </form>
      </section>
    </>
  )
}
