import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Registrarse from '../Registrarse'

describe('Página Registrarse', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Registrarse />
      </BrowserRouter>
    )

  const fillForm = (data = {}) => {
    const defaults = {
      nombres: 'Test',
      apellidos: 'User',
      email: 'test@example.com',
      fechaNac: '2000-01-01',
      password1: '123456',
      password2: '123456',
      ...data,
    }
    fireEvent.change(screen.getByLabelText(/Nombres/i), { target: { value: defaults.nombres } })
    fireEvent.change(screen.getByLabelText(/Apellidos/i), { target: { value: defaults.apellidos } })
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: defaults.email } })
    fireEvent.change(screen.getByLabelText(/Fecha de nacimiento/i), { target: { value: defaults.fechaNac } })
    fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: defaults.password1 } })
    fireEvent.change(screen.getByLabelText(/Repetir Contraseña/i), { target: { value: defaults.password2 } })
  }

  test('debe renderizar el formulario de registro', () => {
    renderComponent()
    expect(screen.getByRole('heading', { name: /Registrarse/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Enviar Registro/i })).toBeInTheDocument()
  })

  test('debe mostrar error si faltan campos', async () => {
    renderComponent()
    fireEvent.change(screen.getByLabelText(/Nombres/i), { target: { value: 'Test' } })
    fireEvent.click(screen.getByRole('button', { name: /Enviar Registro/i }))
    const error = await screen.findByRole('alert')
    expect(error).toHaveTextContent('Por favor completa todos los campos')
  })

  test('debe mostrar error si el email es inválido', async () => {
    renderComponent()
    fillForm({ email: 'correo-invalido' })
    fireEvent.click(screen.getByRole('button', { name: /Enviar Registro/i }))
    const error = await screen.findByRole('alert')
    expect(error).toHaveTextContent('Ingresa un correo válido')
  })

  test('debe mostrar error si las contraseñas no coinciden', async () => {
    renderComponent()
    fillForm({ password1: '123456', password2: 'abcdef' })
    fireEvent.click(screen.getByRole('button', { name: /Enviar Registro/i }))
    const error = await screen.findByRole('alert')
    expect(error).toHaveTextContent('Las contraseñas no coinciden')
  })

  test('no debe mostrar error si el formulario es válido', () => {
    renderComponent()
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /Enviar Registro/i }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
