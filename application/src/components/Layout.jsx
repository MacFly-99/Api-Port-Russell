import { Container } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <CustomNavbar />
      <div style={{ paddingTop: '80px' }}> {/* Espace pour navbar fixe */}
        <Container fluid className="py-4">
          {children}
        </Container>
      </div>
    </>
  );
}

export default Layout;