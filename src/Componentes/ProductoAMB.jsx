import React, { useEffect, useState } from "react";

const initialForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  archivo: null,
};

const ProductoABM = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [modo, setModo] = useState("lista");
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });
  const [loading, setLoading] = useState(false);

  // Traer productos
  useEffect(() => {
    fetch("http://localhost:8080/producto/listar")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, [modo]);

  const handleChange = (e) => {
    if (e.target.name === "archivo") {
      setForm({ ...form, archivo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleNuevo = () => {
    setForm(initialForm);
    setEditId(null);
    setModo("nuevo");
  };

  const handleEditar = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      archivo: null,
    });
    setEditId(producto.id);
    setModo("editar");
  };

  const handleEliminar = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/producto/eliminar/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setToast({ show: true, message: "Producto eliminado", variant: "success" });
        setProductos(productos.filter((p) => p.id !== id)); // <-- ACTUALIZA EL ESTADO
        setModo("lista");
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
    setLoading(false);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const productoDTO = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: form.precio,
      stock: form.stock,
    };
    formData.append("producto", JSON.stringify(productoDTO));
    if (form.archivo) formData.append("archivo", form.archivo);

    let url = "http://localhost:8080/producto/crear";
    let method = "POST";
    if (modo === "editar" && editId) {
      url = `http://localhost:8080/producto/actualizar/${editId}`;
      method = "PUT";
    }

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (res.ok) {
        setToast({ show: true, message: modo === "editar" ? "Producto actualizado" : "Producto creado", variant: "success" });
        setModo("lista");
      } else {
        const msg = await res.text();
        setToast({ show: true, message: msg, variant: "danger" });
      }
    } catch {
      setToast({ show: true, message: "Error de conexión", variant: "danger" });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      {modo === "lista" && (
        <>
          <button className="btn btn-primary mb-3" onClick={handleNuevo}>Nuevo Producto</button>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>
                    {p.imagenUrl && (
                      <img src={`http://localhost:8080${p.imagenUrl}`} alt={p.nombre} width={50} />
                    )}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p.id)}>Eliminar</button>
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
            <label>Descripción</label>
            <input name="descripcion" value={form.descripcion} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-2">
            <label>Precio</label>
            <input name="precio" value={form.precio} onChange={handleChange} className="form-control" type="number" required />
          </div>
          <div className="mb-2">
            <label>Stock</label>
            <input name="stock" value={form.stock} onChange={handleChange} className="form-control" type="number" required />
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
    </div>
  );
};

export default ProductoABM;