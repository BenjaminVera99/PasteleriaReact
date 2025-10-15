import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Contacto.css'  
import Footer from '../componentes/Footer'
import Navbar from '../componentes/Navbar'


export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Mensaje enviado:', { nombre, email, mensaje })
    setEnviado(true)
    setNombre('')
    setEmail('')
    setMensaje('')
  }

  return (
    <>
      <Navbar/>

      <section id="contacto">
        <h1>Contacto</h1>
        <h2>Encuéntranos Aquí</h2>
        <iframe
          title="Ubicación Pastelería Mil Sabores"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d829.009018314068!2d-71.27167281005897!3d-33.785566616595666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9663ab696d638d1d%3A0x9be8f02e59cff712!2sMercadito%20Dulcinea!5e0!3m2!1ses-419!2scl!4v1757654849385!5m2!1ses-419!2scl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <br />
        <p><strong>Dirección:</strong> Av. Dulce 123, Santiago, Chile</p>
        <p><strong>Teléfono:</strong> +56 2 1234 5678</p>
        <p><strong>Email:</strong> contacto@milsabores.cl</p>
        <br />
        <h2>¡Contáctanos directamente a través de este formulario!</h2>
      </section>

      <section className="cajaContacto">
        {enviado && <div className="alerta-exito">¡Mensaje enviado correctamente!</div>}
        <form id="formularioContacto" onSubmit={handleSubmit}>
          <h2>Envíanos un Mensaje</h2>
          <div className="row">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Enviar Mensaje</button>
        </form>
      </section>

      <Footer />
    </>
  )
}
