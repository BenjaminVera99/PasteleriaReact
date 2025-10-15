import React, { useMemo, useState } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import { getAll, create, update, remove } from '../data/productos'

export default function Admin(){
  const [items, setItems] = useState(() => getAll())
  const [form, setForm] = useState({ name:'', price:'', category:'', onSale:false })

  const reload = () => setItems(getAll())

  const handleCreate = (e) => {
    e.preventDefault()
    create({ ...form, price: Number(form.price) })
    setForm({ name:'', price:'', category:'', onSale:false })
    reload()
  }
  const handleDelete = (id) => { remove(id); reload() }

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="brand-title mb-3">Panel Administrativo</h1>

        <form className="card pastel-card p-3 mb-3" onSubmit={handleCreate}>
          <div className="row g-2">
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </div>
            <div className="col-md-2">
              <input className="form-control input-control" placeholder="Precio" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
            </div>
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Categoría" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
            </div>
            <div className="col-md-2 d-flex align-items-center gap-2">
              <input id="onSale" type="checkbox" checked={form.onSale} onChange={e=>setForm({...form,onSale:e.target.checked})}/>
              <label htmlFor="onSale" className="m-0">Oferta</label>
            </div>
          </div>
          <button className="btn btn-white-choco mt-2">Crear</button>
        </form>

        <div className="card pastel-card p-3">
          <h2 className="h5 text-choco">Productos</h2>
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Oferta</th><th></th></tr></thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.onSale ? 'Sí' : 'No'}</td>
                    <td><button className="btn btn-outline-brown btn-sm" onClick={()=>handleDelete(p.id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
