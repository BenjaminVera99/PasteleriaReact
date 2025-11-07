// src/paginas/tests/PasswordToggle.spec.jsx
import React from 'react'                          // 👈 necesario
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useState } from 'react'

function Password() {
  const [show, setShow] = useState(false)
  return (
    <>
      <input aria-label="pass" type={show ? 'text' : 'password'} />
      <button onClick={() => setShow(s => !s)}>
        {show ? 'Ocultar' : 'Mostrar'}
      </button>
    </>
  )
}

test('alterna visibilidad de contraseña', () => {
  render(<Password />)
  const input = screen.getByLabelText(/pass/i)
  const btn = screen.getByRole('button', { name: /mostrar/i })

  expect(input).toHaveAttribute('type', 'password')

  fireEvent.click(btn)
  expect(input).toHaveAttribute('type', 'text')
})
