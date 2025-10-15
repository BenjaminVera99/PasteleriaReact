import React from 'react'
import { createRoot } from 'react-dom/client'
import Catalogo from '../Catalogo'

describe('Catalogo', () => {
  it('renderiza el título del catálogo', () => {
    const host = document.createElement('div')
    const root = createRoot(host)
    root.render(<Catalogo />)
    expect(host.textContent).toContain('Catálogo de Productos')
  })
})
