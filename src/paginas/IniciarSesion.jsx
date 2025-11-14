import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../IniciarSesion.css'
import { loginRequest } from '../services/authService'

export default function InicioSesion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Por favor ingrese correo y contraseña')
      return
    }

    try {
      setError('')

      // 🔥 LLAMADA AL BACKEND SPRING BOOT
      const token = await loginRequest(email, password)

      // 🔥 PASO 8.2 → GUARDAR TOKEN JWT
      localStorage.setItem("token", token)

      // 🔥 REDIRECCIÓN AUTOMÁTICA AL CRUD
      navigate("/admin")  // ← cambia a la ruta de tu CRUD real

    } catch (err) {
      setError("Credenciales incorrectas")
    }
  }

  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="IniciarSesion" onSubmit={handleSubmit} noValidate>
          <h1>Iniciar Sesión</h1>

          <div className="row">
            <label htmlFor="emailSesion">Correo</label>
            <input
              type="email"
              id="emailSesion"
              className="form-control input-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="row">
            <label htmlFor="passwordSesion">Contraseña</label>
            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="passwordSesion"
                className="form-control input-control"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div id="errorSesion" className="error-alert" role="alert">
              {error}
            </div>
          )}

          <button type="submit">Iniciar Sesión</button>

          <Link id="linkRegistro" to="/registro" className="link-registro">
            ¿No tienes cuenta? Regístrate
          </Link>
        </form>
      </section>
    </>
  )
}
