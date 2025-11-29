// src/pages/Carrito.jsx
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import { readCart, writeCart } from '../utils/cart.js';
import { remove as removeProduct } from '../data/productos.js'; // Importamos la función remove de productos.js
import logoUrl from '../assets/Imagenes/Mil Sabores.png';

// 🔑 CLAVE 1: Definir la URL base de tu API/servidor
const API_IMAGE_BASE_URL = "http://localhost:9090"; 

const toCLP = (n) =>
  Number(n || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

export default function Carrito() {
  const [items, setItems] = useState([]);
  const [envio, setEnvio] = useState({ fecha: '', franja: 'Lo antes posible' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readCart());
    try {
      const rawEnv = localStorage.getItem('delivery');
      setEnvio(rawEnv ? JSON.parse(rawEnv) : { fecha: '', franja: 'Lo antes posible' });
    } catch {
      setEnvio({ fecha: '', franja: 'Lo antes posible' });
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    writeCart(items);
  }, [items, loaded]);

  const total = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.price ?? it.precio ?? 0) * Number(it.qty || 1)), 0),
    [items]
  );

  const inc = (id) => {
    setItems(prev =>
      prev.map(it => it.id === id ? { ...it, qty: Number(it.qty || 1) + 1 } : it)
    );
  };

  const dec = (id) => {
    setItems(prev =>
      prev
        .map(it => it.id === id ? { ...it, qty: Math.max(1, Number(it.qty || 1) - 1) } : it)
        .filter(it => (it.qty || 1) > 0)
    );
  };

  const remove = (id) => {
    // Eliminar del estado (lo que luego guarda el carrito actualizado)
    setItems(prev => prev.filter(it => it.id !== id));
    
    // ⚠️ Nota: Esta llamada a removeProduct() elimina el producto del localStorage 
    // de productos. Si solo quieres quitarlo del carrito, esta línea DEBERÍA eliminarse
    // si '../data/productos.js' maneja la lista maestra de productos.
    // removeProduct(id);
  };

  const clear = () => setItems([]);

  const setFecha = (fecha) => {
    const next = { ...envio, fecha };
    setEnvio(next);
    localStorage.setItem('delivery', JSON.stringify(next));
  };

  const setFranja = (franja) => {
    const next = { ...envio, franja };
    setEnvio(next);
    localStorage.setItem('delivery', JSON.stringify(next));
  };

  const handleGenerarBoleta = async () => {
    try {
      const { generarBoleta } = await import('../utils/boleta.js');
      let cliente = {};
      try {
        const rawUser = localStorage.getItem('ms_user');
        if (rawUser) cliente = JSON.parse(rawUser);
      } catch {}
      const numero = String(Date.now()).slice(-8);
      const fecha = new Date().toLocaleString('es-CL');
      await generarBoleta({ numero, fecha, cliente, items, envio, total, logoUrl });
    } catch (err) {
      console.error('Error generando boleta:', err);
      alert('No se pudo generar la boleta. Revisa la consola para más detalles.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="text-center brand-title mb-3">Tu Carrito</h1>

        {items.length === 0 ? (
          <p className="text-center text-choco">Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        ) : (
          <>
            <table className="table" style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
              <thead style={{ backgroundColor: '#FDE2E2', borderRadius: '8px' }}>
                <tr>
                  <th>Código</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio c/u</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id} style={{ backgroundColor: '#FFF5F5', borderRadius: '8px', marginBottom: '10px' }}>
                    <td>{it.code ?? it.id}</td>
                    <td>
                      <img
                        // 🔑 CLAVE 2: Construcción de la URL de la imagen
                        src={`${API_IMAGE_BASE_URL}${it.img || '/assets/imagenes/placeholder.jpg'}`}
                        alt={it.name || it.nombre}
                        width="50"
                        style={{ borderRadius: '8px' }}
                        onError={(e) => { e.currentTarget.src = '/assets/imagenes/placeholder.jpg' }}
                      />
                    </td>
                    <td>{it.name || it.nombre}</td>
                    <td>{toCLP(it.price ?? it.precio)}</td>
                    <td>
                      <button
                        className="btn btn-outline-brown"
                        onClick={() => dec(it.id)}
                        style={{ borderRadius: '50%', padding: '0 10px' }}
                      >
                        −
                      </button>
                      <span style={{ margin: '0 8px', fontWeight: 'bold' }}>{it.qty || 1}</span>
                      <button
                        className="btn btn-outline-brown"
                        onClick={() => inc(it.id)}
                        style={{ borderRadius: '50%', padding: '0 10px' }}
                      >
                        +
                      </button>
                    </td>
                    <td>{toCLP((it.price ?? it.precio ?? 0) * (it.qty || 1))}</td>
                    <td>
                      <button
                        className="btn btn-white-choco"
                        onClick={() => remove(it.id)}
                        style={{ borderRadius: '5px', padding: '2px 6px' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="fw-bold fs-5">Total: {toCLP(total)}</span>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-brown" onClick={clear}>Vaciar carrito</button>
                <button className="btn btn-white-choco" onClick={handleGenerarBoleta}>Ver / Imprimir boleta</button>
              </div>
            </div>

            <div className="mt-4" style={{ maxWidth: '300px' }}>
              <label className="form-label fw-bold text-choco">Fecha preferida</label>
              <input
                type="date"
                className="form-control input-control"
                value={envio.fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <label className="form-label fw-bold text-choco mt-2">Franja horaria</label>
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
          </>
        )}
      </main>

      <Footer />
    </>
  );
}