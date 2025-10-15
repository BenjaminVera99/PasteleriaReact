import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'

const cats = [
  'Tortas Cuadradas','Tortas Circulares','Postres Individuales','Productos Sin Azúcar',
  'Pastelería Tradicional','Productos Sin Gluten','Productos Veganos','Tortas Especiales'
]

export default function Categorias(){
  const nav = useNavigate()
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="text-center brand-title mb-3">Categorías</h1>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {cats.map(c => (
            <div className="col" key={c}>
              <button
                className="card pastel-card p-3 w-100"
                onClick={() => nav(`/catalogo?cat=${encodeURIComponent(c)}`)}
              >
                <strong className="text-choco">{c}</strong>
              </button>
            </div>
          ))}
        </div>
        <p className="text-center mt-3">
          o <Link to="/catalogo">ver todo el catálogo</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
