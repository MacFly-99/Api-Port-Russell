import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../protection/Authentication';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Pendant le chargement initial (vérification token)
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur → redirection vers login
  // On garde l'URL actuelle pour revenir après connexion
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Utilisateur connecté → on affiche la page protégée
  return children;
}

export default ProtectedRoute;