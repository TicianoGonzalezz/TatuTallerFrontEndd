import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import ToastCustomizado from "./ToastCustomizado";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const UsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "",
    password: "",
    password2: "",
  });
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${apiUrl}/usuario/${id}`)
        .then((res) => res.json())
        .then((data) => setForm({ ...form, ...data }))
        .catch(() =>
          setToast({
            show: true,
            message: "Error al cargar usuario",
            variant: "danger",
          })
        )
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const usuarioDTO = {
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
    };
    formData.append("usuario", JSON.stringify(usuarioDTO));
    if (archivo) formData.append("archivo", archivo);
    // Solo enviar password si fue modificado
    if (form.password) formData.append("password", form.password);
    if (form.password2) formData.append("password2", form.password2);

    let url = `${apiUrl}/usuario/crear`;
    let method = "POST";
    if (id) {
      url = `${apiUrl}/usuario/actualizar/${id}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        setToast({
          show: true,
          message: id ? "Usuario actualizado" : "Usuario creado",
          variant: "success",
        });
        setTimeout(() => navigate("/usuarios"), 1500);
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch (error) {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rol</Form.Label>
          <Form.Control
            as="select"
            name="rol"
            value={form.rol}
            onChange={handleChange}
          >
            <option value="PROFESOR">PROFESOR</option>
            <option value="ALUMNO">ALUMNO</option>
            <option value="ADMIN">ADMINISTRADOR</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control
            name="password2"
            value={form.password2}
            onChange={handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Archivo (opcional)</Form.Label>
          <Form.Control
            type="file"
            name="archivo"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? <Spinner size="sm" /> : id ? "Actualizar" : "Crear"}
        </Button>
        <Button
          variant="secondary"
          className="mt-3 ms-2"
          onClick={() => navigate("/usuarios")}
        >
          Cancelar
        </Button>
      </Form>
      <ToastCustomizado
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant}
      />
    </div>
  );
};

export default UsuarioForm;
