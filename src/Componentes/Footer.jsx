import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white p-2 text-center">
            <Container>
                <Row>
                    <Col>
                        <p>&copy; {new Date().getFullYear()} TatuTaller. Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};


export default Footer