import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Imagenes/Mil Sabores.png'
import carrito from '../assets/Imagenes/shopping_bag_24dp_8B4513_FILL0_wght400_GRAD0_opsz24.png'
import Navbar from '../componentes/Navbar'


function Registrarse() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validación simple
    if (!nombres || !apellidos || !email || !password1 || !password2) {
      setError('Por favor completa todos los campos')
      return
    }
    if (password1 !== password2) {
      setError('Las contraseñas no coinciden')
      return
    }

    setError('')
    console.log('Formulario de registro válido', { nombres, apellidos, email, password1 })
    // Aquí conectarías con backend
  }

  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="Registrarse" onSubmit={handleSubmit}>
          <h1>Registrarse</h1>

          <div className="row">
            <label htmlFor="nombres">Nombres</label>
            <input
              type="text"
              id="nombres"
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
              placeholder="Ingrese su apellido"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="email">Correo</label>
            <input
              type="text"
              id="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="password1">Contraseña</label>
            <input
              type="password"
              id="password1"
              placeholder="Ingrese su contraseña"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="password2">Repetir Contraseña</label>
            <input
              type="password"
              id="password2"
              placeholder="Ingrese su contraseña nuevamente"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <p id="errorRegistro">{error}</p>
          <button type="submit">Enviar Registro</button>
          <Link id="linkInicio" to="/login">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </form>
      </section>
    </>
  )
}

export default Registrarse
