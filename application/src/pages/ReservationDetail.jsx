import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import reservationsData from '../datas/reservations.json';

function ReservationDetail() {
  const { id } = useParams();
  const index = Number(id) - 1;
  const reservation = reservationsData[index];

  if (!reservation) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">Réservation #{id} non trouvée</h2>
        <Button as={Link} to="/reservations" variant="primary" className="mt-3">
          Retour à la liste des réservations
        </Button>
      </Container>
    );
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);
  const today = new Date();
  let status = { bg: 'secondary', text: 'Terminée' };

  if (today < start) status = { bg: 'warning', text: 'À venir' };
  else if (today <= end) status = { bg: 'success', text: 'En cours' };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="mb-0">Réservation #{index + 1}</h1>
          <div>
            <Button
              as={Link}
              to={`/reservations/${index + 1}/edit`}
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
                <h5 className="mb-0">Détails de la réservation</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p className="mb-2"><strong>Catway :</strong> {reservation.catwayNumber}</p>
                    <p className="mb-2"><strong>Client :</strong> {reservation.clientName}</p>
                    <p className="mb-2"><strong>Bateau :</strong> {reservation.boatName}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2"><strong>Début :</strong> {start.toLocaleDateString('fr-FR')}</p>
                    <p className="mb-2"><strong>Fin :</strong> {end.toLocaleDateString('fr-FR')}</p>
                    <p className="mb-2">
                      <strong>Statut actuel :</strong>{' '}
                      <Badge bg={status.bg} className="fs-6 px-3 py-2">
                        {status.text}
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
                    Modifier la réservation
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button variant="outline-danger" className="w-100 text-start">
                    Annuler la réservation
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

export default ReservationDetail;