// src/components/ApiDocLink.jsx
import { Button } from 'react-bootstrap';

function ApiDocLink() {
  // URL de la doc API
  // → en dev : localhost:8080/api-docs
  // → en prod : remplace par ton URL déployée (ex: https://ton-api-port-russell.onrender.com/api-docs)
  const apiDocUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api-docs'
      : 'https://api-port-russell.onrender.com/api-docs';

  return (
    <Button
      variant="outline-info"
      size="sm"
      href={apiDocUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="ms-2 ms-lg-3"
    >
    Documentation API
    </Button>
  );
}

export default ApiDocLink;