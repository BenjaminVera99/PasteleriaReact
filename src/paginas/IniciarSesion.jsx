// src/paginas/IniciarSesion.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../IniciarSesion.css'

function InicioSesion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor ingrese correo y contraseña')
      return
    }
    setError('')
    console.log('Iniciando sesión con', email, password)
  }

  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="IniciarSesion" onSubmit={handleSubmit} noValidate>
          <h1>Iniciar Sesión</h1>

          {/* Correo */}
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
              aria-invalid={!!error && !email}
            />
          </div>

          {/* Contraseña con Bootstrap input-group */}
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
                aria-invalid={!!error && !password}
              />
              <button
                type="button"
                className="btn btn-outline-brown toggle-password"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(v => !v)}
              >
                {showPassword ? (
                  // ojo abierto
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  // ojo tachado
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18" />
                    <path stroke="currentColor" strokeWidth="2" d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.08A10.78 10.78 0 0112 5c5 0 9.27 3.11 11 7a12.7 12.7 0 01-4.1 4.73M6.12 7.27A12.69 12.69 0 001 12a12.7 12.7 0 004.1 4.73" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error pastel */}
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

export default InicioSesion
