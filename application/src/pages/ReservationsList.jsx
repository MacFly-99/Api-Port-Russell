import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ReservationsList() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      catwayNumber: 'A12',
      clientName: 'Jean Dupont',
      startDate: '2026-01-20',
      endDate: '2026-01-25',
      status: 'active',
    },
    {
      id: 2,
      catwayNumber: 'B05',
      clientName: 'Marie Curie',
      startDate: '2026-01-15',
      endDate: '2026-01-18',
      status: 'ended',
    },
    {
      id: 3,
      catwayNumber: 'C08',
      clientName: 'Pierre Martin',
      startDate: '2026-02-01',
      endDate: '2026-02-10',
      status: 'pending',
    },
  ]);

  const activeReservations = reservations.filter(r => r.status === 'active');

  const getStatusBadge = (status) => {
    const colors = {
      active: 'success',
      ended: 'secondary',
      pending: 'warning',
      cancelled: 'danger',
    };
    return <Badge bg={colors[status] || 'info'}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="mb-0">Gestion des Réservations</h2>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/reservations/new" variant="success" size="lg">
              + Nouvelle Réservation
            </Button>
          </Col>
        </Row>

        <Card className="shadow-sm mb-5">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Réservations en cours ({activeReservations.length})</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover striped className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Catway</th>
                  <th>Client</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeReservations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      Aucune réservation en cours
                    </td>
                  </tr>
                ) : (
                  activeReservations.map((res) => (
                    <tr key={res.id}>
                      <td>{res.id}</td>
                      <td className="fw-bold">{res.catwayNumber}</td>
                      <td>{res.clientName}</td>
                      <td>{res.startDate}</td>
                      <td>{res.endDate}</td>
                      <td>{getStatusBadge(res.status)}</td>
                      <td>
                        <Button
                          as={Link}
                          to={`/reservations/${res.id}`}
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          Détails
                        </Button>
                        <Button
                          as={Link}
                          to={`/reservations/${res.id}/edit`}
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
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* Bouton pour voir toutes les réservations */}
        <div className="text-center">
          <Button variant="outline-secondary" size="lg">
            Voir toutes les réservations
          </Button>
        </div>
      </Container>
    </Container>
  );
}

export default ReservationsList;