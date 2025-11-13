// src/paginas/Admin.jsx (versión final con Actualizar)
import React, { useEffect, useState } from 'react'
import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
// Importamos la función de actualización
import { getAllProductos, createProducto, deleteProducto, updateProducto } from '../services/productoService' 

export default function Admin(){
  const [items, setItems] = useState([]) 
  const [loading, setLoading] = useState(true) 
  
  // 💡 Nuevo Estado: Almacena el ID del producto que se está editando
  const [editingId, setEditingId] = useState(null) 
  
  // Incluimos la 'description' y los campos category/onSale
  const [form, setForm] = useState({ 
    name:'', 
    price:'', 
    category:'', 
    onSale:false,
    description: '' 
  })

  // Función de utilería para mapear la descripción a los campos de formulario
  // Esto es necesario porque tu API solo tiene 'description', no 'category'/'onSale'
  const parseDescriptionToForm = (description) => {
      const categoryMatch = description.match(/Categoría: ([^.]+)/);
      const onSaleMatch = description.match(/Oferta: (Sí|No)/);
      return {
          category: categoryMatch ? categoryMatch[1].trim() : '',
          onSale: onSaleMatch ? onSaleMatch[1] === 'Sí' : false,
      };
  };


  const reload = async () => {
    setLoading(true)
    try {
      const data = await getAllProductos()
      setItems(data)
    } catch (error) {
      console.error("Error al cargar productos desde la API:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [])


  // 💡 Nuevo Manejador: Carga los datos de un producto al formulario para edición
  const handleEdit = (producto) => {
    // Usamos la función auxiliar para rellenar category y onSale
    const { category, onSale } = parseDescriptionToForm(producto.description || '');

    setForm({ 
        name: producto.name,
        price: producto.price,
        category: category,
        onSale: onSale,
        description: producto.description // Guardamos la descripción completa también
    })
    setEditingId(producto.id) // Establece el ID del producto a editar
  }

  // Manejador unificado para Crear (POST) o Actualizar (PUT)
  const handleSubmit = async (e) => { 
    e.preventDefault()

    // 1. Mapear datos para enviar a la API
    const productoToSend = {
      name: form.name,
      price: Number(form.price),
      // Creamos la descripción completa que espera la API de Spring Boot
      description: `Categoría: ${form.category || 'N/A'}. Oferta: ${form.onSale ? 'Sí' : 'No'}`
    }

    try {
      if (editingId) {
        // --- 2. LÓGICA DE ACTUALIZACIÓN (PUT) ---
        await updateProducto(editingId, productoToSend)
        alert(`Producto #${editingId} actualizado con éxito.`)
      } else {
        // --- 3. LÓGICA DE CREACIÓN (POST) ---
        await createProducto(productoToSend) 
        alert(`Producto "${form.name}" creado con éxito.`)
      }
      
      // Limpiar y resetear el estado después de la operación
      setForm({ name:'', price:'', category:'', onSale:false, description:'' })
      setEditingId(null) // Desactivar modo edición
      reload() // Recargar la lista
      
    } catch (error) {
      console.error(`Error al ${editingId ? 'actualizar' : 'crear'} el producto:`, error)
      alert(`Error al ${editingId ? 'actualizar' : 'crear'} el producto.`)
    }
  }

  const handleDelete = async (id) => {
    // ... (El código de handleDelete sigue siendo el mismo)
    if (window.confirm(`¿Seguro que quieres eliminar el producto #${id}?`)) {
      try {
        await deleteProducto(id)
        reload()
      } catch (error) {
        console.error("Error al eliminar el producto:", error)
        alert("Error al eliminar el producto. Verifique los logs del Backend.")
      }
    }
  }

  // --- Lógica de Renderizado ---
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="brand-title mb-3">Panel Administrativo</h1>

        {/* Formulario unificado para Creación/Edición */}
        <form className="card pastel-card p-3 mb-3" onSubmit={handleSubmit}>
          <h2 className="h5 text-choco mb-3">{editingId ? `Editando Producto #${editingId}` : 'Crear Nuevo Producto'}</h2>
          
          <div className="row g-2">
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
            </div>
            <div className="col-md-2">
              <input className="form-control input-control" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
            </div>
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Categoría" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
            </div>
            <div className="col-md-2 d-flex align-items-center gap-2">
              <input id="onSale" type="checkbox" checked={form.onSale} onChange={e=>setForm({...form,onSale:e.target.checked})}/>
              <label htmlFor="onSale" className="m-0">Oferta</label>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
             {/* El texto del botón cambia según el modo */}
             <button type="submit" className="btn btn-white-choco">
                 {editingId ? 'Guardar Cambios' : 'Crear Producto'}
             </button>
             {editingId && (
                <button type="button" className="btn btn-outline-secondary" onClick={() => setEditingId(null) && setForm({ name:'', price:'', category:'', onSale:false, description:'' })}>
                    Cancelar Edición
                </button>
             )}
          </div>
        </form>

        {/* Listado de Productos */}
        <div className="card pastel-card p-3">
          <h2 className="h5 text-choco">Productos</h2>
          
          {loading ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Acciones</th></tr></thead>
                <tbody>
                  {items.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.description}</td> 
                      <td>
                        {/* Botón de Edición (llama a handleEdit) */}
                        <button 
                            className="btn btn-outline-brown btn-sm me-2" 
                            onClick={()=>handleEdit(p)}
                        >
                            Editar
                        </button>
                        {/* Botón de Eliminación (llama a handleDelete) */}
                        <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={()=>handleDelete(p.id)}
                        >
                            Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}