import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import { products } from '../prods/productos'

export default function Carrito() {
  const { cart, addToCart } = useCart()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const t = Object.entries(cart).reduce((acc, [id, qty]) => {
      const p = products.find(p => p.id === id)
      return acc + (p?.price || 0) * qty
    }, 0)
    setTotal(t)
  }, [cart])

  return (
    <>
      <Navbar cartCount={Object.values(cart).reduce((a,b)=>a+b,0)} />
      <main>
        <h1 style={{ textAlign:'center' }}>Tu Carrito</h1>
        {Object.keys(cart).length === 0 ? (
          <p style={{ textAlign:'center', opacity:0.8 }}>Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        ) : (
          <div className="carrito-items">
            {Object.entries(cart).map(([id, qty]) => {
              const p = products.find(x => x.id === id)
              if(!p) return null
              return (
                <div key={id} style={{border:'1px solid #8B4513', margin:'8px', padding:'8px', borderRadius:'8px'}}>
                  <span>{p.name} x {qty}</span>
                  <button onClick={()=>addToCart(id,-1)}>-</button>
                  <button onClick={()=>addToCart(id,1)}>+</button>
                  <span> { (p.price*qty).toLocaleString('es-CL',{style:'currency',currency:'CLP'}) }</span>
                </div>
              )
            })}
          </div>
        )}
        <div className="carrito-total" style={{textAlign:'center', marginTop:'1rem'}}>
          <strong>Total:</strong> {total.toLocaleString('es-CL',{style:'currency',currency:'CLP'})}
        </div>
      </main>
      <Footer />
    </>
  )
}
