import React from 'react'                  
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Registrarse from '../Registrarse'

test('Registrarse tiene encabezado y botón', () => {
  render(
    <BrowserRouter>
      <Registrarse />
    </BrowserRouter>
  )

  expect(
    screen.getByRole('heading', { name: /Registrarse/i })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('button', { name: /Enviar Registro/i })
  ).toBeInTheDocument()
})
