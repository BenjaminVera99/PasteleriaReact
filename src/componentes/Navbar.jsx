import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imagenes/Mil Sabores.png'

export default function Navbar({ cartCount = 0 }) {
  return (
    <header id="bannerArriba">
      <nav className="nav1">
        <Link to="/"><img src={logo} alt="Pastelería Mil Sabores" className="logo" /></Link>
        <Link to="/">Home</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/catalogo">Catálogo</Link>
      </nav>

      <nav className="nav2">
        <Link to="/carrito" data-count={cartCount}>
          <img src="https://img.icons8.com/ios/50/shopping-bag.png" alt="Carrito" />
          Carrito {cartCount > 0 ? `(${cartCount})` : ""}
        </Link>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/registro">Crear Perfil</Link>
      </nav>
    </header>
  );
}
