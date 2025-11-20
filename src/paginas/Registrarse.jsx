import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../Registrarse.css'
import { registerUser, loginRequest } from '../services/authService';

export default function Registrarse() {

  const navigate = useNavigate()

  // Campos visibles del formulario
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [fechaNac, setFechaNac] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 👉 FUNCIÓN DE ENVÍO DEL FORMULARIO
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nombres || !apellidos || !email || !password1 || !password2 || !fechaNac) {
    setError("Por favor completa todos los campos");
    return;
  }

  if (password1 !== password2) {
    setError("Las contraseñas no coinciden");
    return;
  }

  try {
    const result = await registerUser(email, password1);

    // ⛔ Si el backend devuelve { error: "..." }
    if (result.error) {
      setError(result.error);
      return;
    }

    // ✓ Registro OK → iniciar sesión automáticamente
    const token = await loginRequest(email, password1);
    localStorage.setItem("token", token);

    navigate("/");

  } catch (err) {
    // Aquí capturamos errores reales de red o backend
    console.log(err);

    if (err.response?.data?.error) {
      setError(err.response.data.error); // mostrar mensaje correcto
    } else {
      setError("Error al registrar usuario");
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
            <input type="text" id="nombres" className="form-control input-control"
              placeholder="Ingrese su nombre"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" id="apellidos" className="form-control input-control"
              placeholder="Ingrese su apellido"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="emailRegistro">Correo</label>
            <input type="email" id="emailRegistro" className="form-control input-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="fechaNac">Fecha de nacimiento</label>
            <input type="date" id="fechaNac" className="form-control input-control"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
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
              <button type="button" className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPass1(v => !v)}>
                {showPass1 ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <div className="row">
            <label htmlFor="password2">Repetir Contraseña</label>
            <div className="input-group password-group">
              <input
                type={showPass2 ? 'text' : 'password'}
                id="password2"
                className="form-control input-control"
                placeholder="Ingrese su contraseña nuevamente"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button type="button" className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPass2(v => !v)}>
                {showPass2 ? "Ocultar" : "Ver"}
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
