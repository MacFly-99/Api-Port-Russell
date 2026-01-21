import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages publiques
import Home from './pages/Home';
import Login from './pages/Login';

// Pages protégées
import Dashboard from './pages/Dashboard';
import CatwaysList from './pages/CatwaysList';
import CatwayDetail from './pages/CatwayDetail';
import CatwayForm from './pages/CatwayForm';
import ReservationsList from './pages/ReservationsList';
import ReservationDetail from './pages/ReservationDetail';
import ReservationForm from './pages/ReservationForm';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';

// 404
import NotFound from './pages/NotFound';

// Layout + protection
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protégées avec Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/catways"
          element={
            <ProtectedRoute>
              <Layout>
                <CatwaysList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/catways/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <CatwayDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/catways/new"
          element={
            <ProtectedRoute>
              <Layout>
                <CatwayForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/catways/:id/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <CatwayForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Layout>
                <ReservationsList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ReservationDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations/new"
          element={
            <ProtectedRoute>
              <Layout>
                <ReservationForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UsersList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <UserDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <Layout>
                <UserForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;