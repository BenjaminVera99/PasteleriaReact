import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imagenes/Mil Sabores.png'
import useAuth from '../hooks/useAuth'
import { logout } from '../services/logoutService'

export default function Navbar({ cartCount = 0 }) {

  const isLogged = useAuth(); // detectamos si hay token

  // ✅ Leer rol directamente desde localStorage
  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

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

            {/* CARRITO */}
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

            {/* MOSTRAR SEGÚN TOKEN */}
            {isLogged ? (
              <>
                {/* ✅ Solo admins ven este botón */}
                {isAdmin && (
                  <Link className="btn btn-white-choco" to="/admin">
                    Admin
                  </Link>
                )}

                <Link className="btn btn-white-choco" to="/perfil">Mi Perfil</Link>

                <button className="btn btn-white-choco" onClick={logout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-white-choco" to="/login">Iniciar Sesión</Link>
                <Link className="btn btn-white-choco" to="/registro">Crear Perfil</Link>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
