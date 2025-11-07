// src/paginas/tests/FormValidation.spec.jsx
import React from 'react'                     // 👈 NECESARIO
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useState } from 'react'

function Form() {
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const submit = () => setErr(email ? '' : 'Email requerido')
  return (
    <>
      <input aria-label="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={submit}>Enviar</button>
      {err && <p role="alert">{err}</p>}
    </>
  )
}

test('muestra error si email está vacío', () => {
  render(<Form />)
  fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
  expect(screen.getByRole('alert')).toHaveTextContent('Email requerido')
})
