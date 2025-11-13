import React, { useState } from 'react';
import { createProduct } from '../services/productoService'; 

function ProductoForm({ onProductAdded }) {
    // Estado para manejar los datos del formulario
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: name === 'price' ? parseFloat(value) : value // Asegura que 'price' sea un número
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Guardando producto...');
        
        // Simple validación
        if (!productData.name || !productData.price) {
            setStatusMessage('Error: El nombre y el precio son obligatorios.');
            return;
        }

        try {
            // Llama a la función del servicio para enviar los datos a la API de Spring Boot (POST)
            const newProduct = await createProduct(productData);
            
            setStatusMessage(`Producto "${newProduct.name}" creado con éxito.`);
            
            // Llama a la función de callback para actualizar la lista de productos
            if (onProductAdded) {
                onProductAdded(newProduct);
            }
            
            // Limpia el formulario
            setProductData({ name: '', price: '', description: '' });

        } catch (error) {
            setStatusMessage('Error al crear el producto. Verifique la consola.');
        }
    };

    return (
        <div className="product-form-container">
            <h3>➕ Añadir Nuevo Producto</h3>
            <form onSubmit={handleSubmit} className="product-form">
                
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Precio:
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        step="0.01" // Permite decimales para el precio
                        required
                    />
                </label>

                <label>
                    Descripción:
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Guardar Producto</button>
            </form>
            
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
}

export default ProductoForm;