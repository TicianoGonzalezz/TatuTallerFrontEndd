import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import Boton from "./Boton";
import ToastCustomizado from "./ToastCustomizado";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de importar los estilos de react-datepicker

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const ReservaClases = () => {
  const [tipo, setTipo] = useState(null); // "PUNTUAL" o "MENSUAL"
  const [fecha, setFecha] = useState(null);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Buscar clases disponibles para la fecha seleccionada
  const buscarClases = async () => {
    setLoading(true);
    setMensaje("");
    try {
      const res = await fetch(
        `${apiUrl}/reservas/disponibles?fecha=${
          fecha ? fecha.toISOString().slice(0, 10) : ""
        }`
      );
      if (!res.ok) throw new Error("No se pudieron obtener las clases");
      const data = await res.json();
      setClases(data);
    } catch (e) {
      setMensaje("No se encontraron clases para esa fecha.");
      setClases([]);
    }
    setLoading(false);
  };

  // Reservar clase (puntual o mensual)
  const reservar = async () => {
    setLoading(true);
    setMensaje("");
    try {
      const usuarioId = localStorage.getItem("iduser");
      const req = {
        claseId: claseSeleccionada.idClase,
        usuarioId: usuarioId,
        tipoReserva: tipo,
        fecha: fecha ? fecha.toISOString().slice(0, 10) : "",
      };
      const res = await fetch(`${apiUrl}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error(await res.text());
      setMensaje(
        tipo === "PUNTUAL"
          ? "Reserva puntual realizada. Esperá la confirmación del profesor por mail."
          : "Reserva mensual realizada. Esperá la confirmación del profesor por mail."
      );
      setClaseSeleccionada(null);
      setClases([]);
      setFecha("");
      setTipo(null);
    } catch (e) {
      setMensaje(e.message || "Error al reservar.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Reserva de clases</h2>
      <p>
        Seleccioná el tipo de reserva que querés realizar. Podés elegir una
        clase puntual o reservar todas las clases de un día específico durante
        el mes (clase mensual).
      </p>
      <div className="mb-3">
        <Boton
          variant={tipo === "PUNTUAL" ? "primary" : "outline-primary"}
          onClick={() => setTipo("PUNTUAL")}
          name="Clase puntual"
          size="md"
        />
        <Boton
          variant={tipo === "MENSUAL" ? "primary" : "outline-primary"}
          onClick={() => setTipo("MENSUAL")}
          name="Clase mensual"
          size="md"
        />
      </div>

      {tipo && (
        <div className="mb-3">
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            placeholderText="Seleccioná una fecha"
          />
          <Boton
            variant="info"
            onClick={buscarClases}
            name={loading ? <Spinner size="sm" /> : "Buscar clases disponibles"}
            size="md"
            disabled={!fecha || loading}
            className="mt-2"
          />
        </div>
      )}

      {clases.length > 0 && (
        <div className="mt-4">
          <h5>Clases disponibles:</h5>
          {clases.map((clase) => (
            <div
              key={clase.idClase}
              className={`p-2 border mb-2 ${
                claseSeleccionada?.idClase === clase.idClase
                  ? "bg-success text-white"
                  : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setClaseSeleccionada(clase)}
            >
              <b>{clase.nombre}</b> - Profesor: {clase.profesor}
              <br />
              {clase.horaDesde} a {clase.horaHasta}
              <br />
              Cupo disponible: {clase.cupoDisponible}
            </div>
          ))}
          {claseSeleccionada && (
            <Boton
              variant="success"
              onClick={reservar}
              name={loading ? <Spinner size="sm" /> : "Reservar"}
              size="md"
              disabled={loading}
              className="mt-2"
            />
          )}
        </div>
      )}

      {mensaje && (
        <ToastCustomizado
          show={!!mensaje}
          onClose={() => setMensaje("")}
          message={mensaje}
          variant={mensaje.includes("realizada") ? "success" : "danger"}
        />
      )}
    </div>
  );
};

export default ReservaClases;
