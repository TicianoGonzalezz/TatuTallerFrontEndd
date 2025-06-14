import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Boton from './Boton';

const NoEncontrado = () => {

  const navigate = useNavigate();

  const handleRedirect = () => {
    if(localStorage.getItem('apikey') == null){
      navigate('/');
    }else{
      navigate('/Inicio')
    }
  };


    return (
      <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="ruta-no-encontrada">
            <h2 className="display-3">Ups. 😒</h2>
            <p className="lead">La página que estás buscando no existe.</p>
            <Button variant="secondary" onClick={handleRedirect} className="mt-3">
              Volver a la página principal
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    )
  }
  
  export default NoEncontrado