import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import reservationsData from '../datas/reservations.json';

const uniqueUsers = reservationsData.reduce((acc, res) => {
  if (!acc.some(u => u.name === res.clientName)) {
    acc.push({
      id: acc.length + 1,
      name: res.clientName,
      email: `${res.clientName.toLowerCase().replace(/\s+/g, '.')}@exemple.com`,
      role: 'client'
    });
  }
  return acc;
}, []);

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userToEdit = id ? uniqueUsers.find(u => u.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    name: userToEdit ? userToEdit.name : '',
    email: userToEdit ? userToEdit.email : '',
    role: userToEdit ? userToEdit.role : 'client',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Nom et email sont obligatoires');
      return;
    }

    console.log(id ? 'Mise à jour utilisateur' : 'Création utilisateur :', formData);
    alert(id ? 'Utilisateur modifié !' : 'Utilisateur créé !');
    navigate('/users');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
              {id ? `Modifier ${formData.name}` : 'Nouvel Utilisateur'}
            </h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Nom complet</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ex: Jack Sparrow"
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
                  placeholder="ex: jack.sparrow@exemple.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-semibold">Rôle</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  <option value="client">Client</option>
                  <option value="gestionnaire">Gestionnaire</option>
                  <option value="admin">Administrateur</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                <Button variant="secondary" size="lg" onClick={() => navigate('/users')}>
                  Annuler
                </Button>
                <Button variant="primary" type="submit" size="lg">
                  {id ? 'Enregistrer les modifications' : 'Créer l’utilisateur'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default UserForm;