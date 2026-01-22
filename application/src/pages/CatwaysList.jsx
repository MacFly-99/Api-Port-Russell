import catwaysData from '../datas/catways.json';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CatwaysList() {
  const catways = catwaysData;

  const getStatusVariant = (state) => {
    const lower = state.toLowerCase();
    if (lower.includes('bon état')) return 'success';
    if (lower.includes('réparation') || lower.includes('tâche') || lower.includes('trou')) return 'warning';
    if (lower.includes('désolidari')) return 'danger';
    return 'secondary';
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col>
            <h1 className="display-5 fw-bold text-primary">Gestion des Catways</h1>
            <p className="lead text-muted">{catways.length} catways enregistrés</p>
          </Col>
          <Col xs="auto">
            <Button as={Link} to="/catways/new" variant="success" size="lg">
              + Nouveau Catway
            </Button>
          </Col>
        </Row>

        <Card className="shadow border-0 rounded-4 overflow-hidden">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
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
                    <td className="fw-medium">{index + 1}</td>
                    <td className="fw-bold">{catway.catwayNumber}</td>
                    <td>{catway.catwayType}</td>
                    <td>
                      <Badge bg={getStatusVariant(catway.catwayState)} className="fs-6 px-3 py-2">
                        {catway.catwayState}
                      </Badge>
                    </td>
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