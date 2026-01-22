import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import catwaysData from '../datas/catways.json';

function CatwayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Recherche par catwayNumber
  const catway = catwaysData.find(c => c.catwayNumber === Number(id));

  if (!catway) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">Catway #{id} non trouvé</h2>
        <Button as={Link} to="/catways" variant="primary" className="mt-3">
          Retour à la liste des catways
        </Button>
      </Container>
    );
  }

  const getStatusVariant = (state) => {
    const lower = state.toLowerCase();
    if (lower.includes('bon état')) return 'success';
    if (lower.includes('réparation') || lower.includes('tâche') || lower.includes('trou')) return 'warning';
    if (lower.includes('désolidari')) return 'danger';
    return 'secondary';
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="mb-0">Détail Catway {catway.catwayNumber}</h1>
          <div>
            <Button
              as={Link}
              to={`/catways/${catway.catwayNumber}/edit`}
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
                <h5 className="mb-0">Informations du catway</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p className="mb-2"><strong>Numéro :</strong> {catway.catwayNumber}</p>
                    <p className="mb-2"><strong>Type :</strong> {catway.catwayType}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>État actuel :</strong>{' '}
                      <Badge bg={getStatusVariant(catway.catwayState)} className="fs-6 px-3 py-2">
                        {catway.catwayState}
                      </Badge>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Actions rapides</h5>
              </Card.Header>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button variant="outline-primary" className="w-100 text-start">
                    Voir les réservations sur ce catway
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button variant="outline-warning" className="w-100 text-start">
                    Modifier les informations
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button variant="outline-danger" className="w-100 text-start">
                    Supprimer ce catway
                  </Button>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CatwayDetail;