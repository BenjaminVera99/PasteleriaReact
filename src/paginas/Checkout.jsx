import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'

export default function Checkout(){
  const nav = useNavigate()
  const [user, setUser] = useState({ nombre:'', direccion:'', comuna:'', telefono:'' })
  const [envio, setEnvio] = useState({ fecha:'', franja:'Lo antes posible' })

  useEffect(() => {
    // si tienes user guardado (por iniciar sesión)
    const raw = localStorage.getItem('ms_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      // Simular proceso de pago/validación
      const ok = true
      if (ok) nav('/compra-exitosa')
      else nav('/compra-error')
    } catch {
      nav('/compra-error')
    }
  }

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="brand-title text-center mb-3">Checkout</h1>
        <form className="card pastel-card p-3" onSubmit={handleSubmit}>
          <h2 className="h5 text-choco">Datos de envío</h2>
          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label fw-bold text-choco">Nombre</label>
              <input className="form-control input-control" value={user.nombre} onChange={e=>setUser({...user,nombre:e.target.value})}/>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-choco">Teléfono</label>
              <input className="form-control input-control" value={user.telefono} onChange={e=>setUser({...user,telefono:e.target.value})}/>
            </div>
            <div className="col-12">
              <label className="form-label fw-bold text-choco">Dirección</label>
              <input className="form-control input-control" value={user.direccion} onChange={e=>setUser({...user,direccion:e.target.value})}/>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-choco">Comuna</label>
              <input className="form-control input-control" value={user.comuna} onChange={e=>setUser({...user,comuna:e.target.value})}/>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-choco">Fecha</label>
              <input type="date" className="form-control input-control" value={envio.fecha} onChange={e=>setEnvio({...envio,fecha:e.target.value})}/>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold text-choco">Franja</label>
              <select className="form-select input-control" value={envio.franja} onChange={e=>setEnvio({...envio,franja:e.target.value})}>
                <option>Lo antes posible</option>
                <option>Mañana (09:00–12:00)</option>
                <option>Tarde (12:00–16:00)</option>
                <option>Tarde-Noche (16:00–20:00)</option>
              </select>
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-white-choco" type="submit">Confirmar compra</button>
            <button className="btn btn-outline-brown" type="button" onClick={()=>nav('/carrito')}>Volver al carrito</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
