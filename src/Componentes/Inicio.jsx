import React from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "./Herocarousel"; 
import QuienesSomos from "./QuienesSomos";
import Contacto from "./Contacto";
import PreguntasFrecuentes from "./PreguntasFrecuentes";

const Inicio = () => {
  return (
    <div>
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden rounded-lg shadow-md mt-6">
      {/* Imagen de fondo */}
      <img
        src="/hero-tatu.jpg" // Cambia por tu imagen real
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      {/* Contenido centrado */}
      <HeroCarousel />
    </section>
    <section>
       <QuienesSomos/>
    </section>
    <section>
      <PreguntasFrecuentes/>
    </section>
    <section>
      <Contacto />
    </section>
    </div>
  );
};

export default Inicio;