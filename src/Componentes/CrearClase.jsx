import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Boton from "./Boton";
import ToastCustomizado from "./ToastCustomizado";

const apiUrl = import.meta.env.VITE_API_URL;

const CrearClase = ({ onVolver }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [profesorId, setProfesorId] = useState("");
  const [sedeId, setSedeId] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [horaDesde, setHoraDesde] = useState("");
  const [horaHasta, setHoraHasta] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      const res = await fetch(`${apiUrl}/clase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          profesorId: profesorId ? Number(profesorId) : null,
          sedeId: sedeId ? Number(sedeId) : null,
          diaSemana: diaSemana ? Number(diaSemana) : null,
          horaDesde,
          horaHasta,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMensaje("Clase creada con éxito.");
      setNombre("");
      setDescripcion("");
      setProfesorId("");
      setSedeId("");
      setDiaSemana("");
      setHoraDesde("");
      setHoraHasta("");
    } catch (e) {
      setMensaje(e.message || "Error al crear la clase.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Crear nueva clase</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>ID Profesor</Form.Label>
          <Form.Control
            value={profesorId}
            onChange={(e) => setProfesorId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>ID Sede</Form.Label>
          <Form.Control
            value={sedeId}
            onChange={(e) => setSedeId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Día de la semana (1=Lunes, 7=Domingo)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="7"
            value={diaSemana}
            onChange={(e) => setDiaSemana(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Hora desde</Form.Label>
          <Form.Control
            type="time"
            value={horaDesde}
            onChange={(e) => setHoraDesde(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Hora hasta</Form.Label>
          <Form.Control
            type="time"
            value={horaHasta}
            onChange={(e) => setHoraHasta(e.target.value)}
            required
          />
        </Form.Group>
        <Boton
          variant="primary"
          type="submit"
          name={loading ? <Spinner size="sm" /> : "Crear clase"}
          size="md"
          disabled={loading}
        />
        {onVolver && (
          <Boton
            variant="secondary"
            onClick={onVolver}
            name="Volver"
            size="md"
            className="mt-2"
          />
        )}
      </Form>
      {mensaje && (
        <ToastCustomizado
          show={!!mensaje}
          onClose={() => setMensaje("")}
          message={mensaje}
          variant={mensaje.includes("éxito") ? "success" : "danger"}
        />
      )}
    </div>
  );
};

export default CrearClase;
