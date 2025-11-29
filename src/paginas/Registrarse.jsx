import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../Registrarse.css'
// Asumo que registerUser y loginRequest están en authService.js
import { registerUser, loginRequest } from '../services/authService'; 

export default function Registrarse() {

  const navigate = useNavigate()

  // Campos visibles del formulario
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [fechaNac, setFechaNac] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 👉 FUNCIÓN DE ENVÍO DEL FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validaciones
        if (!nombres || !apellidos || !email || !password1 || !password2 || !fechaNac) {
            setError("Por favor completa todos los campos");
            return;
        }

        if (password1 !== password2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Limpiar errores previos
        setError('');
        setSuccess('');

        // 2. Construir el objeto de datos (PAYLOAD) con las claves que el backend espera
        // 🚨 IMPORTANTE: Mapear 'email' a 'username' y usar 'fechaNac'
        const userData = {
            username: email,          // Mapea email (frontend) a username (backend)
            password: password1,      // Mapea password1 a password
            nombres: nombres,
            apellidos: apellidos,
            fechaNac: fechaNac        // Asegúrate que el input type="date" ya da formato YYYY-MM-DD
        };

        try {
            // 3. Llamar a registerUser pasando el objeto completo
            const result = await registerUser(userData);

            // ⛔ Si el backend devuelve { error: "..." } o si la respuesta no es 2xx
            if (result.error) {
                setError(result.error);
                return;
            }

            setSuccess("Registro exitoso. Iniciando sesión...");

            // ✓ Registro OK → iniciar sesión automáticamente
            // Asumo que loginRequest también requiere username y password, no el email y pass raw
            const token = await loginRequest({ username: email, password: password1 });
            
            // Si tu login devuelve un objeto con el token, ajusta:
            // const token = loginResult.token; 
            
            localStorage.setItem("token", token);

            navigate("/");

        } catch (err) {
            console.error('Error de registro o red:', err);
            
            // Intenta extraer el error del objeto de respuesta (si usas Axios o Fetch correctamente)
            const backendError = err.response?.data?.error || err.message;
            
            if (backendError) {
                // Si el error es por usuario ya existe, formato de fecha, etc.
                setError(`Error al registrar: ${backendError}`);
            } else {
                setError("Error de conexión con el servidor. Intenta más tarde.");
            }
        }
    };


  return (
    <>
      <Navbar />

      <section id="Formularios">
        <form id="Registrarse" onSubmit={handleSubmit} noValidate>
          <h1>Registrarse</h1>

          {/* CAMPOS DEL FORMULARIO (Se mantienen igual) */}
          <div className="row">
            <label htmlFor="nombres">Nombres</label>
            <input type="text" id="nombres" className="form-control input-control"
              placeholder="Ingrese su nombre"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" id="apellidos" className="form-control input-control"
              placeholder="Ingrese su apellido"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="emailRegistro">Correo</label>
            <input type="email" id="emailRegistro" className="form-control input-control"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <label htmlFor="fechaNac">Fecha de nacimiento</label>
            <input type="date" id="fechaNac" className="form-control input-control"
              value={fechaNac}
              onChange={(e) => setFechaNac(e.target.value)}
            />
          </div>

          {/* CONTRASEÑA (Se mantienen igual) */}
          <div className="row">
            <label htmlFor="password1">Contraseña</label>
            <div className="input-group password-group">
              <input
                type={showPass1 ? 'text' : 'password'}
                id="password1"
                className="form-control input-control"
                placeholder="Ingrese su contraseña"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <button type="button" className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPass1(v => !v)}>
                {showPass1 ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <div className="row">
            <label htmlFor="password2">Repetir Contraseña</label>
            <div className="input-group password-group">
              <input
                type={showPass2 ? 'text' : 'password'}
                id="password2"
                className="form-control input-control"
                placeholder="Ingrese su contraseña nuevamente"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button type="button" className="btn btn-outline-brown toggle-password"
                onClick={() => setShowPass2(v => !v)}>
                {showPass2 ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* MENSAJES */}
          {error && <div className="error-alert">{error}</div>}
          {success && <div className="success-alert">{success}</div>}

          <button type="submit">Enviar Registro</button>

          <Link id="linkInicio" to="/login" className="link-login">
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </form>
      </section>
    </>
  )
}