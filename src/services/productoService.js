import axios from 'axios';

// La URL base de tu API de Spring Boot (el backend que creaste)
const API_URL = 'http://localhost:9090/api/products'; 

// 1. OBTENER TODOS LOS PRODUCTOS (GET)
export const getAllProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        return [];
    }
};

// 2. OBTENER UN PRODUCTO POR ID (GET /{id})
export const getProductoById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        return null;
    }
};

// 3. CREAR UN NUEVO PRODUCTO (POST)
// productData debe tener la estructura { name: "...", price: 0.0, description: "..." }
export const createProducto = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data; // Retorna el producto recién creado
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// 4. ACTUALIZAR UN PRODUCTO (PUT /{id})
export const updateProducto = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data; // Retorna el producto actualizado
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

// 5. ELIMINAR UN PRODUCTO (DELETE /{id})
export const deleteProducto = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        // No retorna contenido, solo verifica que la promesa se resuelva
        return true; 
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
        throw error;
    }
};

// Puedes exportar todas las funciones para usarlas en tus componentes React
// export default { getAllProducts, createProduct, updateProduct, deleteProduct };