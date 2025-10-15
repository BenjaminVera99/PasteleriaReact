// src/paginas/Catalogo.jsx
import React, { useMemo, useState } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import '../Catalogo.css'

export default function Catalogo({ onAddToCart = null }) {
  const [categoria, setCategoria] = useState('all')
  const [buscar, setBuscar] = useState('')
  const [adding, setAdding] = useState({}) // { [id]: true } durante 1s

  // Guarda/actualiza el carrito en localStorage cuando no viene handler desde App
  const addToLocalStorageCart = (p, qty = 1) => {
    let cart = []
    try {
      const raw = localStorage.getItem('cart')
      cart = raw ? JSON.parse(raw) : []
    } catch {
      cart = []
    }
    const i = cart.findIndex(it => it.id === p.id)
    if (i >= 0) {
      cart[i] = { ...cart[i], qty: (cart[i].qty || 0) + qty }
    } else {
      cart.push({ ...p, qty })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // Click del botón Agregar con feedback 1s
  const handleAdd = (p) => {
    if (onAddToCart) onAddToCart(p)
    else addToLocalStorageCart(p)

    // feedback visual 1s
    setAdding(prev => ({ ...prev, [p.id]: true }))
    setTimeout(() => {
      setAdding(prev => {
        const copy = { ...prev }
        delete copy[p.id]
        return copy
      })
    }, 1000)
  }

  // Demo de productos
  const productos = [
    { id: 1, nombre: 'Torta Tres Leches', precio: 14990, categoria: 'Tortas Circulares', img: '/assets/imagenes/torta-tres-leches.jpg' },
    { id: 2, nombre: 'Torta Selva Negra', precio: 16990, categoria: 'Tortas Circulares', img: '/assets/imagenes/selva-negra.jpg' },
    { id: 3, nombre: 'Cheesecake Maracuyá', precio: 19990, categoria: 'Postres Individuales', img: '/assets/imagenes/cheesecake.jpg' },
    { id: 4, nombre: 'Kuchen de Nuez (sin azúcar)', precio: 13990, categoria: 'Productos Sin Azúcar', img: '/assets/imagenes/kuchen-sin-azucar.jpg' },
    { id: 5, nombre: 'Tarta Frambuesa (sin gluten)', precio: 17990, categoria: 'Productos Sin Gluten', img: '/assets/imagenes/tarta-frambuesa.jpg' },
    { id: 6, nombre: 'Brownie Vegano', precio: 2990, categoria: 'Productos Veganos', img: '/assets/imagenes/brownie-vegano.jpg' },
    { id: 7, nombre: 'Torta Rectangular Mil Hojas', precio: 21990, categoria: 'Tortas Cuadradas', img: '/assets/imagenes/milhojas.jpg' },
    { id: 8, nombre: 'Torta Especial Aniversario', precio: 25990, categoria: 'Tortas Especiales', img: '/assets/imagenes/torta-especial.jpg' },
  ]

  const categorias = [
    { value: 'all', label: 'Todas' },
    'Tortas Cuadradas',
    'Tortas Circulares',
    'Postres Individuales',
    'Productos Sin Azúcar',
    'Pastelería Tradicional',
    'Productos Sin Gluten',
    'Productos Veganos',
    'Tortas Especiales',
  ].map((c) => (typeof c === 'string' ? ({ value: c, label: c }) : c))

  const listaFiltrada = useMemo(() => {
    const q = buscar.trim().toLowerCase()
    return productos.filter(p => {
      const byCat = categoria === 'all' || p.categoria === categoria
      const byText = !q || p.nombre.toLowerCase().includes(q)
      return byCat && byText
    })
  }, [categoria, buscar])

  const toCLP = (n) =>
    n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <h1 className="text-center brand-title mb-3">Catálogo de Productos</h1>

        {/* Filtros */}
        <section className="catalog-controls">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-6">
              <label htmlFor="filterCategory" className="form-label fw-bold text-choco">Filtrar por categoría</label>
              <select
                id="filterCategory"
                className="form-select input-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                aria-label="Filtro por categoría"
              >
                {categorias.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="search" className="form-label fw-bold text-choco">Buscar</label>
              <input
                id="search"
                type="search"
                className="form-control input-control"
                placeholder="Ej: tres leches, vegano, selva..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                aria-label="Buscar por nombre"
              />
            </div>
          </div>
        </section>

        {/* Grid de productos */}
        <section className="mt-4" aria-live="polite" aria-busy="false">
          {listaFiltrada.length === 0 ? (
            <p className="text-center text-choco mt-4">No encontramos productos con esos filtros.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              {listaFiltrada.map((p) => (
                <div key={p.id} className="col">
                  <article className="card pastel-card h-100">
                    {/* Pill de feedback */}
                    {adding[p.id] && (
                      <span className="add-pill" aria-live="polite">Agregado ✅</span>
                    )}

                    <div className="ratio ratio-4x3 pastel-card__imgwrap">
                      <img
                        src={p.img}
                        alt={p.nombre}
                        className="pastel-card__img"
                        onError={(e) => { e.currentTarget.src = '/assets/imagenes/placeholder.jpg' }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5 text-choco mb-1">{p.nombre}</h3>
                      <span className="badge pastel-badge align-self-start mb-2">{p.categoria}</span>

                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <strong className="text-choco">{toCLP(p.precio)}</strong>
                        <button
                          className={`btn btn-white-choco ${adding[p.id] ? 'is-added' : ''}`}
                          onClick={() => handleAdd(p)}
                          type="button"
                          aria-label={`Agregar ${p.nombre} al carrito`}
                          disabled={!!adding[p.id]}
                        >
                          {adding[p.id] ? 'Agregado ✓' : 'Agregar'}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
