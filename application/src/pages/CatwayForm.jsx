import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import catwaysData from '../datas/catways.json';

function CatwayForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trouver le catway à éditer (via catwayNumber)
  const catwayToEdit = id ? catwaysData.find(c => c.catwayNumber === Number(id)) : null;

  const [formData, setFormData] = useState({
    catwayNumber: catwayToEdit ? catwayToEdit.catwayNumber : '',
    catwayType: catwayToEdit ? catwayToEdit.catwayType : 'short',
    catwayState: catwayToEdit ? catwayToEdit.catwayState : 'bon état',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.catwayNumber.trim() || !formData.catwayState.trim()) {
      setError('Le numéro et l’état sont obligatoires');
      return;
    }

    console.log(id ? 'Mise à jour catway' : 'Création catway :', formData);
    alert(id ? 'Catway modifié avec succès !' : 'Catway créé avec succès !');
    navigate('/catways');
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-5 fw-bold text-primary">
              {id ? `Modifier Catway ${id}` : 'Nouveau Catway'}
            </h2>

            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Numéro du catway</Form.Label>
                <Form.Control
                  name="catwayNumber"
                  value={formData.catwayNumber}
                  onChange={handleChange}
                  placeholder="ex: 15"
                  required
                  disabled={!!id}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Type de catway</Form.Label>
                <Form.Select name="catwayType" value={formData.catwayType} onChange={handleChange}>
                  <option value="short">Court</option>
                  <option value="long">Long</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-semibold">État actuel</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="catwayState"
                  value={formData.catwayState}
                  onChange={handleChange}
                  placeholder="Décrivez l’état (ex: bon état, en réparation...)"
                  required
                />
              </Form.Group>

              <div className="d-grid gap-3 d-md-flex justify-content-md-end">
                <Button variant="secondary" size="lg" onClick={() => navigate('/catways')}>
                  Annuler
                </Button>
                <Button variant="primary" type="submit" size="lg">
                  {id ? 'Enregistrer les modifications' : 'Créer le catway'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default CatwayForm;