import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2>Panel de Inicio</h2>
      <p>Bienvenido al panel de Inicio.</p>
    </div>
  );
};

export default Inicio;