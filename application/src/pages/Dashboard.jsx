import { Container, Row, Col, Navbar, Nav, Card, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = { name: 'Vasilys', email: 'vasilys@example.com' };

  const handleLogout = () => {
    alert('Déconnexion...');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4">
            Port Russell
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/catways">Catways</Nav.Link>
              <Nav.Link as={Link} to="/reservations">Réservations</Nav.Link>
              <Nav.Link as={Link} to="/users">Utilisateurs</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" onClick={handleLogout}>
                Déconnexion
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
          <Row className="mb-5">
            <Col>
              <h1 className="display-5 fw-bold">Tableau de bord</h1>
              <p className="lead text-muted">
                Bienvenue, {user.name} • {new Date().toLocaleDateString('fr-FR')}
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Informations utilisateur</Card.Title>
                  <hr />
                  <p><strong>Nom :</strong> {user.name}</p>
                  <p><strong>Email :</strong> {user.email}</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Réservations en cours</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive hover className="mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Catway</th>
                        <th>Début</th>
                        <th>Fin</th>
                        <th>Client</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          Aucune réservation en cours pour le moment
                        </td>
                      </tr>
                      {/* Plus tard : map sur les vraies données */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Dashboard;