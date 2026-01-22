import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../protection/Authentication';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4 fw-bold text-primary">Connexion</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="vasilys@port-russell.fr"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;