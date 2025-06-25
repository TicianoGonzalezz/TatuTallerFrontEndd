import React, { useEffect, useState } from "react";

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/producto/listar")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtrado de productos
  const productosFiltrados = productos.filter(producto => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincidePrecioMin = precioMin ? producto.precio >= Number(precioMin) : true;
    const coincidePrecioMax = precioMax ? producto.precio <= Number(precioMax) : true;
    return coincideNombre && coincidePrecioMin && coincidePrecioMax;
  });

  return (
    <div className="container mt-4">
      <h1>Tienda</h1>
      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Precio mínimo"
            value={precioMin}
            onChange={e => setPrecioMin(e.target.value)}
            min={0}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Precio máximo"
            value={precioMax}
            onChange={e => setPrecioMax(e.target.value)}
            min={0}
          />
        </div>
        <div className="col-md-2 mb-2">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setBusqueda("");
              setPrecioMin("");
              setPrecioMax("");
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
      {/* Lista de productos */}
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <div className="row">
          {productosFiltrados.length === 0 ? (
            <div className="col-12">No se encontraron productos.</div>
          ) : (
            productosFiltrados.map(producto => (
              <div className="col-md-4 mb-4" key={producto.id}>
                <div className="card h-100">
                  {producto.imagenUrl && (
                    <img
                      src={`http://localhost:8080${producto.imagenUrl}`}
                      className="card-img-top"
                      alt={producto.nombre}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="card-text"><strong>${producto.precio}</strong></p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tienda;