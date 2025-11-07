import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import CompraError from '../CompraError'

describe('Página CompraError', () => {
  test('debe mostrar el mensaje de error y los links de acción', () => {
    render(
      <BrowserRouter>
        <CompraError />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: /No se pudo realizar el pago 😥/i })).toBeInTheDocument()
    expect(screen.getByText(/Intenta nuevamente/i)).toBeInTheDocument()

    const retryLink = screen.getByRole('link', { name: /Reintentar/i })
    expect(retryLink).toBeInTheDocument()
    expect(retryLink).toHaveAttribute('href', '/checkout')

    const cartLink = screen.getByRole('link', { name: /Volver al carrito/i })
    expect(cartLink).toBeInTheDocument()
    expect(cartLink).toHaveAttribute('href', '/carrito')
  })
})
  