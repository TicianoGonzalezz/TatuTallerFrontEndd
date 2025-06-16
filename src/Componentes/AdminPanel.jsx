import UsuarioABM from "./UsuarioABM";
import ProductoABM from "./ProductoAMB";
import CrearClase from "./CrearClase";
import ToastCustomizado from "./ToastCustomizado";
import React, { useState } from "react";

const AdminPanel = () => {
  const [seccion, setSeccion] = useState("usuarios");

  return (
    <div className="container mt-4">
      <h1>Panel de Administración</h1>
      <div className="mb-4">
        <button
          className={`btn me-2 ${seccion === "usuarios" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccion("usuarios")}
        >
          Usuarios
        </button>
        <button
          className={`btn me-2 ${seccion === "productos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccion("productos")}
        >
          Productos
        </button>
        <button
          className={`btn ${seccion === "clases" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSeccion("clases")}
        >
          Clases
        </button>
      </div>

      {seccion === "usuarios" && <UsuarioABM />}
      {seccion === "productos" && <ProductoABM />}
      {seccion === "clases" && <CrearClase onVolver={() => setSeccion("usuarios")} />}
    </div>
  );
};

export default AdminPanel;
