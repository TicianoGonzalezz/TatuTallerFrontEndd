import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsuarios,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../Features/usuariosSlice";
import ToastCustomizado from "./ToastCustomizado";
import CrearClase from "./CrearClase"; // Asegúrate de importar el componente CrearClase

const initialForm = {
  nombre: "",
  email: "",
  rol: "",
  password: "",
  password2: "",
};

const apiUrl = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios.lista);
  const loading = useSelector((state) => state.usuarios.loading);
  const [modo, setModo] = useState("lista");
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [busqueda, setBusqueda] = useState("");
  const [usuarioBuscado, setUsuarioBuscado] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (usuarios.length === 0) dispatch(fetchUsuarios());
  }, [dispatch, usuarios.length]);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${apiUrl}/usuario/eliminar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch(eliminarUsuario(id));
        setToast({
          show: true,
          message: "Usuario eliminado",
          variant: "success",
        });
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
  };

  const handleEditar = (usuario) => {
    setForm({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      password: "",
      password2: "",
    });
    setEditId(usuario.id);
    setModo("editar");
  };

  const handleNuevo = () => {
    setForm(initialForm);
    setEditId(null);
    setModo("nuevo");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (form.nombre.trim().length < 4) {
      setToast({
        show: true,
        message: "El nombre debe tener al menos 4 caracteres.",
        variant: "danger",
      });
      return;
    }
    if (!form.email.endsWith("@gmail.com")) {
      setToast({
        show: true,
        message: "El email debe terminar en @gmail.com.",
        variant: "danger",
      });
      return;
    }
    if (!form.rol) {
      setToast({
        show: true,
        message: "Debe seleccionar un rol.",
        variant: "danger",
      });
      return;
    }
    if (form.password !== form.password2) {
      setToast({
        show: true,
        message: "Las contraseñas no coinciden.",
        variant: "danger",
      });
      return;
    }

    const formData = new FormData();
    const usuarioDTO = {
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
    };
    formData.append("usuario", JSON.stringify(usuarioDTO));
    // Si tienes un archivo para adjuntar:
    if (form.archivo) {
      formData.append("archivo", form.archivo);
    }
    formData.append("password", form.password);
    formData.append("password2", form.password2);

    let url = `${apiUrl}/usuario/crearUsuarioDesdeUnAdministrador`;
    let method = "POST";
    if (modo === "editar" && editId) {
      url = `${apiUrl}/usuario/actualizar/${editId}`;
      method = "PUT";
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // No pongas 'Content-Type', fetch lo setea solo con FormData
        },
      });
      if (res.ok) {
        const usuarioResp = await res.json();
        if (modo === "editar") {
          dispatch(
            actualizarUsuario({ ...usuarioResp, password: "", password2: "" })
          );
        } else {
          dispatch(
            agregarUsuario({ ...usuarioResp, password: "", password2: "" })
          );
        }
        setToast({
          show: true,
          message: modo === "editar" ? "Usuario actualizado" : "Usuario creado",
          variant: "success",
        });
        setModo("lista");
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
  };

  // Buscar usuario por gmail
  const handleBuscar = async () => {
    setUsuarioBuscado(null);
    if (!busqueda.endsWith("@gmail.com")) {
      setToast({
        show: true,
        message: "Debe ingresar un email @gmail.com",
        variant: "danger",
      });
      return;
    }
    try {
      const res = await fetch(
        `${apiUrl}/usuario/buscarPorEmail?email=${encodeURIComponent(busqueda)}`
      );
      if (res.ok) {
        const data = await res.json();
        setUsuarioBuscado(data);
        setToast({
          show: true,
          message: "Usuario encontrado",
          variant: "success",
        });
      } else {
        setToast({
          show: true,
          message: "Usuario no encontrado",
          variant: "danger",
        });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
  };

  const handleLimpiarFiltros = () => {
    setBusqueda("");
    setUsuarioBuscado(null);
    // Si querés refrescar desde la API, podés hacer: dispatch(fetchUsuarios());
    // Pero si no, simplemente mostramos la lista redux.
  };

  const usuariosFiltrados =
    filtro.trim() === ""
      ? usuarios
      : usuarios.filter(
          (u) =>
            u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            u.email.toLowerCase().includes(filtro.toLowerCase())
        );

  return (
    <div className="container mt-4">
      <h1>Panel de Administración</h1>

      {/* Buscar usuario por gmail */}
      {modo === "lista" && (
        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar usuario por nombre o email"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={() => setFiltro("")}
            disabled={loading || filtro === ""}
          >
            Limpiar filtro
          </button>
        </div>
      )}

      {modo === "lista" && (
        <>
          <button className="btn btn-primary mb-3 me-2" onClick={handleNuevo}>
            Nuevo Usuario
          </button>
          <button
            className="btn btn-success mb-3"
            onClick={() => setModo("crearClase")}
          >
            Crear Clase
          </button>
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.rol}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditar(u)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(u.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {(modo === "nuevo" || modo === "editar") && (
        <form onSubmit={handleGuardar} className="mb-4">
          <div className="mb-2">
            <label>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
              type="email"
            />
          </div>
          <div className="mb-2">
            <label>Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Seleccionar rol</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PROFESOR">PROFESOR</option>
              <option value="ALUMNO">ALUMNO</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Contraseña</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              type="password"
              required={modo === "nuevo"}
            />
          </div>
          <div className="mb-2">
            <label>Repetir Contraseña</label>
            <input
              name="password2"
              value={form.password2}
              onChange={handleChange}
              className="form-control"
              type="password"
              required={modo === "nuevo"}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success me-2"
            disabled={loading}
          >
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModo("lista")}
          >
            Cancelar
          </button>
        </form>
      )}
      {modo === "crearClase" && (
        <CrearClase onVolver={() => setModo("lista")} />
      )}
      <ToastCustomizado
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        variant={toast.variant === "danger" ? "danger" : "success"}
      />
    </div>
  );
};

export default AdminPanel;
