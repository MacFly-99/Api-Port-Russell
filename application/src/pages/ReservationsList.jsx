import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import des données fournies
import reservationsData from '../datas/reservations.json';

function ReservationsList() {
  const [reservations] = useState(reservationsData);

  // Filtre les réservations "en cours" (actuelles)
  const activeReservations = reservations.filter((res) => {
    const today = new Date();
    const start = new Date(res.startDate);
    const end = new Date(res.endDate);
    return start <= today && end >= today;
  });

  const getStatusBadge = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return { variant: 'warning', label: 'À venir' };
    if (today > end) return { variant: 'secondary', label: 'Terminée' };
    return { variant: 'success', label: 'En cours' };
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        {/* En-tête */}
        <Row className="mb-5 align-items-center">
          <Col>
            <h1 className="display-5 fw-bold text-primary">Gestion des Réservations</h1>
            <p className="lead text-muted">
              {reservations.length} réservations enregistrées • {activeReservations.length} en cours
            </p>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/reservations/new" variant="success" size="lg">
              + Nouvelle Réservation
            </Button>
          </Col>
        </Row>

        {/* Tableau des réservations en cours */}
        <Card className="shadow-sm border-0 rounded-4 mb-5">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">Réservations en cours ({activeReservations.length})</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Catway</th>
                  <th>Client</th>
                  <th>Nom du bateau</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeReservations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      Aucune réservation en cours actuellement
                    </td>
                  </tr>
                ) : (
                  activeReservations.map((res, index) => {
                    const status = getStatusBadge(res.startDate, res.endDate);
                    return (
                      <tr key={index}>
                        <td className="fw-medium">{index + 1}</td>
                        <td className="fw-bold">{res.catwayNumber}</td>
                        <td>{res.clientName}</td>
                        <td>{res.boatName}</td>
                        <td>{new Date(res.startDate).toLocaleDateString('fr-FR')}</td>
                        <td>{new Date(res.endDate).toLocaleDateString('fr-FR')}</td>
                        <td>
                          <Badge bg={status.variant} className="fs-6 px-3 py-2">
                            {status.label}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            as={Link}
                            to={`/reservations/${index + 1}`}
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            Détails
                          </Button>
                          <Button
                            as={Link}
                            to={`/reservations/${index + 1}/edit`}
                            variant="outline-warning"
                            size="sm"
                            className="me-2"
                          >
                            Modifier
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Annuler
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Lien vers toutes les réservations */}
        <div className="text-center">
          <Button variant="outline-primary" size="lg">
            Voir toutes les réservations ({reservations.length})
          </Button>
        </div>
      </Container>
    </Container>
  );
}

export default ReservationsList;