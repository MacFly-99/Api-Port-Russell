import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../protection/Authentication';

function CustomNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-3 shadow">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard">
          Port Russell
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Tableau de bord
            </Nav.Link>

            <Nav.Link as={Link} to="/catways">
              Catways
            </Nav.Link>

            <Nav.Link as={Link} to="/reservations">
              Réservations
            </Nav.Link>

            {/* Liens visibles uniquement pour admin */}
            {user?.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/users">
                  Gestion Utilisateurs
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Section droite : infos user + déconnexion */}
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <span className="text-light me-3">
                  {user.name || 'Utilisateur'} •{' '}
                  <strong className={user.role === 'admin' ? 'text-warning' : 'text-info'}>
                    {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                  </strong>
                </span>

                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button variant="outline-light" size="sm" as={Link} to="/login">
                Connexion
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;