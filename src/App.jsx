import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'
import Catalogo from './paginas/Catalogo'
import Carrito from './paginas/Carrito'
import Registro from './paginas/Registrarse'
import InicioSesion from './paginas/IniciarSesion'
import Contacto from './paginas/Contacto'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<InicioSesion />} />
      </Routes>
    </Router>
  )
}

export default App
