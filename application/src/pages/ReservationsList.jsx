import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import reservationsData from '../datas/reservations.json';

function ReservationsList() {
  const reservations = reservationsData;

  // Réservations en cours (date réelle)
  const today = new Date();
  const active = reservations.filter(r => {
    const start = new Date(r.startDate);
    const end = new Date(r.endDate);
    return start <= today && end >= today;
  });

  const getStatus = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    if (today < s) return { bg: 'warning', text: 'À venir' };
    if (today > e) return { bg: 'secondary', text: 'Terminée' };
    return { bg: 'success', text: 'En cours' };
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col>
            <h1 className="display-5 fw-bold text-primary">Gestion des Réservations</h1>
            <p className="lead text-muted">
              {reservations.length} réservations • {active.length} en cours
            </p>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/reservations/new" variant="success" size="lg">
              + Nouvelle réservation
            </Button>
          </Col>
        </Row>

        <Card className="shadow border-0 rounded-4 mb-5">
          <Card.Header className="bg-success text-white">
            <h5>Réservations en cours ({active.length})</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Catway</th>
                  <th>Client</th>
                  <th>Bateau</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {active.map((res, idx) => {
                  const status = getStatus(res.startDate, res.endDate);
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{res.catwayNumber}</td>
                      <td>{res.clientName}</td>
                      <td>{res.boatName}</td>
                      <td>{new Date(res.startDate).toLocaleDateString('fr-FR')}</td>
                      <td>{new Date(res.endDate).toLocaleDateString('fr-FR')}</td>
                      <td><Badge bg={status.bg}>{status.text}</Badge></td>
                      <td>
                        <Button as={Link} to={`/reservations/${idx + 1}`} variant="outline-primary" size="sm">
                          Détails
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {active.length === 0 && (
                  <tr><td colSpan="8" className="text-center py-4">Aucune réservation en cours</td></tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <div className="text-center">
          <Button variant="outline-primary" size="lg">
            Voir toutes les {reservations.length} réservations
          </Button>
        </div>
      </Container>
    </Container>
  );
}

export default ReservationsList;