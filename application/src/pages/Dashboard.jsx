import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../protection/Authentication';
import reservationsData from '../datas/reservations.json';

function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Réservations en cours (données réelles)
  const today = new Date();
  const activeReservations = reservationsData.filter(res => {
    const start = new Date(res.startDate);
    const end = new Date(res.endDate);
    return start <= today && end >= today;
  });

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (loading) return <div className="text-center py-5">Chargement...</div>;

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-3 shadow">
        <Container fluid>
          <Navbar.Brand>Port Russell</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Tableau de bord</Nav.Link>
              <Nav.Link href="/catways">Catways</Nav.Link>
              <Nav.Link href="/reservations">Réservations</Nav.Link>
              <Nav.Link href="/users">Utilisateurs</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenu avec padding pour navbar fixe */}
      <div style={{ paddingTop: '80px' }}>
        <Container fluid className="py-5 bg-light min-vh-100">
          <Container>
            <h1 className="display-5 fw-bold mb-4">Tableau de bord</h1>
            <p className="lead mb-5">
              Bienvenue, <strong>{user?.name || 'Utilisateur'}</strong> • {new Date().toLocaleDateString('fr-FR')}
            </p>

            {/* Profil */}
            <Row className="mb-5">
              <Col md={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <h5>Votre profil</h5>
                    <hr />
                    <p><strong>Nom :</strong> {user?.name}</p>
                    <p><strong>Email :</strong> {user?.email}</p>
                    <p><strong>Rôle :</strong> {user?.role}</p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Réservations */}
              <Col md={8}>
                <Card className="shadow-sm">
                  <Card.Header className="bg-success text-white">
                    <h5>Réservations en cours ({activeReservations.length})</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {activeReservations.length === 0 ? (
                      <p className="text-center py-4 text-muted">Aucune réservation en cours</p>
                    ) : (
                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Catway</th>
                            <th>Client</th>
                            <th>Bateau</th>
                            <th>Début</th>
                            <th>Fin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeReservations.map((res, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{res.catwayNumber}</td>
                              <td>{res.clientName}</td>
                              <td>{res.boatName}</td>
                              <td>{new Date(res.startDate).toLocaleDateString('fr-FR')}</td>
                              <td>{new Date(res.endDate).toLocaleDateString('fr-FR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;