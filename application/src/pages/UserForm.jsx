import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!id && !formData.password)) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    console.log(id ? 'Modification utilisateur' : 'Création utilisateur :', formData);
    alert(id ? 'Utilisateur modifié !' : 'Utilisateur créé !');
    navigate('/users');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-5 fw-bold">
                  {id ? 'Modifier l\'Utilisateur' : 'Nouvel Utilisateur'}
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Nom complet</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Vasilys Karpov"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vasilys@example.com"
                      required
                    />
                  </Form.Group>

                  {!id && (
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">Mot de passe</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-5">
                    <Form.Label className="fw-semibold">Rôle</Form.Label>
                    <Form.Select name="role" value={formData.role} onChange={handleChange}>
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                    <Button variant="secondary" size="lg" onClick={() => navigate('/users')}>
                      Annuler
                    </Button>
                    <Button variant="primary" type="submit" size="lg">
                      {id ? 'Modifier' : 'Créer'} l'utilisateur
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default UserForm;