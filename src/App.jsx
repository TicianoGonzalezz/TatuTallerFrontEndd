import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Contenedor from './Componentes/Contenedor';
import store from './redux/store';
import ProtectedRoute from './Componentes/ProtectedRoute';
import AdminPanel from './Componentes/AdminPanel';
import RegistroUsuario from './Componentes/RegistroUsuario';
import Login from './Componentes/Login';

import './App.css'


function App() {


  return (
    
     <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registroUsuario" element={<RegistroUsuario />} />
          <Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
          {/* Agrega aquí más rutas protegidas si lo necesitas */}
          <Route path="*" element={
            <ProtectedRoute>
            <Contenedor />
            </ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </Provider>

    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/usuario/editar/:id" element={<UsuarioForm />} />
    //   <Route path="/usuario/nuevo" element={<UsuarioForm />} />
    //     <Route path="/usuarios" element={<UsuarioLista />}/>
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/registro" element={<Registro />} />
    //     <Route path="/login" element={<Login/>} /> 
    //     <Route path="/" element={<h1>Bienvenido a la app</h1>} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
