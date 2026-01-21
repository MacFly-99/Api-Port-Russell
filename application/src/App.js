import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Pages CRUD Catways
import CatwaysList from './pages/CatwaysList';
import CatwayDetail from './pages/CatwayDetail';
import CatwayForm from './pages/CatwayForm';

// Pages CRUD Réservations
import ReservationsList from './pages/ReservationsList';
import ReservationDetail from './pages/ReservationDetail';
import ReservationForm from './pages/ReservationForm';

// Pages CRUD Utilisateurs
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';

// Page 404
import NotFound from './pages/NotFound';

// Composant pour routes protégées (à implémenter plus tard)
const ProtectedRoute = ({ children }) => {
  // Pour l'instant on laisse passer tout le monde
  // Plus tard : vérifier token/localStorage
  return children;
  // Exemple futur :
  // const isAuthenticated = !!localStorage.getItem('token');
  // return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* CRUD Catways */}
        <Route
          path="/catways"
          element={
            <ProtectedRoute>
              <CatwaysList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catways/:id"
          element={
            <ProtectedRoute>
              <CatwayDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catways/new"
          element={
            <ProtectedRoute>
              <CatwayForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catways/:id/edit"
          element={
            <ProtectedRoute>
              <CatwayForm />
            </ProtectedRoute>
          }
        />

        {/* CRUD Réservations */}
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <ReservationsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations/:id"
          element={
            <ProtectedRoute>
              <ReservationDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations/new"
          element={
            <ProtectedRoute>
              <ReservationForm />
            </ProtectedRoute>
          }
        />

        {/* CRUD Utilisateurs */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />

        {/* Page Not_Found (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;