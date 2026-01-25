import { createContext, useState, useEffect, useContext } from 'react';
import { decodeJWT } from '../utils/jwt';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedToken = localStorage.getItem('token');
  
  if (storedToken) {
    // Décodage rapide local
    const decoded = decodeJWT(storedToken);
    if (decoded) {
      setUser({
        name: decoded.name || decoded.email?.split('@')[0] || 'Utilisateur',
        email: decoded.email,
        role: decoded.role || 'user',
        userId: decoded.userId
      });
      setToken(storedToken);
    }

    // Rafraîchissement serveur avec /me
    fetch('http://localhost:8080/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error('Session expirée');
          }
          throw new Error('Erreur récupération user');
        }
        return res.json();
      })
      .then(data => {
        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
          userId: decoded?.userId // garde l'ID du token si besoin
        });
      })
      .catch(err => {
        console.error('Erreur rafraîchissement user:', err);
        logout(); // déconnexion automatique si problème
      });
  }
  setLoading(false);
}, []);

const login = async (email, password) => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Identifiants incorrects');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);

    // Rafraîchissement immédiat avec /me après login
    const meRes = await fetch('http://localhost:8080/api/auth/me', {
      headers: { 'Authorization': `Bearer ${data.token}` }
    });

    if (meRes.ok) {
      const userData = await meRes.json();
      setUser(userData);
    } else {
      // Fallback sur décodage local si /me échoue
      const decoded = decodeJWT(data.token);
      if (decoded) {
        setUser({
          name: decoded.name || decoded.email?.split('@')[0],
          email: decoded.email,
          role: decoded.role || 'user',
          userId: decoded.userId
        });
      }
    }

    return true;
  } catch (err) {
    throw err;
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);