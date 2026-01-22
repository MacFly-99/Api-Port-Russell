import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import reservationsData from '../datas/reservations.json';

const uniqueUsers = reservationsData.reduce((acc, res) => {
  if (!acc.some(u => u.name === res.clientName)) {
    acc.push({
      id: acc.length + 1,
      name: res.clientName,
      email: `${res.clientName.toLowerCase().replace(/\s+/g, '.')}@exemple.com`,
      role: 'client',
      hasReservation: true
    });
  }
  return acc;
}, []);

function UsersList() {
  const [users] = useState(uniqueUsers);

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col>
            <h1 className="display-5 fw-bold text-primary">Gestion des Utilisateurs</h1>
            <p className="lead text-muted">
              {users.length} clients uniques trouvés dans les réservations
            </p>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/users/new" variant="success" size="lg">
              + Nouvel utilisateur
            </Button>
          </Col>
        </Row>

        <Card className="shadow border-0 rounded-4 overflow-hidden">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email (généré)</th>
                  <th>Rôle</th>
                  <th>Réservations</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="fw-bold">{user.name}</td>
                    <td>{user.email}</td>
                    <td><Badge bg="primary">{user.role}</Badge></td>
                    <td><Badge bg="success">Oui</Badge></td>
                    <td>
                      <Button as={Link} to={`/users/${user.id}`} variant="outline-primary" size="sm">
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default UsersList;