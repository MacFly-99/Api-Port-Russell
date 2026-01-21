import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = {
    id: parseInt(id),
    name: 'Vasilys Karpov',
    email: 'vasilys@example.com',
    role: 'admin',
    phone: '06 98 76 54 32',
    createdAt: '2025-11-01',
    lastLogin: '2026-01-21',
    reservationsCount: 12,
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="mb-0">Détail Utilisateur #{id}</h2>
          <div>
            <Button
              as={Link}
              to={`/users/${id}/edit`}
              variant="warning"
              className="me-3"
            >
              Modifier
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/users')}>
              Retour à la liste
            </Button>
          </div>
        </div>

        <Row>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Informations utilisateur</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Nom :</strong> {user.name}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Téléphone :</strong> {user.phone}</p>
                    <p>
                      <strong>Rôle :</strong>{' '}
                      <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'}`}>
                        {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </span>
                    </p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Inscrit le :</strong> {user.createdAt}</p>
                    <p><strong>Dernière connexion :</strong> {user.lastLogin}</p>
                    <p><strong>Réservations effectuées :</strong> {user.reservationsCount}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Actions</h5>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item action as={Link} to={`/users/${id}/edit`}>
                  Modifier le profil
                </ListGroup.Item>
                <ListGroup.Item action variant="danger">
                  Supprimer l'utilisateur
                </ListGroup.Item>
                <ListGroup.Item action>
                  Voir ses réservations
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default UserDetail;