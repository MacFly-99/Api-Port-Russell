import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    alert('Connexion simulée ! Redirection vers dashboard...');
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Body className="p-5 p-md-5">
              <h1 className="text-center mb-4 fw-bold text-primary">Port Russell</h1>
              
              <p className="lead text-center text-muted mb-5">
                Gestion des catways, réservations et utilisateurs pour le port de plaisance.
              </p>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="exemple@port-russell.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label className="fw-semibold">Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" className="w-100 mb-4">
                  Se connecter
                </Button>
              </Form>

              <div className="text-center">
                <a
                  href="http://localhost:8080/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-decoration-none"
                >
                  Documentation de l'API →
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;