// src/paginas/Carrito.jsx
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import { readCart, writeCart } from '../utils/cart.js'
// import { generarBoleta } from '../utils/boleta'  // lo cargamos perezoso adentro

const toCLP = (n) =>
  Number(n || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  })

export default function Carrito() {
  const [items, setItems] = useState([])
  const [envio, setEnvio] = useState({ fecha: '', franja: 'Lo antes posible' })
  const [loaded, setLoaded] = useState(false) // 👈 evita sobreescribir el carrito en el primer render

  // Carga inicial
  useEffect(() => {
    setItems(readCart())
    try {
      const rawEnv = localStorage.getItem('delivery')
      setEnvio(rawEnv ? JSON.parse(rawEnv) : { fecha: '', franja: 'Lo antes posible' })
    } catch {
      setEnvio({ fecha: '', franja: 'Lo antes posible' })
    }
    setLoaded(true) // 👈 marcamos que ya cargamos
  }, [])

  // Persistir cambios SOLO después de cargar
  useEffect(() => {
    if (!loaded) return
    writeCart(items)
  }, [items, loaded])

  const total = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.price ?? it.precio ?? 0) * Number(it.qty || 1)), 0),
    [items]
  )

  // Cantidades
  const inc = (id) => {
    setItems(prev =>
      prev.map(it => it.id === id ? { ...it, qty: Number(it.qty || 1) + 1 } : it)
    )
  }
  const dec = (id) => {
    setItems(prev =>
      prev
        .map(it => it.id === id ? { ...it, qty: Math.max(1, Number(it.qty || 1) - 1) } : it)
        .filter(it => (it.qty || 1) > 0)
    )
  }
  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id))
  const clear = () => setItems([])

  // Preferencias de entrega
  const setFecha = (fecha) => {
    const next = { ...envio, fecha }
    setEnvio(next)
    localStorage.setItem('delivery', JSON.stringify(next))
  }
  const setFranja = (franja) => {
    const next = { ...envio, franja }
    setEnvio(next)
    localStorage.setItem('delivery', JSON.stringify(next))
  }

  // PDF boleta (lazy import para evitar pantallas en blanco si falta la lib)
  const handleGenerarBoleta = async () => {
    try {
      const { generarBoleta } = await import('../utils/boleta.js')

      let cliente = {}
      try {
        const rawUser = localStorage.getItem('ms_user')
        if (rawUser) cliente = JSON.parse(rawUser)
      } catch {}

      const numero = String(Date.now()).slice(-8)
      const fecha = new Date().toLocaleString('es-CL')

      // Usa exactamente el nombre de tu carpeta de imágenes
      const logoUrl = new URL('../assets/Imagenes/Mil Sabores.png', import.meta.url).href
      // Si tu carpeta es "imagenes" en minúscula, usa la línea de abajo:
      // const logoUrl = new URL('../assets/imagenes/Mil Sabores.png', import.meta.url).href

      await generarBoleta({
        numero,
        fecha,
        cliente,
        items,
        envio,
        total,
        logoUrl
      })
    } catch (err) {
      console.error('Error generando boleta:', err)
      alert('No se pudo generar la boleta. Revisa la consola para más detalles.')
    }
  }

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <h1 className="text-center brand-title mb-3">Tu Carrito</h1>

        {items.length === 0 ? (
          <p className="text-center text-choco">Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        ) : (
          <div className="row g-3">
            {/* Lista */}
            <section className="col-12 col-lg-8">
              <div className="card pastel-card p-3">
                <h2 className="h5 text-choco mb-3">Productos</h2>

                <ul className="list-group list-group-flush">
                  {items.map(it => (
                    <li key={it.id} className="list-group-item d-flex align-items-center gap-3" style={{ border: 'none' }}>
                      <div className="ratio ratio-1x1" style={{ width: 72, borderRadius: 12, overflow: 'hidden', background: 'var(--pink-weak)' }}>
                        <img
                          src={it.img || '/assets/imagenes/placeholder.jpg'}
                          alt={it.name || it.nombre}
                          onError={(e) => { e.currentTarget.src = '/assets/imagenes/placeholder.jpg' }}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div className="flex-grow-1">
                        <div className="fw-bold text-choco mb-1">{it.name || it.nombre}</div>
                        <div className="small text-muted">{toCLP(it.price ?? it.precio)} c/u</div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-outline-brown" onClick={() => dec(it.id)} aria-label="Disminuir cantidad">−</button>
                        <span className="fw-bold text-choco" style={{ minWidth: 24, textAlign: 'center' }}>
                          {it.qty || 1}
                        </span>
                        <button className="btn btn-outline-brown" onClick={() => inc(it.id)} aria-label="Aumentar cantidad">+</button>
                      </div>

                      <div className="text-choco fw-bold" style={{ width: 110, textAlign: 'right' }}>
                        {toCLP((it.price ?? it.precio ?? 0) * (it.qty || 1))}
                      </div>

                      <button className="btn btn-white-choco" onClick={() => remove(it.id)} aria-label="Eliminar producto">Eliminar</button>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-brown" onClick={clear}>Vaciar carrito</button>
                </div>
              </div>
            </section>

            {/* Resumen y entrega */}
            <aside className="col-12 col-lg-4">
              <div className="card pastel-card p-3">
                <h2 className="h5 text-choco mb-3">Entrega</h2>

                <div className="mb-2">
                  <label className="form-label fw-bold text-choco">Fecha preferida</label>
                  <input
                    type="date"
                    className="form-control input-control"
                    value={envio.fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-choco">Franja horaria</label>
                  <select
                    className="form-select input-control"
                    value={envio.franja}
                    onChange={(e) => setFranja(e.target.value)}
                  >
                    <option>Lo antes posible</option>
                    <option>Mañana (09:00–12:00)</option>
                    <option>Tarde (12:00–16:00)</option>
                    <option>Tarde-Noche (16:00–20:00)</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3">
                  <span className="text-choco fw-bold">Total</span>
                  <span className="text-choco fw-bold fs-5">{toCLP(total)}</span>
                </div>

                <div className="d-flex flex-column gap-2 mt-3">
                  <button className="btn btn-white-choco" onClick={() => {/* opcional: navegar a /checkout */}}>
                    Confirmar pedido
                  </button>
                  <button className="btn btn-outline-brown" onClick={handleGenerarBoleta}>
                    Ver / Imprimir boleta
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
