import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    imagen: "/img/claseCeramicaNinosYAdultos.avif",
    titulo: "Clases de ceramica para niños y adultos",
    descripcion: "Espacios compartidos para crear y aprender.",
  },
  {
    imagen: "/img/trabajo-artesanal-profesional-taller_23-2148801615.avif",
    titulo: "Ciclo de Formación Profesional",
    descripcion: "Formación integral en cerámica y alfarería.",
  },
  {
    imagen: "/img/coworkceramico2.jpeg",
    titulo: "Cowork Ceramico",
    descripcion: "Un espacio para que tu creatividad brille.",
  },
  {
    imagen: "/img/alquilerHorno.avif",
    titulo: "Alquiler de Hornos",
    descripcion: "Alquila un horno para tus proyectos cerámicos.",

  },
  {
    imagen: "/img/ventaInsumos.jpg",
    titulo: "Venta de insumos y materiales",
    descripcion: "Todo lo que necesitas para tus proyectos cerámicos.",
  },
 
];

const HeroCarousel = () => {
  const [actual, setActual] = useState(0);

  // Cambio automático cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative w-full h-[60vh] mt-6 overflow-hidden rounded-lg shadow-md">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === actual ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.imagen}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg mb-2">
              {slide.titulo}
            </h1>
            <p className="text-lg md:text-xl drop-shadow mb-4">
              {slide.descripcion}
            </p>
            <Link
              to="/tienda"
              className="bg-yellow-100 text-gray-800 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-200 transition"
            >
              Conocenos
            </Link>
          </div>
        </div>
      ))}

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActual(index)}
            className={`w-3 h-3 rounded-full ${
              index === actual ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
