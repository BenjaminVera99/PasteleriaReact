// =============================
// src/pages/Catalogo.jsx (LIMPIO Y FINAL)
// =============================
import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import { addItem } from '../utils/cart.js';
import '../Catalogo.css';
import { getAllProducts } from '../services/productoService.js'; 

export default function Catalogo() {
  const API_IMAGE_BASE_URL = "http://localhost:9090"; 

  const [categoria, setCategoria] = useState('all');
  const [buscar, setBuscar] = useState('');
  const [sort, setSort] = useState('priceAsc');
  const [perPage, setPerPage] = useState(9);
  const [page, setPage] = useState(1);
  const [adding, setAdding] = useState({});
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllProducts(); 
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar productos de la API:", err);
        setError("No se pudieron cargar los productos. Por favor, verifica que la API esté corriendo.");
        setProductos([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => { setPage(1) }, [categoria, buscar, perPage]);

  const handleAdd = (p) => {
    addItem(p, 1);
    setAdding(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAdding(prev => {
        const copy = { ...prev };
        delete copy[p.id];
        return copy;
      });
    }, 1000);
  };

  const categorias = useMemo(() => {
    const set = new Set(productos.map(p => p.category).filter(Boolean));
    return [{ value: 'all', label: 'Todas' }, ...Array.from(set).map(c => ({ value: c, label: c }))]
  }, [productos]);

  const filtrados = useMemo(() => {
    const q = buscar.trim().toLowerCase();
    return productos.filter(p => {
      const byCat = categoria === 'all' || p.category === categoria;
      const byText = !q || (p.name || '').toLowerCase().includes(q);
      return byCat && byText;
    })
  }, [productos, categoria, buscar]);

  const ordenados = useMemo(() => {
    const arr = [...filtrados];
    if (sort === 'priceAsc') arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === 'priceDesc') arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    return arr;
  }, [filtrados, sort]);

  const totalItems = ordenados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * perPage;
  const pageItems = ordenados.slice(startIdx, startIdx + perPage);

  const toCLP = (n) =>
    Number(n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  const goPrev = () => setPage(p => Math.max(1, p - 1));
  const goNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <h1 className="text-center brand-title mb-3">Catálogo de Productos</h1>

        <section className="catalog-controls">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-4">
              <label htmlFor="filterCategory" className="form-label fw-bold text-choco">Categoría</label>
              <select
                id="filterCategory"
                className="form-select input-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="search" className="form-label fw-bold text-choco">Buscar</label>
              <input
                id="search"
                type="search"
                className="form-control input-control"
                placeholder="Ej: tres leches, vegano, selva..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-2">
              <label htmlFor="sort" className="form-label fw-bold text-choco">Orden</label>
              <select
                id="sort"
                className="form-select input-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="priceAsc">Precio: menor a mayor</option>
                <option value="priceDesc">Precio: mayor a menor</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <label htmlFor="perPage" className="form-label fw-bold text-choco">Por página</label>
              <select
                id="perPage"
                className="form-select input-control"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2 text-choco">
            <small>Mostrando <strong>{pageItems.length}</strong> de <strong>{totalItems}</strong> productos</small>
            <small>Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong></small>
          </div>
        </section>

        <section className="mt-3">
          {isLoading && <p className="text-center text-choco mt-4">Cargando productos...</p>}
          {error && <p className="text-center text-danger mt-4">Error: {error}</p>}

          {!isLoading && !error && pageItems.length === 0 ? (
            <p className="text-center text-choco mt-4">No encontramos productos con esos filtros.</p>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              {pageItems.map((p) => (
                <div key={p.id} className="col">
                  <article className="card pastel-card h-100">
                    {adding[p.id] && <span className="add-pill">Agregado ✅</span>}

                    <div className="ratio ratio-4x3 pastel-card__imgwrap">
                      <img
                        src={`${API_IMAGE_BASE_URL}${p.img}`} 
                        alt={p.name}
                        className="pastel-card__img"
                        onError={(e) => { e.currentTarget.src = '/assets/imagenes/placeholder.jpg' }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5 text-choco mb-1">{p.name}</h3>
                      <span className="badge pastel-badge align-self-start mb-2">{p.category}</span>

                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <strong className="text-choco">{toCLP(p.price)}</strong>
                        <button
                          className={`btn btn-white-choco ${adding[p.id] ? 'is-added' : ''}`}
                          onClick={() => handleAdd(p)}
                          type="button"
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

        {totalPages > 1 && (
          <nav className="catalog-pagination d-flex justify-content-center align-items-center gap-2 mt-3">
            <button className="btn btn-outline-brown" onClick={goPrev} disabled={currentPage === 1}>← Anterior</button>
            <span className="text-choco mx-2">{currentPage} / {totalPages}</span>
            <button className="btn btn-outline-brown" onClick={goNext} disabled={currentPage === totalPages}>Siguiente →</button>
          </nav>
        )}
      </main>

      <Footer />
    </>
  );
}
