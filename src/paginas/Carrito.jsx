import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import '../Carrito.css'

const toCLP = (n) =>
  (n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

export default function Carrito() {

  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [franjaHora, setFranjaHora] = useState('Lo antes posible')
  const [confirmado, setConfirmado] = useState(false)
  const [stage, setStage] = useState(0)
  

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      const parsed = raw ? JSON.parse(raw) : []
      const cleaned = Array.isArray(parsed) ? parsed.filter(x => x && typeof x.id !== 'undefined') : []
      setItems(cleaned)

    } catch (err) {
      console.error('[Carrito] Error leyendo localStorage:', err)
      setItems([])
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (err) {
      console.error('[Carrito] Error guardando localStorage:', err)
    }
  }, [items, hydrated])

  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.precio * it.qty, 0),
    [items]
  )

  const inc = (id) => setItems(prev => prev.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it))
  const dec = (id) => setItems(prev =>
    prev
      .map(it => it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it)
      .filter(it => it.qty > 0)
  )
  const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id))
  const clear = () => setItems([])

  const confirmarPedido = () => {
    if (!items.length) return
    setConfirmado(true)
    setStage(1)
  }

  useEffect(() => {
    if (!confirmado) return
    const t1 = setTimeout(() => setStage(2), 2500)
    const t2 = setTimeout(() => setStage(3), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [confirmado])

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <h1 className="text-center brand-title mb-4">Tu Carrito</h1>

        <section className="carrito card pastel-card p-3" aria-label="Resumen del carrito">
          <h2 className="h5 text-choco mb-3">Resumen</h2>

          {/* Lista de ítems */}
          {items.length === 0 ? (
            <p className="text-center carrito-vacio">
              Tu carrito está vacío. Agrega productos desde el catálogo.
            </p>
          ) : (
            <div className="carrito-items">
              {items.map((it) => (
                <article key={it.id} className="carrito-item">
                  <div className="carrito-item__info">
                    <div className="carrito-thumb ratio ratio-1x1">
                      <img
                        src={it.img || '/assets/imagenes/placeholder.jpg'}
                        alt={it.nombre}
                        onError={(e) => { e.currentTarget.src = '/assets/imagenes/placeholder.jpg' }}
                      />
                    </div>
                    <div className="carrito-data">
                      <h3 className="h6 m-0 text-choco">{it.nombre}</h3>
                      <span className="text-choco-weak">{toCLP(it.precio)}</span>
                    </div>
                  </div>

                  <div className="carrito-item__actions">
                    <div className="btn-group qty-group" role="group" aria-label={`Cantidad de ${it.nombre}`}>
                      <button className="btn btn-outline-brown" onClick={() => dec(it.id)} aria-label="Disminuir">−</button>
                      <span className="qty">{it.qty}</span>
                      <button className="btn btn-outline-brown" onClick={() => inc(it.id)} aria-label="Aumentar">+</button>
                    </div>
                    <button className="btn btn-white-choco" onClick={() => removeItem(it.id)} aria-label={`Eliminar ${it.nombre}`}>
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Preferencias de entrega */}
          <fieldset className="envio mt-3">
            <legend className="fw-bold text-choco">Entrega</legend>
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <label htmlFor="fechaEntrega" className="form-label text-choco fw-bold">Fecha preferida</label>
                <input
                  type="date"
                  id="fechaEntrega"
                  className="form-control input-control"
                  value={fechaEntrega}
                  onChange={(e) => setFechaEntrega(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="franjaHora" className="form-label text-choco fw-bold">Horario preferido</label>
                <select
                  id="franjaHora"
                  className="form-select input-control"
                  value={franjaHora}
                  onChange={(e) => setFranjaHora(e.target.value)}
                >
                  <option value="Lo antes posible">Lo antes posible</option>
                  <option value="Mañana (09:00–12:00)">Mañana (09:00–12:00)</option>
                  <option value="Tarde (12:00–16:00)">Tarde (12:00–16:00)</option>
                  <option value="Tarde-Noche (16:00–20:00)">Tarde-Noche (16:00–20:00)</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Total y acciones */}
          <div className="carrito-total mt-3">
            <span className="text-choco">Total:</span>
            <span className="carrito-precio-total">{toCLP(total)}</span>
          </div>

          <div className="carrito-acciones mt-2 d-flex gap-2">
            <button
              id="btn-pagar"
              className="btn btn-white-choco"
              onClick={confirmarPedido}
              disabled={items.length === 0}
            >
              Confirmar pedido
            </button>
            <button
              className="btn btn-outline-brown"
              onClick={clear}
              disabled={items.length === 0}
            >
              Vaciar carrito
            </button>
          </div>
        </section>

        {/* Seguimiento del pedido */}
        {confirmado && (
          <section id="pedidoEstado" className="pedido card pastel-card p-3 mt-4">
            <h3 className="h5 text-choco mb-3">Seguimiento del pedido</h3>

            <div className="timeline">
              <div className="bar">
                <div className={`barraProgreso stage-${stage}`} />
                <div className={`marker stage-${stage}`} aria-hidden="true" />
              </div>
              <ul className="etapas">
                <li className={stage >= 1 ? 'ok' : ''}>Preparación</li>
                <li className={stage >= 2 ? 'ok' : ''}>En reparto</li>
                <li className={stage >= 3 ? 'ok' : ''}>Entregado</li>
              </ul>
            </div>

            <p className="m-0">
              Estado: {stage === 1 ? 'En preparación' : stage === 2 ? 'En reparto' : stage === 3 ? 'Entregado' : '—'}
            </p>
            <p className="m-0">ETA: {stage < 3 ? 'Hoy' : '—'}</p>

            <div className="seguimiento-acciones mt-2">
              <button id="btnBoleta" className="btn btn-white-choco" onClick={() => window.print()}>
                Ver / Imprimir boleta
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}
