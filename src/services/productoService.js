// src/services/productService.js
import api from './api'; // ← ahora usamos api.js

const API_URL = '/api/products';

// 1. OBTENER TODOS LOS PRODUCTOS (GET)
export const getAllProducts = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

// 2. CREAR UN NUEVO PRODUCTO (POST)
export const createProduct = async (productData) => {
    try {
        const response = await api.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear un nuevo producto:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// 3. ACTUALIZAR UN PRODUCTO (PUT)
export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

// 4. ELIMINAR UN PRODUCTO (DELETE)
export const deleteProduct = async (id) => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
        throw error;
    }
};
