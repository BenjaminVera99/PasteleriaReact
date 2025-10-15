import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'

export default function CompraError(){
  return (
    <>
      <Navbar />
      <main className="container py-4 text-center">
        <h1 className="brand-title">No se pudo realizar el pago 😥</h1>
        <p className="text-choco">Intenta nuevamente o prueba con otro medio de pago.</p>
        <div className="d-flex gap-2 justify-content-center">
          <Link className="btn btn-white-choco" to="/checkout">Reintentar</Link>
          <Link className="btn btn-outline-brown" to="/carrito">Volver al carrito</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
