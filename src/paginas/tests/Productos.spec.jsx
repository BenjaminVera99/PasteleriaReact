// import React from "react"
// import { render, screen, fireEvent } from "@testing-library/react"
// import '@testing-library/jest-dom'
// import Producto from "../../data/productos" // asegúrate de que sea un componente React

// beforeEach(() => {
//   Storage.prototype.getItem = jest.fn(() => "[]")
//   Storage.prototype.setItem = jest.fn()
// })

// afterEach(() => {
//   jest.clearAllMocks()
// })

// describe('Producto component', () => {
//   const mockProduct = {
//     id: 10,
//     code: 'T10MIL',
//     category: 'Tortas de Mil',
//     name: 'Torta basica',
//     price: 1000,
//     img: '/assets/imagenes/torta-cuadrada-chocolate.jpg',
//     onSale: false
//   }

//   it('renderiza datos correctamente', () => {
//     render(<Producto {...mockProduct} />)
//     expect(screen.getByText("Torta basica")).toBeInTheDocument()
//     expect(screen.getByText("Tortas de Mil")).toBeInTheDocument()
//     expect(screen.getByText("T10MIL")).toBeInTheDocument()
//   })

//   it('agrega al carrito', () => {
//     render(<Producto {...mockProduct} />)
//     const button = screen.getByRole('button', { name: /Agregar/i }) // ajusta el texto
//     fireEvent.click(button)
//     expect(localStorage.setItem).toHaveBeenCalled()
//   })
// })
