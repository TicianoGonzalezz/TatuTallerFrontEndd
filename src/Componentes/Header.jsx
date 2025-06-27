import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre"));
  const rol = localStorage.getItem("rol");
  const location = useLocation();

  useEffect(() => {
    const handleStorage = () => setNombre(localStorage.getItem("nombre"));
    window.addEventListener("storage", handleStorage);
    window.addEventListener("nombreChanged", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("nombreChanged", handleStorage);
    };
  }, []);

  const ocultarNav = location.pathname === "/registroUsuario";

  return (
    <header className="bg-white shadow w-full">
      {/* Top bar: full width */}
      <div className="w-full flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/img/tatutaller.png"
            alt="Tatú Taller"
            className="h-12 w-12 object-contain"
          />
          <span className="text-3xl font-bold text-gray-800">Tatú Taller</span>
        </div>
        <div className="flex items-center gap-6">
          {nombre && (
            <span className="text-gray-700 flex items-center gap-2">
              <span className="text-xl">👤</span>
              <Link to="/micuenta" className="hover:text-orange-600 font-semibold">
                Mi Cuenta
              </Link>
            </span>
          )}
          <Link to="/carrito" className="flex items-center gap-1 hover:text-orange-600">
            <span className="text-xl">🛒</span>
            <span>Carrito</span>
            <span className="ml-1 bg-orange-100 text-orange-700 rounded-full px-2 text-xs">0</span>
          </Link>
        </div>
      </div>
      {/* Nav bar */}
      {!ocultarNav && (
        <nav className="flex justify-center gap-8 border-t border-gray-200 py-2 w-full">
          <Link to="/inicio" className="text-gray-700 hover:text-orange-600 font-medium">Nosotros</Link>
          <Link to="/clases" className="text-gray-700 hover:text-orange-600 font-medium">Clases</Link>
          <Link to="/inicio" className="text-gray-700 hover:text-orange-600 font-medium">Ciclo de Formación</Link>
          <Link to="/inicio" className="text-gray-700 hover:text-orange-600 font-medium">Coworok</Link>
          <Link to="/inicio" className="text-gray-700 hover:text-orange-600 font-medium">Alquiler de Hornos</Link>
          <Link to="/tienda" className="text-gray-700 hover:text-orange-600 font-medium">Tienda</Link>
          {rol === "ADMIN" && (
            <Link to="/admin" className="text-gray-700 hover:text-orange-600 font-medium">Panel de Administración</Link>
          )}
          <Logout />
        </nav>
      )}
    </header>
  );
};

export default Header;