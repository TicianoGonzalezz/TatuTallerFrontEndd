import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from './Boton';

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("nombreChanged")); // <-- Esto es clave
    navigate('/login');
  };

  // Solo muestra el botón si hay sesión activa
  if (!localStorage.getItem('apikey') && !localStorage.getItem('iduser')) {
    return null;
  }

  return (
    <Boton onClick={logout} variant="secondary" name="Cerrar Sesión" />
  );
};

export default Logout;

