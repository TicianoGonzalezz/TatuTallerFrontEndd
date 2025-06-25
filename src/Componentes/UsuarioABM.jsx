import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsuarios,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../Features/usuariosSlice";

const initialForm = {
  nombre: "",
  email: "",
  rol: "",
  password: "",
  password2: "",
  archivo: null,
};

const UsuarioABM = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios.lista);
  const loading = useSelector((state) => state.usuarios.loading);
  const [modo, setModo] = useState("lista");
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [filtro, setFiltro] = useState("");
  const [infoAlumno, setInfoAlumno] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (usuarios.length === 0) dispatch(fetchUsuarios());
  }, [dispatch, usuarios.length]);

  const handleEliminar = async (id) => {
    
    try {
      const res = await fetch(`http://localhost:8080/usuario/eliminar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        dispatch(eliminarUsuario(id));
        setToast({ show: true, message: "Usuario eliminado", variant: "success" });
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
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      password: "",
      password2: "",
      archivo: null,
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
    if (e.target.name === "archivo") {
      setForm({ ...form, archivo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (form.nombre.trim().length < 4) {
      setToast({ show: true, message: "El nombre debe tener al menos 4 caracteres.", variant: "danger" });
      return;
    }
    if (!form.email.endsWith("@gmail.com")) {
      setToast({ show: true, message: "El email debe terminar en @gmail.com.", variant: "danger" });
      return;
    }
    if (!form.rol) {
      setToast({ show: true, message: "Debe seleccionar un rol.", variant: "danger" });
      return;
    }
    if (form.password !== form.password2) {
      setToast({ show: true, message: "Las contraseñas no coinciden.", variant: "danger" });
      return;
    }

    const formData = new FormData();
    const usuarioDTO = {
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
    };
    formData.append("usuario", JSON.stringify(usuarioDTO));
    if (form.archivo) formData.append("archivo", form.archivo);
    formData.append("password", form.password);
    formData.append("password2", form.password2);

    let url = "http://localhost:8080/usuario/crearUsuarioDesdeUnAdministrador";
    let method = "POST";
    if (modo === "editar" && editId) {
      url = `http://localhost:8080/usuario/actualizar/${editId}`;
      method = "PUT";
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const usuarioResp = await res.json();
        if (modo === "editar") {
          dispatch(actualizarUsuario({ ...usuarioResp, password: "", password2: "" }));
        } else {
          dispatch(agregarUsuario({ ...usuarioResp, password: "", password2: "" }));
        }
        setToast({ show: true, message: modo === "editar" ? "Usuario actualizado" : "Usuario creado", variant: "success" });
        setModo("lista");
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
  };

  const handleInfo = async (id) => {
    // Buscá el usuario en la lista para obtener rol e imagenUrl
    const usuarioBase = usuarios.find(u => u.id === id);
    try {
      const res = await fetch(`http://localhost:8080/usuario/info/${id}`);
      if (res.ok) {
        const data = await res.json();
        // Combiná los datos del endpoint info con los del usuario base
        setInfoAlumno({
          ...data,
          rol: usuarioBase?.rol,
          imagenUrl: usuarioBase?.imagenUrl,
        });
        setShowInfo(true);
      }
    } catch {
      // Manejo de error opcional
    }
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
    <div>
      <h2>Gestión de Usuarios</h2>
      {modo === "lista" && (
        <>
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
          <button className="btn btn-primary mb-3 me-2" onClick={handleNuevo}>
            Nuevo Usuario
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Imagen</th>
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
                    {u.imagenUrl && (
                      <img src={`http://localhost:8080${u.imagenUrl}`} alt={u.nombre} width={50} />
                    )}
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleInfo(u.id)}>
                      Info
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(u)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(u.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {(modo === "nuevo" || modo === "editar") && (
        <form onSubmit={handleGuardar} className="mb-4">
          <div className="mb-2">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="form-control" required type="email" />
          </div>
          <div className="mb-2">
            <label>Rol</label>
            <select name="rol" value={form.rol} onChange={handleChange} className="form-control" required>
              <option value="">Seleccionar rol</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PROFESOR">PROFESOR</option>
              <option value="ALUMNO">ALUMNO</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Contraseña</label>
            <input name="password" value={form.password} onChange={handleChange} className="form-control" type="password" required={modo === "nuevo"} />
          </div>
          <div className="mb-2">
            <label>Repetir Contraseña</label>
            <input name="password2" value={form.password2} onChange={handleChange} className="form-control" type="password" required={modo === "nuevo"} />
          </div>
          <div className="mb-2">
            <label>Imagen</label>
            <input name="archivo" type="file" onChange={handleChange} className="form-control" accept="image/*" />
          </div>
          <button type="submit" className="btn btn-success me-2" disabled={loading}>Guardar</button>
          <button type="button" className="btn btn-secondary" onClick={() => setModo("lista")}>Cancelar</button>
        </form>
      )}
      {toast.show && (
        <div className={`alert alert-${toast.variant} mt-3`} role="alert">
          {toast.message}
        </div>
      )}

      {/* Modal de información */}
      {showInfo && infoAlumno && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información de {infoAlumno.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setShowInfo(false)}></button>
              </div>
              <div className="modal-body text-center">
                {infoAlumno.imagenUrl && (
                  <img
                    src={`http://localhost:8080${infoAlumno.imagenUrl}`}
                    alt={infoAlumno.nombre}
                    width={80}
                    height={80}
                    className="rounded-circle mb-3"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <h4>{infoAlumno.nombre}</h4>
                <p><strong>Rol:</strong> {infoAlumno.rol}</p>
                <p><strong>Email:</strong> {infoAlumno.email}</p>
                <h6>Historial de clases:</h6>
                <ul>
                  {infoAlumno.clasesInscripto && infoAlumno.clasesInscripto.length > 0 ? (
                    infoAlumno.clasesInscripto.map(clase => (
                      <li key={clase.id}>
                        {clase.nombre} - {clase.fechaDesde} a {clase.fechaHasta}
                      </li>
                    ))
                  ) : (
                    <li>No tiene clases inscriptas.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuarioABM;