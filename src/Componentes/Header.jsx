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
    <header className="bg-white shadow-md">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Tatu Taller
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {!ocultarNav && (
                <>
                  <Nav.Link as={Link} to="/inicio">
                    Inicio
                  </Nav.Link>
                  {/* Solo muestra el link si es ADMIN */}
                  {rol === "ADMIN" && (
                    <Nav.Link as={Link} to="/admin">
                      Panel de Administración
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="/inicio">
                    Nosotros
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inicio">
                    Clases
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inicio">
                    Ciclo de Formacion
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inicio">
                    Cowork
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inicio">
                    Alquiler de Hornos
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inicio">
                    Tienda
                  </Nav.Link>
                  <Logout />
                </>
              )}
              {nombre && (
                <span className="text-white ms-3">
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