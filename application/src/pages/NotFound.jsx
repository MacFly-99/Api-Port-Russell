import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <h1 className="display-1 fw-bold text-danger mb-4">404</h1>
            <h2 className="mb-4">Page non trouvée</h2>
            <p className="lead text-muted mb-5">
              La page que vous recherchez semble introuvable ou a été déplacée.
            </p>

            <Button as={Link} to="/" variant="primary" size="lg">
              Retour à l'accueil
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default NotFound;