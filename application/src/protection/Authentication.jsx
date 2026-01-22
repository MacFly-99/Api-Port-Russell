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
      const decoded = decodeJWT(storedToken);
      if (decoded) {
        setUser({
          name: decoded.name || decoded.email?.split('@')[0] || 'Utilisateur',
          email: decoded.email || 'inconnu',
          role: decoded.role || 'user',
          userId: decoded.userId
        });
      } else {
        localStorage.removeItem('token');
      }
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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur de connexion');
      }

      const data = await res.json();

      localStorage.setItem('token', data.token);
      setToken(data.token);

      const decoded = decodeJWT(data.token);
      if (decoded) {
        setUser({
          name: decoded.name || decoded.email?.split('@')[0],
          email: decoded.email,
          role: decoded.role || 'user',
          userId: decoded.userId
        });
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