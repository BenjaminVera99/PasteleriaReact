import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../componentes/Navbar', () => ({ __esModule: true, default: () => <div /> }))
jest.mock('../../componentes/Footer', () => ({ __esModule: true, default: () => <div /> }))

import Contacto from '../Contacto' // desde tests/ a Contacto.jsx: ../Contacto

test('renderiza el título "Contacto"', () => {
  render(
    <BrowserRouter>
      <Contacto />
    </BrowserRouter>
  )

  expect(screen.getByRole('heading', { name: /contacto/i })).toBeInTheDocument()
})
