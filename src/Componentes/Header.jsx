import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre"));
  const rol = localStorage.getItem("rol");
  const location = useLocation();

  useEffect(() => {
    const handleStorage = () => {
      setNombre(localStorage.getItem("nombre"));
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("nombreChanged", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("nombreChanged", handleStorage);
    };
  }, []);

  // Oculta navegación si está en /registroUsuario
  const ocultarNav = location.pathname === "/registroUsuario";

  return (
    <header style={{ background: "#F5F0E6" }}>
      <Navbar
        expand="lg"
        style={{
          background: "#F5F0E6",
          borderBottom: "1px solid #eee",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2"
          >
            <img
              src="/img/imageslogotatu.png"
              alt="Tatu Taller"
              style={{ height: 48, width: "auto", maxWidth: 60 }}
            />
            <span
              style={{ color: "#2D2D2D", fontWeight: 500, fontSize: "1.8rem" }}
            >
              Tatú Taller
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {!ocultarNav && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/inicio"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Inicio
                  </Nav.Link>
                  {rol === "ADMIN" && (
                    <Nav.Link
                      as={Link}
                      to="/admin"
                      style={{ color: "#D4B483", fontWeight: 500 }}
                    >
                      Panel de Administración
                    </Nav.Link>
                  )}
                  <Nav.Link
                    as={Link}
                    to="/inicio"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Nosotros
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/clases"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Clases
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/inicio"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Ciclo de Formación
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/inicio"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Cowork
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/inicio"
                    style={{ color: "#3A3A3A", fontWeight: 500 }}
                  >
                    Alquiler de Hornos
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/tienda"
                    style={{ color: "#D4B483", fontWeight: 500 }}
                  >
                    Tienda
                  </Nav.Link>
                  <Logout />
                </>
              )}
              {nombre && (
                <span style={{ color: "#2D2D2D" }} className="ms-3">
                  Bienvenido, <strong>{nombre}</strong>
                </span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
