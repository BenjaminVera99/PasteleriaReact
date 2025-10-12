import React, { useState } from 'react'


function Catalogo() {
  const [categoria, setCategoria] = useState('all')
  const { addToCart, cartCount } = useCart()

  const filtrados = categoria === 'all'
    ? products
    : products.filter(p => p.subcategory === categoria)

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: '#5D4037' }}>
      <h1>Catálogo de Productos</h1>

      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="all">Todas</option>
        <option value="Tortas Cuadradas">Tortas Cuadradas</option>
        <option value="Tortas Circulares">Tortas Circulares</option>
        <option value="Postres Individuales">Postres Individuales</option>
      </select>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '45px',
        padding: '16px',
        justifyItems: 'center'
      }}>
        {filtrados.map(p => (
          <div key={p.id} style={{
            width: '220px',
            aspectRatio: '1/1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid #8B4513',
            borderRadius: '12px',
            padding: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,.05)'
          }}>
            <div style={{ fontSize: '34px' }}>{p.emoji}</div>
            <h3 style={{ margin: 0, fontWeight: 700 }}>{p.name}</h3>
            <p style={{ fontSize: '14px', color: '#5D4037' }}>{p.description}</p>
            <button
              onClick={() => addToCart(p.id)}
              style={{
                padding: '8px 12px',
                border: '2px solid #8B4513',
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: '#FFC0CB',
                color: '#5D4037'
              }}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <p>Items en carrito: {cartCount}</p>
    </main>
  )
}

export default Catalogo
