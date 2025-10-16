import React from "react"
import{ fireEvent, render, screen} from "@testing-library/react"
import Carrito from "../Carrito"

describe('Carrito pagina',() =>{
    const mockProduct =[
        {
            id: 10,
            code: 'T10MIL',
            category: 'Tortas de Mil',
            name: 'Torta basica',
            price: 1000,
            img: '/assets/imagenes/torta-cuadrada-chocolate.jpg',
            onSale: false
        },
        {
            id: 15,
            code: 'T15MIL',
            category: 'Tortas de 15Mil',
            name: 'Torta 15mil',
            price: 15000,
            img: '/assets/imagenes/torta-cuadrada-chocolate.jpg',
            onSale: false
        }
    ]
    Storage.prototype.getItem = jest.fn(()=> JSON.stringify(mockProduct))
    Storage.prototype.clear = jest.fn()

    it('muestra productos desde localStorage', ()=>{
        render(<Carrito/>)
        expect(screen.getByText("Torta basica")).toBeInTheDocument()
        expect(screen.getByText("Torta 15mil")).toBeInTheDocument()
    })

        it('se llama a clear pa limpiar', ()=>{
        render(<Carrito/>)
        const button = screen.getByText("Vaciar carrito")
        fireEvent.click(button)
        expect(localStorage.clear).toHaveBeenCalled()
    })
})