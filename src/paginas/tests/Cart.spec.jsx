// import React from "react"
// import { render, screen, fireEvent } from "@testing-library/react"
// import Carrito from "../Carrito"

// // Mock de localStorage
// beforeEach(() => {
//   Storage.prototype.getItem = jest.fn((key) => {
//     if (key === "cart") return JSON.stringify(mockProducts)
//     if (key === "delivery") return JSON.stringify({ fecha: "", franja: "Lo antes posible" })
//     return null
//   })
//   Storage.prototype.setItem = jest.fn()
//   Storage.prototype.clear = jest.fn()
// })

// const mockProducts = [
//   {
//     id: 1,
//     code: "T10MIL",
//     name: "Torta básica",
//     price: 1000,
//     qty: 2,
//     img: "/assets/imagenes/torta-cuadrada-chocolate.jpg"
//   },
//   {
//     id: 2,
//     code: "T20CHOC",
//     name: "Torta de chocolate",
//     price: 2000,
//     qty: 1,
//     img: "/assets/imagenes/torta-chocolate.jpg"
//   }
// ]

// describe("Carrito", () => {
//   it("renderiza los productos del carrito", () => {
//     render(<Carrito />)

//     expect(screen.getByText("Torta básica")).toBeInTheDocument()
//     expect(screen.getByText("Torta de chocolate")).toBeInTheDocument()

//     // Total correcto
//     expect(screen.getByText("CLP 4.000")).toBeInTheDocument()
//   })

//   it("aumenta y disminuye la cantidad de un producto", () => {
//     render(<Carrito />)

//     const sumaBtns = screen.getAllByLabelText("Aumentar cantidad")
//     const restaBtns = screen.getAllByLabelText("Disminuir cantidad")
//     const cantidades = screen.getAllByText("2") // qty inicial de Torta básica

//     // Aumentar
//     fireEvent.click(sumaBtns[0])
//     expect(screen.getAllByText("3")[0]).toBeInTheDocument()

//     // Disminuir
//     fireEvent.click(restaBtns[0])
//     expect(screen.getAllByText("2")[0]).toBeInTheDocument()
//   })

//   it("elimina un producto del carrito", () => {
//     render(<Carrito />)

//     const eliminarBtns = screen.getAllByLabelText("Eliminar producto")
//     fireEvent.click(eliminarBtns[0])

//     expect(screen.queryByText("Torta básica")).not.toBeInTheDocument()
//   })

//   it("vacía el carrito", () => {
//     render(<Carrito />)

//     const vaciarBtn = screen.getByText("Vaciar carrito")
//     fireEvent.click(vaciarBtn)

//     expect(screen.getByText("Tu carrito está vacío. Agrega productos desde el catálogo.")).toBeInTheDocument()
//   })
// })
