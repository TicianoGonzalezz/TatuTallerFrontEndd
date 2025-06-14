import { useRef, useState, useEffect } from 'react';
import Boton from './Boton';
import ToastCustomizado from './ToastCustomizado';
import { Container, Row, Form, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

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
        console.log("Datos recibidos:", data);
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

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="loginUsuario">
        <h1 className='text-center mb-4'>Iniciar Sesión</h1>
        <Form onSubmit={handleLogin}>
          <Row>
            <Col>
              <FormGroup controlId="emailLogin">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Email"
                  onChange={verificarContenido}
                  ref={emailRef}
                  className="mb-2"
                />
              </FormGroup>
              <FormGroup controlId="passwordLogin">
                <FormLabel>Contraseña</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Contraseña"
                  onChange={verificarContenido}
                  ref={passwordRef}
                  className="mb-2"
                />
              </FormGroup>
            </Col>
          </Row>
          <Boton disabled={botonHabilitado} type="submit" name="Ingresar" variant="secondary" />
          <p className='text-center mt-3'>¿Es tu primera vez?<Link className="link-inicio-sesion" to="/registroUsuario"> Registrate</Link></p>
          <ToastCustomizado
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage}
            variant={toastVariant}
          />
        </Form>
      </div>
    </Container>
  );
};

export default Login;

