import React, { useMemo } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import { getOffers } from '../data/productos'

export default function Ofertas(){
  const products = useMemo(() => getOffers(), [])
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="brand-title text-center mb-3">Ofertas</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
          {products.map(p => (
            <div className="col" key={p.id}>
              <article className="card pastel-card h-100 p-3">
                <strong className="text-choco">{p.name}</strong>
                <span className="badge pastel-badge mt-2">Oferta</span>
              </article>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
