import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import reservationsData from '../datas/reservations.json';
import { useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();

  // 1. Réservations réelles
  const reservations = reservationsData;

  // 2. Calcul des réservations en cours (date réelle)
  const today = new Date();
  const activeReservations = reservations.filter(res => {
    const start = new Date(res.startDate);
    const end = new Date(res.endDate);
    return start <= today && end >= today;
  });

  const getStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) return { bg: 'warning', text: 'À venir' };
    if (today > end) return { bg: 'secondary', text: 'Terminée' };
    return { bg: 'success', text: 'En cours' };
  };

  const simulatedUser = {
    name: reservations[0]?.clientName || 'Utilisateur inconnu',
    email: reservations[0] 
      ? `${reservations[0].clientName.toLowerCase().replace(/\s+/g, '.')}@exemple.com`
      : 'inconnu@exemple.com'
  };

  const handleLogout = () => {
    alert('Déconnexion effectuée');
    navigate('/');
  };

  return (
    <>
      {/* Navbar fixe en haut */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-3 shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4">
            Port Russell
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">Tableau de bord</Nav.Link>
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

      {/* Contenu principal */}
      <div style={{ paddingTop: '80px' }}>
        <Container fluid className="py-5 bg-light min-vh-100">
          <Container>
            <Row className="mb-5">
              <Col>
                <h1 className="display-5 fw-bold">Tableau de bord</h1>
                <p className="lead text-muted">
                  Bienvenue, <strong>{simulatedUser.name}</strong> • {new Date().toLocaleDateString('fr-FR')}
                </p>
              </Col>
            </Row>

            {/* Infos utilisateur */}
            <Row className="mb-5">
              <Col md={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Informations utilisateur</Card.Title>
                    <hr />
                    <p><strong>Nom :</strong> {simulatedUser.name}</p>
                    <p><strong>Email :</strong> {simulatedUser.email}</p>
                    <p><strong>Rôle :</strong> Client</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={8}>
                <Card className="shadow-sm">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">Réservations en cours ({activeReservations.length})</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Catway</th>
                          <th>Client</th>
                          <th>Bateau</th>
                          <th>Début</th>
                          <th>Fin</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeReservations.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              Aucune réservation en cours actuellement
                            </td>
                          </tr>
                        ) : (
                          activeReservations.map((res, idx) => {
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
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Liens rapides */}
            <Row className="g-4">
              <Col md={4}>
                <Card className="shadow-sm text-center p-4">
                  <h5>Catways</h5>
                  <Button as={Link} to="/catways" variant="outline-primary">
                    Gérer les catways
                  </Button>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm text-center p-4">
                  <h5>Réservations</h5>
                  <Button as={Link} to="/reservations" variant="outline-primary">
                    Gérer les réservations
                  </Button>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm text-center p-4">
                  <h5>Documentation API</h5>
                  <Button
                    href="http://localhost:8080/api-docs"
                    target="_blank"
                    variant="outline-info"
                  >
                    Voir la doc
                  </Button>
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