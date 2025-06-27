import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Inicio from "./Inicio";
import AdminPanel from "./AdminPanel";
import NoEncontrado from "./NoEncontrado";
import RegistroUsuario from "./RegistroUsuario";
import ReservaClases from "./ReservaClases";
import MiCuenta from "./MiCuenta";

const Contenido = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="micuenta" element={<MiCuenta />} />
        <Route path="/clases" element={<ReservaClases />} />
        <Route path="/*" element={<NoEncontrado />} />
      </Routes>
    </main>
  );
};

export default Contenido;
