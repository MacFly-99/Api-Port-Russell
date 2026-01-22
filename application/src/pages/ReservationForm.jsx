import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import reservationsData from '../datas/reservations.json';

function ReservationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trouver la réservation à éditer
  const index = id ? Number(id) - 1 : -1;
  const resToEdit = index >= 0 ? reservationsData[index] : null;

  const [formData, setFormData] = useState({
    catwayNumber: resToEdit ? resToEdit.catwayNumber : '',
    clientName: resToEdit ? resToEdit.clientName : '',
    boatName: resToEdit ? resToEdit.boatName : '',
    startDate: resToEdit ? new Date(resToEdit.startDate).toISOString().split('T')[0] : '',
    endDate: resToEdit ? new Date(resToEdit.endDate).toISOString().split('T')[0] : '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.catwayNumber || !formData.clientName || !formData.startDate || !formData.endDate) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    console.log(id ? 'Mise à jour réservation' : 'Création réservation :', formData);
    alert(id ? 'Réservation modifiée !' : 'Réservation créée !');
    navigate('/reservations');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
              {id ? `Modifier Réservation #${id}` : 'Nouvelle Réservation'}
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
                      placeholder="ex: 7"
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
                      placeholder="ex: Jack Sparrow"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Nom du bateau</Form.Label>
                <Form.Control
                  name="boatName"
                  value={formData.boatName}
                  onChange={handleChange}
                  placeholder="ex: Black Pearl"
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
                  <Form.Group className="mb-5">
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

              <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                <Button variant="secondary" size="lg" onClick={() => navigate('/reservations')}>
                  Annuler
                </Button>
                <Button variant="primary" type="submit" size="lg">
                  {id ? 'Enregistrer les modifications' : 'Créer la réservation'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default ReservationForm;