import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import Catalogo from '../Catalogo.jsx'

describe('Catalogo', () => {
  it('renderiza el título del catálogo', () => {
    const host = document.createElement('div')
    document.body.appendChild(host)

    const root = createRoot(host)

    act(() => {
      root.render(
        <MemoryRouter>
          <Catalogo />
        </MemoryRouter>
      )
    })

    // Busca el H1 específicamente (más confiable que textContent global)
    const h1 = host.querySelector('h1')
    expect(h1 && h1.textContent).toContain('Catálogo de Productos')

    // limpieza
    act(() => root.unmount())
    host.remove()
  })
})
