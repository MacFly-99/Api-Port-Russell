import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import des données fournies
import catwaysData from '../datas/catways.json';

function CatwaysList() {
  const [catways] = useState(catwaysData);

  const getStatusBadge = (state) => {
    let variant = 'secondary';
    let label = state;

    if (state.includes('bon état')) variant = 'success';
    if (state.includes('En cours de réparation') || state.includes('tâche') || state.includes('trou')) variant = 'warning';
    if (state.includes('désolidarisé') || state.includes('désolidarisée')) variant = 'danger';

    return <Badge bg={variant}>{label}</Badge>;
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="mb-0">Gestion des Catways ({catways.length})</h2>
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
                  <th>Type</th>
                  <th>État</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {catways.map((catway, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{catway.catwayNumber}</td>
                    <td>{catway.catwayType}</td>
                    <td>{getStatusBadge(catway.catwayState)}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/catways/${catway.catwayNumber}`}
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Détails
                      </Button>
                      <Button
                        as={Link}
                        to={`/catways/${catway.catwayNumber}/edit`}
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

export default CatwaysList;