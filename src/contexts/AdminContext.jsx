/**
 * Admin Authentication Context
 *
 * Manages admin login state and JWT authentication
 * Uses server-side authentication for security
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if admin is already logged in and verify token
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/api/admin/verify`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          if (response.ok) {
            setToken(storedToken);
            setIsAdmin(true);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('adminToken');
          }
        } catch {
          // If server is unavailable, check token expiry locally
          try {
            const payload = JSON.parse(atob(storedToken.split('.')[1]));
            if (payload.exp * 1000 > Date.now()) {
              setToken(storedToken);
              setIsAdmin(true);
            } else {
              localStorage.removeItem('adminToken');
            }
          } catch {
            localStorage.removeItem('adminToken');
          }
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  const login = async (password) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsAdmin(true);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch {
      return { success: false, error: 'Server unavailable' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAdmin(false);
  };

  // Get auth headers for API requests
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, login, logout, token, getAuthHeaders }}>
      {children}
    </AdminContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdmin() {
  return useContext(AdminContext);
}
