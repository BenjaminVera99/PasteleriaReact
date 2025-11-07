import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import CompraExitosa from '../CompraExitosa'

describe('Página CompraExitosa', () => {
  test('debe mostrar el mensaje de éxito y el link al catálogo', () => {
    render(
      <BrowserRouter>
        <CompraExitosa />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /¡Compra exitosa! 🎉/i })).toBeInTheDocument()
    expect(screen.getByText(/Tu pedido fue recibido/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /Seguir comprando/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/catalogo')
  })
})
