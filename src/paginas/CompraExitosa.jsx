import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'

export default function CompraExitosa(){
  return (
    <>
      <Navbar />
      <main className="container py-4 text-center">
        <h1 className="brand-title">¡Compra exitosa! 🎉</h1>
        <p className="text-choco">Tu pedido fue recibido. Te enviaremos actualizaciones por correo.</p>
        <Link className="btn btn-white-choco mt-2" to="/catalogo">Seguir comprando</Link>
      </main>
      <Footer />
    </>
  )
}
