// src/componentes/tests/ProductCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard'; // Asegúrate de que la ruta sea correcta

// Mock de la función para agregar al carrito que recibiría como prop
const mockHandleAdd = jest.fn();

// Datos de un producto de prueba
const mockProductData = {
  id: 1,
  name: 'Torta de Chocolate',
  price: 25000,
  category: 'Tortas',
  img: 'img1.jpg'
};

describe('Componente ProductCard', () => {

  beforeEach(() => {
    // Limpia el mock antes de cada test
    mockHandleAdd.mockClear();
  });

  test('debe renderizar la información del producto correctamente', () => {
    render(
      <ProductCard
        product={mockProductData}
        onAddToCart={mockHandleAdd} // Pasa la función mock como prop
        isAdding={false} // Estado inicial
      />
    );

    // Verifica que los datos se muestren
    expect(screen.getByRole('heading', { name: /Torta de Chocolate/i })).toBeInTheDocument();
    expect(screen.getByText('Tortas')).toBeInTheDocument(); // Asume que la categoría se muestra
    expect(screen.getByText('$25.000')).toBeInTheDocument(); // Verifica el formato del precio
    const image = screen.getByRole('img', { name: /Torta de Chocolate/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img1.jpg');
  });

  test('debe llamar a onAddToCart al hacer clic en "Agregar"', () => {
    render(
      <ProductCard
        product={mockProductData}
        onAddToCart={mockHandleAdd}
        isAdding={false}
      />
    );

    // Encuentra y haz clic en el botón
    const addButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(addButton);

    // Verifica que la función mock fue llamada una vez con el producto
    expect(mockHandleAdd).toHaveBeenCalledTimes(1);
    expect(mockHandleAdd).toHaveBeenCalledWith(mockProductData);
  });

  test('debe mostrar "Agregado ✓" y la píldora si isAdding es true', () => {
    render(
      <ProductCard
        product={mockProductData}
        onAddToCart={mockHandleAdd}
        isAdding={true} // Pasamos el estado de "agregando"
      />
    );

    // Verifica el texto del botón
    expect(screen.getByRole('button', { name: /Agregado ✓/i })).toBeInTheDocument();
    // Verifica que la píldora de feedback esté presente
    expect(screen.getByText('Agregado ✅')).toBeInTheDocument(); // Usando el texto exacto
  });

});