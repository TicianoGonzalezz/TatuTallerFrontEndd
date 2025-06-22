import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ToastCustomizado from "./ToastCustomizado";

const url = import.meta.env.VITE_API_URL || "http://localhost:8080";

const UsuarioLista = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/usuario/listar`);
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      } else {
        setToast({
          show: true,
          message: "Error al cargar usuarios",
          variant: "danger",
        });
      }
    } catch (error) {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${apiUrl}/usuario/eliminar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setToast({
          show: true,
          message: "Usuario eliminado",
          variant: "success",
        });
        fetchUsuarios();
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch (error) {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Usuarios</h2>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => navigate("/registro")}
      >
        Nuevo Usuario
      </Button>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/usuario/editar/${u.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleEliminar(u.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ToastCustomizado
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
    </div>
  );
};

export default UsuarioLista;
