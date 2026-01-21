import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ReservationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    catwayNumber: '',
    clientName: '',
    clientEmail: '',
    startDate: '',
    endDate: '',
    status: 'pending',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.catwayNumber || !formData.clientName || !formData.startDate || !formData.endDate) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    console.log(id ? 'Modification réservation' : 'Création réservation :', formData);
    alert(id ? 'Réservation modifiée !' : 'Réservation créée !');
    navigate('/reservations');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-5 fw-bold">
                  {id ? 'Modifier la Réservation' : 'Nouvelle Réservation'}
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Numéro du catway</Form.Label>
                        <Form.Control
                          name="catwayNumber"
                          value={formData.catwayNumber}
                          onChange={handleChange}
                          placeholder="ex: A12"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Nom du client</Form.Label>
                        <Form.Control
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Email du client</Form.Label>
                    <Form.Control
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      placeholder="jean.dupont@example.com"
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Date de début</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Date de fin</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-5">
                    <Form.Label className="fw-semibold">Statut</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange}>
                      <option value="pending">En attente</option>
                      <option value="active">Active</option>
                      <option value="ended">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                    <Button variant="secondary" size="lg" onClick={() => navigate('/reservations')}>
                      Annuler
                    </Button>
                    <Button variant="primary" type="submit" size="lg">
                      {id ? 'Modifier' : 'Créer'} la réservation
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

export default ReservationForm;