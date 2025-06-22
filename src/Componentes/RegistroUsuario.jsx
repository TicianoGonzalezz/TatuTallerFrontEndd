import React, { useState } from "react";
import ToastCustomizado from "./ToastCustomizado";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const RegistroUsuario = ({ idUsuario }) => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();

  // Validaciones
  const contrasenasCoinciden = form.password === form.password2;
  const nombreValido = form.nombre.trim().length >= 4;
  const emailValido = form.email.endsWith("@gmail.com");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (showToast) setShowToast(false);
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const limpiarCampos = () => {
    setForm({ nombre: "", email: "", password: "", password2: "" });
    setArchivo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setExito(false);

    // Validaciones al hacer click
    if (!nombreValido) {
      setToastMsg("El nombre debe tener al menos 4 caracteres.");
      setShowToast(true);
      return;
    }
    if (!emailValido) {
      setToastMsg("El email debe terminar en @gmail.com.");
      setShowToast(true);
      return;
    }
    if (!contrasenasCoinciden) {
      setToastMsg("Las contraseñas no coinciden.");
      setShowToast(true);
      return;
    }

    // Si pasa todas las validaciones, sigue el registro
    const formData = new FormData();
    const usuarioDTO = {
      nombre: form.nombre,
      email: form.email,
      rol: "CLIENTE",
    };
    formData.append("usuario", JSON.stringify(usuarioDTO));
    if (archivo) formData.append("archivo", archivo);
    if (form.password) formData.append("password", form.password);
    if (form.password2) formData.append("password2", form.password2);

    try {
      let url = `http://localhost:8080/usuario/crearUsuarioDesdeAfuera`;
      let method = "POST";
      if (idUsuario) {
        url = `http://localhost:8080/usuario/actualizar/${idUsuario}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (res.ok) {
        setToastMsg(
          idUsuario
            ? "Usuario actualizado correctamente."
            : "Usuario creado correctamente."
        );
        setShowToast(true);
        setExito(true);
        limpiarCampos();
        // Redirigir después de un pequeño delay para que el usuario vea el toast
        setTimeout(() => {
          navigate("/login");
        }, 2500);
        return; // <-- Esto es clave para que no siga ejecutando el catch
      } else {
        const errorMsg = await res.text();
        setMensaje("Error: " + errorMsg);
      }
    } catch (error) {
      setMensaje("Error de conexión.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">
        {idUsuario ? "Editar Usuario" : "Registro de Usuario"}
      </h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        type="email"
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required={!idUsuario}
      />
      <input
        name="password2"
        type="password"
        placeholder="Repetir Contraseña"
        value={form.password2}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required={!idUsuario}
      />

      <ToastCustomizado
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMsg}
        variant={exito ? "success" : "warning"}
      />

      <div>
        <label
          htmlFor="archivo"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition block text-center cursor-pointer"
        >
          Subir Archivo
        </label>
        <input
          id="archivo"
          type="file"
          name="archivo"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <button type="submit" className="w-100 btn btn-success fw-bold py-2">
        {idUsuario ? "Actualizar Usuario" : "Registrar Usuario"}
      </button>
      {mensaje && (
        <div
          className={`mt-2 text-center ${
            exito ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </div>
      )}
    </form>
  );
};

export default RegistroUsuario;
