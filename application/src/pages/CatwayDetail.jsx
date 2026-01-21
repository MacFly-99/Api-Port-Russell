import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

function CatwayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const catway = {
    id: parseInt(id),
    number: 'A12',
    length: 12,
    width: 4,
    status: 'available',
    pricePerDay: 45,
    location: 'Ponton principal, emplacement 12',
    description: 'Catway idéal pour voiliers jusqu’à 12m, eau et électricité disponibles.',
    createdAt: '2025-10-15',
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="mb-0">Détail Catway {catway.number}</h2>
          <div>
            <Button
              as={Link}
              to={`/catways/${id}/edit`}
              variant="warning"
              className="me-3"
            >
              Modifier
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/catways')}>
              Retour à la liste
            </Button>
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Caractéristiques</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Numéro :</strong> {catway.number}</p>
                    <p><strong>Longueur :</strong> {catway.length} m</p>
                    <p><strong>Largeur :</strong> {catway.width} m</p>
                    <p><strong>Prix/jour :</strong> {catway.pricePerDay} €</p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Statut :</strong>{' '}
                      <span className={`badge bg-${catway.status === 'available' ? 'success' : 'danger'}`}>
                        {catway.status === 'available' ? 'Disponible' : 'Occupé'}
                      </span>
                    </p>
                    <p><strong>Emplacement :</strong> {catway.location}</p>
                    <p><strong>Créé le :</strong> {catway.createdAt}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {catway.description && (
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">Description</h5>
                </Card.Header>
                <Card.Body>
                  <p>{catway.description}</p>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Actions</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item action as={Link} to={`/catways/${id}/edit`}>
                  Modifier le catway
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">
                  Supprimer le catway
                </ListGroup.Item>
                <ListGroup.Item action>
                  Voir les réservations associées
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CatwayDetail;