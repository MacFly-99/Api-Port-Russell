import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Vasilys', email: 'vasilys@example.com', role: 'admin', createdAt: '2025-12-01' },
    { id: 2, name: 'Jean Dupont', email: 'jean@example.com', role: 'user', createdAt: '2026-01-10' },
    { id: 3, name: 'Marie Curie', email: 'marie@example.com', role: 'user', createdAt: '2026-01-15' },
  ]);

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="mb-0">Gestion des Utilisateurs</h2>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/users/new" variant="success" size="lg">
              + Nouvel Utilisateur
            </Button>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <Table responsive hover striped className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Inscrit le</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="fw-bold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>{user.createdAt}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/users/${user.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Détails
                      </Button>
                      <Button
                        as={Link}
                        to={`/users/${user.id}/edit`}
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                      >
                        Modifier
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        Supprimer
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