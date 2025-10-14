import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../Registrarse.css'

function Registrarse() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [fechaNac, setFechaNac] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nombres || !apellidos || !email || !password1 || !password2 || !fechaNac) {
      setError('Por favor completa todos los campos (incluida la fecha de nacimiento)')
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) {
      setError('Ingresa un correo válido')
      return
    }
    if (password1 !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }

    setError('')
    console.log('Formulario de registro válido', { nombres, apellidos, email, fechaNac, password1 })    // TODO: enviar al backend
  }

  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="Registrarse" onSubmit={handleSubmit} noValidate>
          <h1>Registrarse</h1>

          <div className="row">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
              className="form-control input-control"
              placeholder="Ingrese su nombre"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              autoComplete="given-name"
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
              autoComplete="family-name"
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
              autoComplete="email"
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
              autoComplete="bday"
              required
            />
          </div>

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
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-outline-brown toggle-password"
                aria-label={showPass1 ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={showPass1}
                onClick={() => setShowPass1(v => !v)}
              >
                {showPass1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18" />
                    <path stroke="currentColor" strokeWidth="2" d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.08A10.78 10.78 0 0112 5c5 0 9.27 3.11 11 7a12.7 12.7 0 01-4.1 4.73M6.12 7.27A12.69 12.69 0 001 12a12.7 12.7 0 004.1 4.73" />
                  </svg>
                )}
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
                autoComplete="new-password"
              />
              <button
                type="button"
                className="btn btn-outline-brown toggle-password"
                aria-label={showPass2 ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-pressed={showPass2}
                onClick={() => setShowPass2(v => !v)}
              >
                {showPass2 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Z" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M3 3l18 18" />
                    <path stroke="currentColor" strokeWidth="2" d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.08A10.78 10.78 0 0112 5c5 0 9.27 3.11 11 7a12.7 12.7 0 01-4.1 4.73M6.12 7.27A12.69 12.69 0 001 12a12.7 12.7 0 004.1 4.73" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div id="errorRegistro" className="error-alert" role="alert">
              {error}
            </div>
          )}

          <button type="submit">Enviar Registro</button>

          <Link id="linkInicio" to="/login" className="link-login">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </form>
      </section>
    </>
  )
}

export default Registrarse
