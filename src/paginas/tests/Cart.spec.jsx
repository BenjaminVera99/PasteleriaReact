// src/paginas/tests/Cart.spec.jsx
import React from 'react';
// Asegúrate de importar 'within'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Carrito from '../Carrito';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Importa jest-dom para matchers como toBeInTheDocument

// Estado inicial simulado del carrito
const mockProductsInitial = [
  {
    id: 1,
    code: 'T10MIL',
    name: 'Torta básica',
    price: 1000,
    qty: 2,
    img: 'http://example.com/imagen1.png',
  },
  {
    id: 2,
    code: 'T20CHOC',
    name: 'Torta de chocolate',
    price: 2000,
    qty: 1,
    img: 'http://example.com/imagen2.png',
  },
];

// Estado esperado DESPUÉS de eliminar Torta básica
const mockProductsAfterDelete = [
  {
    id: 2,
    code: 'T20CHOC',
    name: 'Torta de chocolate',
    price: 2000,
    qty: 1,
    img: 'http://example.com/imagen2.png',
  },
];

describe('Carrito', () => {
  // Mock de localStorage ANTES de cada test
  beforeEach(() => {
    // Mockear getItem para devolver el estado inicial
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'cart') return JSON.stringify(mockProductsInitial);
      if (key === 'delivery') return JSON.stringify({ fecha: '', franja: 'Lo antes posible' });
      return null;
    });
    // Mockear setItem para poder espiarlo
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.clear = jest.fn();
    // Limpiar mocks para evitar interferencias entre tests
    jest.clearAllMocks();
  });

  it('elimina un producto del carrito', async () => {
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    // 1. Verifica que ambos productos estén inicialmente
    expect(screen.getByText('Torta básica')).toBeInTheDocument();
    expect(screen.getByText('Torta de chocolate')).toBeInTheDocument();

    // 2. Encuentra la FILA de "Torta básica" para ser más específico
    // Buscamos la celda 'Torta básica' y subimos al elemento 'tr' padre
    const rowToDelete = screen.getByText('Torta básica').closest('tr');
    // Si no encuentra la fila, lanza un error claro
    if (!rowToDelete) {
        throw new Error('No se encontró la fila del producto "Torta básica"');
    }

    // 3. Busca el botón "Eliminar" DENTRO de esa fila específica
    // 'within' limita la búsqueda a este elemento
    const eliminarBtn = within(rowToDelete).getByRole('button', { name: /eliminar/i });

    // 4. Simula el clic
    fireEvent.click(eliminarBtn);

    // 5. Espera a que el elemento "Torta básica" DESAPAREZCA del DOM
    // waitFor es ideal para esperar cambios asíncronos o re-renders
    await waitFor(() => {
      // queryByText devuelve null si no lo encuentra (ideal para .not.toBeInTheDocument)
      expect(screen.queryByText('Torta básica')).not.toBeInTheDocument();
    });

    // 6. Verifica que el OTRO producto SIGA en el DOM
    expect(screen.getByText('Torta de chocolate')).toBeInTheDocument();

    // 7. Verifica que localStorage.setItem fue llamado CORRECTAMENTE
    // El componente Carrito tiene un useEffect que llama a writeCart (que usa setItem)
    // después de que el estado 'items' se actualiza.
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(mockProductsAfterDelete) // Solo debe quedar el segundo producto
    );
  });

  // Test "vacía el carrito" (sin cambios, ya parece correcto)
  it('vacía el carrito', async () => {
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    expect(screen.getByText('Torta básica')).toBeInTheDocument();
    expect(screen.getByText('Torta de chocolate')).toBeInTheDocument();

    const vaciarBtn = screen.getByRole('button', { name: /vaciar carrito/i }); // Mejor usar getByRole
    fireEvent.click(vaciarBtn);

    // Esperar a que los elementos desaparezcan
    await waitFor(() => {
        expect(screen.queryByText('Torta básica')).not.toBeInTheDocument();
        expect(screen.queryByText('Torta de chocolate')).not.toBeInTheDocument();
    });


    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });
});