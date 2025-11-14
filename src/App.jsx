import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './paginas/Home'
import Catalogo from './paginas/Catalogo'
import Carrito from './paginas/Carrito'
import Registro from './paginas/Registrarse'
import InicioSesion from './paginas/IniciarSesion'
import Contacto from './paginas/Contacto'
import Categorias from './paginas/Categorias'
import Checkout from './paginas/Checkout'
import CompraExitosa from './paginas/CompraExitosa'
import CompraError from './paginas/CompraError'
import Ofertas from './paginas/Ofertas'
import Admin from './paginas/Admin'

// ⭐ importación NUEVA
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<InicioSesion />} />

        <Route path="/categorias" element={<Categorias />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-error" element={<CompraError />} />
        <Route path="/ofertas" element={<Ofertas />} />

        {/* ⭐ ahora admin está protegido por JWT */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  )
}
