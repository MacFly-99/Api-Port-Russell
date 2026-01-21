import { Navbar as BSNavbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const user = { name: 'Vasilys', role: 'admin' };

  const handleLogout = () => {
    alert('Déconnexion effectuée');
    navigate('/');
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm" fixed="top">
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4">
          Port Russell
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="navbar-nav" />

        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" className="fw-medium">
              Tableau de bord
            </Nav.Link>

            <Nav.Link as={Link} to="/catways" className="fw-medium">
              Catways
            </Nav.Link>

            <Nav.Link as={Link} to="/reservations" className="fw-medium">
              Réservations
            </Nav.Link>

            {user.role === 'admin' && (
              <Nav.Link as={Link} to="/users" className="fw-medium">
                Utilisateurs
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            <NavDropdown
              title={
                <>
                  <span className="me-2">{user.name}</span>
                  <small className="text-muted">({user.role})</small>
                </>
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;