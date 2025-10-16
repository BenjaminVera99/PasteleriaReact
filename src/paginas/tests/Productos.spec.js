import{fireEvent, render, screen} from "@testing-library/react"
import productos from "../../data/productos.js"
import React from "react"

beforeEach(()=> {
    Storage.prototype.getItem = jest.fn(()=>"[]")
    Storage.prototype.setItem = jest.fn()
})

describe ('Product componet', ()=>{
    const mockProduct = {
        id: 10,
        code: 'T10MIL',
        category: 'Tortas de Mil',
        name: 'Torta basica',
        price: 1000,
        img: '/assets/imagenes/torta-cuadrada-chocolate.jpg',
        onSale: false
    }

    it ('renderizar datos correctamente', ()=>{
        render(<productos {...mockProduct}/>)
        expect(screen.getByText("Torta basica")).toBeIntheDocument()
        expect(screen.getByText("Torta de mil")).toBeIntheDocument()
        expect(screen.getByText("T10MIL")).toBeIntheDocument()
    })

    it ('se llama addToCart', ()=>{
        render(<productos {...mockProduct}/>)
        const button = screen.getByText("button")
        fireEvent.click(button)
        expect(localStorage.setItem).toHaveBeenCalled()
    })
})