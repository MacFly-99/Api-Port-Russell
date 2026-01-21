import { Container } from 'react-bootstrap';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px' }}> {/* Space for the fixed navbar */}
        <Container fluid className="py-4">
          {children}
        </Container>
      </div>
    </>
  );
}

export default Layout;