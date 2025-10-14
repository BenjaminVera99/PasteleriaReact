import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imagenes/Mil Sabores.png'

export default function Navbar({ cartCount = 0 }) {
  return (
    <header
      id="bannerArriba"
      className="sticky-top bg-pink border-brown rounded-3 shadow-sm px-3 py-2"
    >
      <div className="container-fluid">
        <div className="row align-items-center g-2">

          <div className="col-12 col-md-8 d-flex align-items-center gap-3 flex-wrap">
            <Link to="/" className="d-inline-flex align-items-center text-decoration-none">
              <img src={logo} alt="Pastelería Mil Sabores" className="logo me-2" />
              <span className="brand-title">Mil Sabores</span>
            </Link>

            <nav className="d-flex align-items-center gap-2 flex-wrap ms-md-3">
              <Link className="navlink" to="/">Home</Link>
              <Link className="navlink" to="/contacto">Contacto</Link>
              <Link className="navlink" to="/catalogo">Catálogo</Link>
            </nav>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center gap-2">
            <Link
              to="/carrito"
              data-count={cartCount}
              className="btn btn-white-choco position-relative d-inline-flex align-items-center gap-1"
            >
              <img
                src="https://img.icons8.com/ios/50/shopping-bag.png"
                alt="Carrito"
                height="20"
                width="20"
              />
              Carrito
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link className="btn btn-white-choco" to="/login">Iniciar Sesión</Link>
            <Link className="btn btn-white-choco" to="/registro">Crear Perfil</Link>
          </div>

        </div>
      </div>
    </header>
  );
}
