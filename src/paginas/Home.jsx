import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Imagenes/Mil Sabores.png'
import carrito from '../assets/Imagenes/shopping_bag_24dp_8B4513_FILL0_wght400_GRAD0_opsz24.png'
import Footer from '../componentes/Footer'
import Navbar from '../componentes/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="portadaFoto">
        <div className="imagen"></div>
        <h3>"50 años endulzando Chile con sabor y cariño"</h3>
      </section>

      <section id="TextoAbajo">
        <h2>¡Bienvenidos a Pastelería Mil Sabores!</h2>
        <p>
          Pastelería Mil Sabores celebra su 50° aniversario como un referente en la repostería chilena. 
          Famosa por su participación en un récord Guinness en 1995 al colaborar en la creación de la torta más grande del mundo, 
          nuestra pastelería busca renovar su sistema de ventas online para ofrecer a sus clientes una experiencia de compra moderna y accesible.
        </p>
        <p>
          ¡Celebra la dulzura de la vida con Pastelería Mil Sabores! Estamos emocionados de compartir nuestras delicias contigo. 
          Descubre, saborea y crea momentos inolvidables con nosotros.
        </p>
      </section>

      <Footer />
    </>
  );
}
