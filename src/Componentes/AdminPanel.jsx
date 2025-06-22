import UsuarioABM from "./UsuarioABM";
import ProductoABM from "./ProductoAMB";
import CrearClase from "./CrearClase";
import ToastCustomizado from "./ToastCustomizado";
import React, { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
<<<<<<< HEAD
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
=======
  const [seccion, setSeccion] = useState("usuarios");
>>>>>>> ae66fc5af3cdf3b5cfe8bdbb0a30f3ce5afa223f

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
