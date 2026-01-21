import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function CatwayForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Valeurs par défaut (à remplacer par fetch si édition)
  const [formData, setFormData] = useState({
    number: '',
    length: '',
    width: '',
    status: 'available',
    pricePerDay: '',
  });

  const [error, setError] = useState('');

  // À activer pour édition
  // useEffect(() => {
  //   if (id) {
  //     fetch(`/api/catways/${id}`)
  //       .then(res => res.json())
  //       .then(data => setFormData(data));
  //   }
  // }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.number || !formData.length || !formData.width || !formData.pricePerDay) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    // Simulation API
    console.log('Envoi :', formData);
    alert(id ? 'Catway modifié !' : 'Catway créé !');
    navigate('/catways');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <h2 className="text-center mb-5 fw-bold">
                  {id ? 'Modifier le Catway' : 'Nouveau Catway'}
                </h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Numéro du catway</Form.Label>
                        <Form.Control
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          placeholder="ex: A12"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Prix par jour (€)</Form.Label>
                        <Form.Control
                          type="number"
                          name="pricePerDay"
                          value={formData.pricePerDay}
                          onChange={handleChange}
                          placeholder="45.00"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Longueur (m)</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.1"
                          name="length"
                          value={formData.length}
                          onChange={handleChange}
                          placeholder="12.0"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Largeur (m)</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.1"
                          name="width"
                          value={formData.width}
                          onChange={handleChange}
                          placeholder="4.0"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-5">
                    <Form.Label className="fw-semibold">Statut</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange}>
                      <option value="available">Disponible</option>
                      <option value="occupied">Occupé</option>
                      <option value="maintenance">En maintenance</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                    <Button variant="secondary" size="lg" onClick={() => navigate('/catways')}>
                      Annuler
                    </Button>
                    <Button variant="primary" type="submit" size="lg">
                      {id ? 'Modifier' : 'Créer'} le catway
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

export default CatwayForm;