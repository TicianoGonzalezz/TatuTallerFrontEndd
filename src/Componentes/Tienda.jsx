import React, { useEffect, useState } from "react";

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/producto/listar")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Tienda</h1>
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <div className="row">
          {productos.map(producto => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <div className="card h-100">
                {console.log(producto)}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Tienda;