import { useRef, useState, useEffect } from 'react';
import Boton from './Boton';
import ToastCustomizado from './ToastCustomizado';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const baseURL = "http://localhost:8080/usuario/login";
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [botonHabilitado, setBotonHabilitado] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('danger');
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem('apikey');
    if (apiKey != null) {
      navigate("/Inicio");
    }
  }, [navigate]);

  const verificarContenido = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setBotonHabilitado(!(email && password));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    try {
      const res = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('iduser', data.usuario.id);
        localStorage.setItem('nombre', data.usuario.nombre);
        localStorage.setItem('apikey', data.apikey);
        localStorage.setItem('rol', data.usuario.rol);
        setToastVariant('success');
        setToastMessage('¡Bienvenido!');
        setShowToast(true);
        navigate("/inicio");
      } else {  
        const errorMsg = await res.text();
        setToastVariant('danger');
        setToastMessage(errorMsg);
        setShowToast(true);
      }
    } catch (error) {
      setToastVariant('danger');
      setToastMessage("Error de conexión");
      setShowToast(true);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    axios.post('http://localhost:8080/usuario/login-google', {
      token: credentialResponse.credential
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('nombre', res.data.usuario.nombre);
      localStorage.setItem('rol', res.data.usuario.rol);
      localStorage.setItem('iduser', res.data.usuario.id);
      if (res.data.apikey) {
        localStorage.setItem('apikey', res.data.apikey);
      }
      navigate("/inicio");
    }).catch(err => {
      alert('Error en el login con Google');
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f8f1e6] via-[#e9dbc4] to-[#f8f1e6]">
      <div className="w-full max-w-6xl mx-4 md:mx-0 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 relative overflow-hidden flex flex-col items-center">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#e9dbc4] rounded-full opacity-40 blur-2xl"></div>
        <h1 className="text-4xl font-extrabold text-center mb-8 text-[#7c5e2c] tracking-tight drop-shadow">Iniciar Sesión</h1>
        <form onSubmit={handleLogin} className="space-y-6 w-full max-w-lg mx-auto">
          <div>
            <label className="block text-[#7c5e2c] font-semibold mb-1" htmlFor="emailLogin">Email</label>
            <input
              id="emailLogin"
              type="email"
              placeholder="ejemplo@email.com"
              onChange={verificarContenido}
              ref={emailRef}
              className="w-full px-4 py-2 rounded-lg border border-[#e9dbc4] focus:outline-none focus:ring-2 focus:ring-[#7c5e2c] bg-[#f8f1e6] text-[#7c5e2c] transition"
            />
          </div>
          <div>
            <label className="block text-[#7c5e2c] font-semibold mb-1" htmlFor="passwordLogin">Contraseña</label>
            <input
              id="passwordLogin"
              type="password"
              placeholder="Contraseña"
              onChange={verificarContenido}
              ref={passwordRef}
              className="w-full px-4 py-2 rounded-lg border border-[#e9dbc4] focus:outline-none focus:ring-2 focus:ring-[#7c5e2c] bg-[#f8f1e6] text-[#7c5e2c] transition"
            />
          </div>
          <Boton disabled={botonHabilitado} type="submit" name="Ingresar" variant="secondary" />
          <ToastCustomizado
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage}
            variant={toastVariant}
          />
        </form>
        <p className="text-center mt-4 text-[#7c5e2c]">
          ¿Es tu primera vez?
          <Link className="ml-1 underline hover:text-[#bfa76a] transition" to="/registroUsuario">
            Registrate
          </Link>
        </p>
        <div className="flex items-center my-6 w-full max-w-lg mx-auto">
          <div className="flex-grow border-t border-[#e9dbc4]" />
          <span className="mx-4 text-[#bfa76a] font-semibold">O</span>
          <div className="flex-grow border-t border-[#e9dbc4]" />
        </div>
        <div className="flex flex-col items-center gap-2 w-full max-w-lg mx-auto">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              alert('Error al iniciar sesión con Google');
            }}
            width="100%"
            theme="filled_black"
            text="signin_with"
            shape="pill"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

