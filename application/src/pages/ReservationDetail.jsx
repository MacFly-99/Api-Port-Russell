import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reservation = {
    id: parseInt(id),
    catwayNumber: 'A12',
    clientName: 'Jean Dupont',
    clientEmail: 'jean.dupont@example.com',
    clientPhone: '06 12 34 56 78',
    startDate: '2026-01-20',
    endDate: '2026-01-25',
    status: 'active',
    createdAt: '2026-01-15',
    notes: 'Client VIP - Préféré catway près de la capitainerie',
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="mb-0">Détail de la Réservation #{id}</h2>
          <div>
            <Button
              as={Link}
              to={`/reservations/${id}/edit`}
              variant="warning"
              className="me-3"
            >
              Modifier
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/reservations')}>
              Retour à la liste
            </Button>
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Informations principales</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Catway :</strong> {reservation.catwayNumber}</p>
                    <p><strong>Client :</strong> {reservation.clientName}</p>
                    <p><strong>Email :</strong> {reservation.clientEmail}</p>
                    <p><strong>Téléphone :</strong> {reservation.clientPhone}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Début :</strong> {reservation.startDate}</p>
                    <p><strong>Fin :</strong> {reservation.endDate}</p>
                    <p>
                      <strong>Statut :</strong>{' '}
                      <span className={`badge bg-${reservation.status === 'active' ? 'success' : 'secondary'}`}>
                        {reservation.status === 'active' ? 'En cours' : reservation.status}
                      </span>
                    </p>
                    <p><strong>Créée le :</strong> {reservation.createdAt}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {reservation.notes && (
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">Notes</h5>
                </Card.Header>
                <Card.Body>
                  <p>{reservation.notes}</p>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Actions rapides</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item action as={Link} to={`/reservations/${id}/edit`}>
                  Modifier la réservation
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">
                  Annuler la réservation
                </ListGroup.Item>
                <ListGroup.Item action>
                  Envoyer un email au client
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ReservationDetail;