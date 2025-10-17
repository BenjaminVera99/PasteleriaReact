// src/paginas/tests/Catalogo.spec.jsx
import React from 'react';
// Importa 'within' junto con las otras utilidades
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Catalogo from '../Catalogo'; // El componente a probar

// --- Mocking ---
// Mock del módulo de productos
jest.mock('../../data/productos', () => ({
  getAll: jest.fn(),
}));

// Mock del módulo del carrito
jest.mock('../../utils/cart', () => ({
  addItem: jest.fn(),
  readCart: jest.fn(() => []), // Añade mocks para otras funciones si Catalogo las usa
}));

// --- Datos de prueba ---
const mockProductos = [
  { id: 1, name: 'Torta de Chocolate', price: 25000, category: 'Tortas', img: 'img1.jpg' },
  { id: 2, name: 'Cheesecake Frutilla', price: 20000, category: 'Postres', img: 'img2.jpg' },
  { id: 3, name: 'Torta de Panqueques', price: 28000, category: 'Tortas', img: 'img3.jpg' },
];

// --- Suite de Tests ---
describe('Componente Catalogo', () => {
  // Configura mocks antes de cada test
  beforeEach(() => {
    // Necesitas requerir los módulos mockeados *aquí* para acceder a las funciones mock
    const { getAll } = require('../../data/productos');
    getAll.mockReturnValue([...mockProductos]); // Devuelve una copia para evitar mutaciones entre tests

    const { addItem } = require('../../utils/cart');
    addItem.mockClear(); // Limpia llamadas anteriores
    // Si quieres que addItem devuelva algo (para el console.log):
    addItem.mockReturnValue([{ id: 1, name: 'Torta de Chocolate', qty: 1 }]);
  });

  test('debe renderizar la lista inicial de productos', () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /Catálogo de Productos/i })).toBeInTheDocument();
    expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cheesecake Frutilla')).toBeInTheDocument();
    expect(screen.getByText('Torta de Panqueques')).toBeInTheDocument();

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(mockProductos.length);
  });

  test('debe filtrar productos por categoría', async () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const categorySelect = screen.getByLabelText(/Categoría/i);
    fireEvent.change(categorySelect, { target: { value: 'Postres' } });

    await waitFor(() => {
      expect(screen.getByText('Cheesecake Frutilla')).toBeInTheDocument();
    });

    expect(screen.queryByText('Torta de Chocolate')).not.toBeInTheDocument();
    expect(screen.queryByText('Torta de Panqueques')).not.toBeInTheDocument();
  });

  test('debe filtrar productos por búsqueda de texto', async () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText(/Buscar/i);
    fireEvent.change(searchInput, { target: { value: 'chocolate' } });

    await waitFor(() => {
      expect(screen.getByText('Torta de Chocolate')).toBeInTheDocument();
    });

    expect(screen.queryByText('Cheesecake Frutilla')).not.toBeInTheDocument();
    expect(screen.queryByText('Torta de Panqueques')).not.toBeInTheDocument();
  });

  test('debe llamar a addItem y mostrar feedback al agregar un producto al carrito', async () => {
    // Requerimos addItem aquí para poder espiarlo correctamente después del mock
    const { addItem } = require('../../utils/cart');

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const productCard = screen.getByText('Torta de Chocolate').closest('article');
    if (!productCard) throw new Error('No se encontró la card del producto');

    const addButton = within(productCard).getByRole('button', { name: /agregar/i });
    fireEvent.click(addButton);

    // 1. Verifica llamada a addItem
    expect(addItem).toHaveBeenCalledTimes(1);
    expect(addItem).toHaveBeenCalledWith(mockProductos[0], 1);

    // 2. Espera a que aparezca el feedback (usando texto específico)
    const feedbackPill = await within(productCard).findByText('Agregado ✅');
    expect(feedbackPill).toBeInTheDocument();

    // 3. Espera a que el feedback desaparezca (usando texto específico)
    await waitFor(() => {
     expect(within(productCard).queryByText('Agregado ✅')).not.toBeInTheDocument();
    }, { timeout: 1500 }); // Ajusta el timeout si es necesario
  });

  // --- Agrega más tests aquí ---

});