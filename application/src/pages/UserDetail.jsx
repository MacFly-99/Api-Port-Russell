import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
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

function UserDetail() {
  const { id } = useParams();
  const user = uniqueUsers.find(u => u.id === Number(id));

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">Utilisateur #{id} non trouvé</h2>
        <Button as={Link} to="/users" variant="primary" className="mt-3">
          Retour à la liste
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="mb-0">{user.name}</h1>
          <Button as={Link} to="/users" variant="outline-secondary">
            Retour à la liste
          </Button>
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
                    <p className="mb-2"><strong>Nom :</strong> {user.name}</p>
                    <p className="mb-2"><strong>Email (généré) :</strong> {user.email}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>Rôle :</strong>{' '}
                      <Badge bg="primary" className="fs-6 px-3 py-2">
                        {user.role}
                      </Badge>
                    </p>
                    <p className="mb-2">
                      <strong>Présent dans les réservations :</strong>{' '}
                      <Badge bg="success" className="fs-6 px-3 py-2">
                        Oui
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
                <h5 className="mb-0">Actions</h5>
              </Card.Header>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button variant="outline-primary" className="w-100 text-start">
                    Modifier le profil
                  </Button>
                </li>
                <li className="list-group-item">
                  <Button variant="outline-danger" className="w-100 text-start">
                    Supprimer cet utilisateur
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

export default UserDetail;