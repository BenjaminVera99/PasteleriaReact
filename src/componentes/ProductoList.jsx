import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productoService'; 

function ProductoList() {
    // Estado para guardar la lista de productos
    const [products, setProducts] = useState([]);
    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(true);
    // Estado para manejar errores (opcional)
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función asíncrona para cargar los datos
        const fetchProducts = async () => {
            try {
                // Llama al servicio que se conecta a tu API de Spring Boot (http://localhost:9090/api/products)
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                // Manejo de errores de conexión o del backend
                console.error("Fallo al cargar la data:", err);
                setError("No se pudo conectar a la API del backend. Asegúrate de que Spring Boot esté ejecutándose en el puerto 9090.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array vacío asegura que se ejecute solo una vez (al montar el componente)

    // --- Lógica de Renderizado ---
    
    if (loading) {
        return <div className="loading-message">Cargando la lista de productos...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }
    
    return (
        <div className="product-list-container">
            <h2>🍰 Menú de Productos de la Pastelería</h2>
            
            {products.length === 0 ? (
                <p>No hay productos cargados. ¡Añade uno con POST en Swagger!</p>
            ) : (
                <ul className="product-ul">
                    {products.map(product => (
                        <li key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p className="product-price">Precio: **${product.price}**</p>
                            <p className="product-description">{product.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductoList;