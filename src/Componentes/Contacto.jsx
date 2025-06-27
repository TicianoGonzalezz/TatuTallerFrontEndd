import React from "react";

const Contacto = () => (
  <section className="bg-[#e9dbc4] py-12">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start px-4">
      {/* Datos de contacto */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Contacto</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tienda</h3>
          <div className="flex items-center gap-2 mb-1">
            <span>🏬</span>
            <span>Online y en nuestro taller físico</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span>📱</span>
            <span>09X XXX XXX</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span>✉️</span>
            <span>tienda@tatutaller.com</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Taller</h3>
          <div className="flex items-center gap-2 mb-1">
            <span>📍</span>
            <span>Wilson Ferreira Aldunate 1238 esquina Soriano, Montevideo</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span>📱</span>
            <span>09X XXX XXX</span>
          </div>
        </div>
      </div>
      {/* Mapa */}
      <div className="flex-1 w-full">
        <iframe
          title="Mapa"
          src="https://www.google.com/maps?q=Wilson+Ferreira+Aldunate+1238,+Montevideo,+Uruguay&output=embed"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);

export default Contacto;