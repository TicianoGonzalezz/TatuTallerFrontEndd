import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { useLocation } from "react-router-dom";
import Contenido from './Contenido';
import Header from './Header';
import Footer from './Footer';

const Contenedor = () => {
  const location = useLocation();
  // Rutas donde NO quieres mostrar header/footer
  const hideHeaderFooter = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/registro";

  return (
    <div className='background min-h-screen flex flex-col'>
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        <Contenido />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>

  )
}

export default Contenedor