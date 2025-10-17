// src/pages/Carrito.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Carrito from "../Carrito"; // Importa el componente Carrito
import { BrowserRouter } from "react-router-dom"; // Asegúrate de envolver el componente con Router para la navegación

// Mock de localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "cart") return JSON.stringify(mockProducts); // Mock de los productos en el carrito
    if (key === "delivery") return JSON.stringify({ fecha: "", franja: "Lo antes posible" }); // Mock de la fecha y franja horaria
    return null;
  });
  Storage.prototype.setItem = jest.fn(); // Mock para setItem
  Storage.prototype.clear = jest.fn(); // Mock para clear
});

const mockProducts = [
  {
    id: 1,
    code: "T10MIL",
    name: "Torta básica",
    price: 1000,
    qty: 2,
    img: "http://example.com/imagen1.png"
  },
  {
    id: 2,
    code: "T20CHOC",
    name: "Torta de chocolate",
    price: 2000,
    qty: 1,
    img: "http://example.com/imagen2.png"
  }
];

describe("Carrito", () => {
  it("elimina un producto del carrito", async () => {
    // Renderiza el componente Carrito dentro de un BrowserRouter
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    // Verifica que el producto "Torta básica" esté en el carrito antes de la eliminación
    expect(screen.getByText("Torta básica")).toBeInTheDocument();

    // Encuentra todos los botones "Eliminar" y hace clic en el primero
    const eliminarBtns = screen.getAllByText("Eliminar");
    fireEvent.click(eliminarBtns[0]);

    // Espera que el producto "Torta básica" ya no esté en el carrito
    await waitFor(() => {
      expect(screen.queryByText("Torta básica")).not.toBeInTheDocument();
    });

    // Verifica que el carrito se haya actualizado en localStorage (se eliminó el producto)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([mockProducts[1]]) // Solo queda el segundo producto
    );
  });

  it("vacía el carrito", () => {
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    // Verifica que el carrito no esté vacío al principio
    expect(screen.getByText("Torta básica")).toBeInTheDocument();
    expect(screen.getByText("Torta de chocolate")).toBeInTheDocument();

    // Encuentra y hace clic en el botón "Vaciar carrito"
    const vaciarBtn = screen.getByText("Vaciar carrito");
    fireEvent.click(vaciarBtn);

    // Verifica que el carrito esté vacío
    expect(screen.queryByText("Torta básica")).not.toBeInTheDocument();
    expect(screen.queryByText("Torta de chocolate")).not.toBeInTheDocument();

    // Verifica que el carrito también se haya vaciado en localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify([]));
  });
});
