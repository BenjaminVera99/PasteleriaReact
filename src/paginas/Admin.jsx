
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../services/productoService'; 

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name:'', price:'', category:'', onSale:false });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") navigate("/");
  }, [navigate]);

  const parseDescriptionToForm = (description) => {
    const categoryMatch = description.match(/Categoría: ([^.]+)/);
    const onSaleMatch = description.match(/Oferta: (Sí|No)/);
    return {
      category: categoryMatch ? categoryMatch[1].trim() : '',
      onSale: onSaleMatch ? onSaleMatch[1] === 'Sí' : false,
    };
  };

  const reload = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setItems(data);
    } catch (error) {
      console.error("Error al cargar productos desde la API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const handleEdit = (product) => {
    const { category, onSale } = parseDescriptionToForm(product.description || '');
    setForm({ name: product.name, price: product.price, category, onSale });
    setEditingId(product.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productToSend = {
      name: form.name,
      price: Number(form.price),
      description: `Categoría: ${form.category || 'N/A'}. Oferta: ${form.onSale ? 'Sí' : 'No'}`
    };

    try {
      if (editingId) {
        await updateProduct(editingId, productToSend);
        alert(`Producto #${editingId} actualizado con éxito.`);
      } else {
        await createProduct(productToSend);
        alert(`Producto "${form.name}" creado con éxito.`);
      }
      setForm({ name:'', price:'', category:'', onSale:false });
      setEditingId(null);
      reload();
    } catch (error) {
      console.error(`Error al ${editingId ? 'actualizar' : 'crear'} el producto:`, error);
      alert(`Error al ${editingId ? 'actualizar' : 'crear'} el producto. Revisa la consola para más detalles del Backend.`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`¿Seguro que quieres eliminar el producto #${id}?`)) {
      try {
        await deleteProduct(id);
        reload();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto. Verifique los logs del Backend.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', price: '', category: '', onSale: false });
  };

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="brand-title mb-3">Panel Administrativo</h1>

        <form className="card pastel-card p-3 mb-3" onSubmit={handleSubmit}>
          <h2 className="h5 text-choco mb-3">{editingId ? `Editando Producto #${editingId}` : 'Crear Nuevo Producto'}</h2>
          <div className="row g-2">
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <input className="form-control input-control" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="col-md-4">
              <input className="form-control input-control" placeholder="Categoría" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="col-md-2 d-flex align-items-center gap-2">
              <input id="onSale" type="checkbox" checked={form.onSale} onChange={e => setForm({ ...form, onSale: e.target.checked })} />
              <label htmlFor="onSale" className="m-0">Oferta</label>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <button type="submit" className="btn btn-white-choco">
              {editingId ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancelEdit}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>

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
                        <button className="btn btn-outline-brown btn-sm me-2" onClick={() => handleEdit(p)}>Editar</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
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
  );
}
