import React, { useState, useEffect } from "react";

const MiCuenta = ({ userId }) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    imagenUrl: "",
  });
  const [editando, setEditando] = useState(false);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetch(`/api/usuarios/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setPreview(data.imagenUrl || "");
      })
      .catch(() => alert("Error al cargar usuario"));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setNuevaImagen(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleActualizar = () => {
    const formData = new FormData();
    formData.append("nombre", usuario.nombre);
    formData.append("email", usuario.email);
    if (nuevaImagen) {
      formData.append("imagen", nuevaImagen);
    }
    fetch(`/api/usuarios/${userId}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setEditando(false);
        alert("Datos actualizados");
      })
      .catch(() => alert("Error al actualizar"));
  };

  return (
    <div>
      <h2>Mi Cuenta</h2>
      <label>
        Nombre:
        <input
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          disabled={!editando}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          name="email"
          value={usuario.email}
          onChange={handleChange}
          disabled
          style={{ backgroundColor: "#eee", cursor: "not-allowed" }}
        />
      </label>
      <br />
      <label>
        Imagen:
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
          disabled={!editando}
        />
      </label>
      <br />
      {preview && (
        <img
          src={preview}
          alt="Imagen de perfil"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}
      <br />
      {!editando ? (
        <button onClick={() => setEditando(true)}>Editar</button>
      ) : (
        <button onClick={handleActualizar}>Actualizar</button>
      )}
    </div>
  );
};

export default MiCuenta;