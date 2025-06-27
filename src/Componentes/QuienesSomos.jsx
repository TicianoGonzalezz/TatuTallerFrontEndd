import React from "react";

const QuienesSomos = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Quiénes Somos</h2>

        {/* Imagen centrada */}
        <div className="mb-6">
          <img
            src="/img/tallerCera.webp"
            alt="Nuestro taller de cerámica"
            className="w-full h-auto rounded-md shadow-lg object-cover"
          />
        </div>

        {/* Texto descriptivo */}
        <p className="text-lg text-gray-700 mb-4">
          En Tatú Taller, desde abril de 2015, creamos un espacio de aprendizaje y producción en cerámica diseñado para todas las edades y niveles. Somos un núcleo creativo y pedagógico, donde se combinan clases presenciales, coworking y venta de materiales, además de encargos personalizados.
        </p>
        
        <p className="text-lg text-gray-700">
          Nos apasiona difundir el arte del barro y compartir técnicas ancestrales y contemporáneas: desde modelado manual y torno, hasta esmaltado y cocción. Ideal tanto para principiantes como para ceramistas avanzados, en grupos reducidos brindamos atención personalizada y un ambiente inspirador.
        </p>
      </div>
    </section>
  );
};

export default QuienesSomos;
