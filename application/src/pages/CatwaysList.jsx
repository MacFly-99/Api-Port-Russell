import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CatwaysList() {
  // Simulation de données (à remplacer par fetch('/api/catways') plus tard)
  const [catways, setCatways] = useState([
    { id: 1, number: 'A12', length: 12, width: 4, status: 'available', pricePerDay: 45 },
    { id: 2, number: 'B05', length: 15, width: 5, status: 'occupied', pricePerDay: 60 },
    { id: 3, number: 'C08', length: 10, width: 3.5, status: 'maintenance', pricePerDay: 35 },
  ]);

  // À activer quand l'API sera prête
  // useEffect(() => {
  //   fetch('/api/catways')
  //     .then(res => res.json())
  //     .then(data => setCatways(data))
  //     .catch(err => console.error(err));
  // }, []);

  const getStatusBadge = (status) => {
    const variants = {
      available: 'success',
      occupied: 'danger',
      maintenance: 'warning',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="mb-0">Gestion des Catways</h2>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/catways/new" variant="success" size="lg">
              + Nouveau Catway
            </Button>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <Table responsive hover striped className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Numéro</th>
                  <th>Longueur (m)</th>
                  <th>Largeur (m)</th>
                  <th>Statut</th>
                  <th>Prix/jour (€)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {catways.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      Aucun catway trouvé
                    </td>
                  </tr>
                ) : (
                  catways.map((catway) => (
                    <tr key={catway.id}>
                      <td>{catway.id}</td>
                      <td className="fw-bold">{catway.number}</td>
                      <td>{catway.length}</td>
                      <td>{catway.width}</td>
                      <td>{getStatusBadge(catway.status)}</td>
                      <td>{catway.pricePerDay}</td>
                      <td>
                        <Button
                          as={Link}
                          to={`/catways/${catway.id}`}
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          Détails
                        </Button>
                        <Button
                          as={Link}
                          to={`/catways/${catway.id}/edit`}
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
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default CatwaysList;