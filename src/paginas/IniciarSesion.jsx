import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Imagenes/Mil Sabores.png'
import carrito from '../assets/Imagenes/shopping_bag_24dp_8B4513_FILL0_wght400_GRAD0_opsz24.png'



function InicioSesion() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
        setError('Por favor ingrese correo y contraseña')
        } else {
        setError('')
        console.log('Iniciando sesión con', email, password)
        }
    }

   return (
    <>
      <section id="bannerArriba">
        <nav className="nav2">
          <img src={logo} alt="Pastelería Mil Sabores Logo" className="logo" />
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Crear Perfil</Link>
        </nav>

        <nav className="nav1">
          <Link to="/">Home</Link>
          <Link to="/about">Sobre Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrito">
            <img src={carrito} alt="Carrito" />
          </Link>
          <Link to="/carrito">Carrito de Compras</Link>
        </nav>
      </section>

      <section id="Formularios">
        <form id="IniciarSesion" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          <div className="row">
            <label htmlFor="email">Correo</label>
            <input
              type="text"
              id="emailSesion"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="passwordSesion"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p id="errorSesion">{error}</p>
          <button type="submit">Iniciar Sesión</button>
          <Link id="linkRegistro" to="/registro">
            ¿No tienes cuenta? Regístrate
          </Link>
        </form>
      </section>
    </>
  )
}

export default InicioSesion