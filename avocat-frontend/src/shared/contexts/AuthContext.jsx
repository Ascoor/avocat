import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '@shared/services/api/axiosConfig';
import {
  clearStoredAuth,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
} from '../services/auth/authStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = Boolean(token);
  const role = user?.role ?? null;
  const getUser = useCallback(() => user, [user]);
  const getToken = useCallback(() => token, [token]);
  const hasRole = useCallback(
    (roles = []) => {
      const normalized = Array.isArray(roles) ? roles : [roles];
      if (normalized.length === 0) {
        return true;
      }
      return normalized.map(String).includes(String(user?.role));
    },
    [user],
  );

  const syncAuth = useCallback((nextUser, nextToken) => {
    setStoredAuth(nextUser, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const fetchMe = useCallback(async () => {
    const response = await api.get('/me');
    const payload = response.data?.data ?? response.data;
    const currentToken = getStoredToken();
    if (currentToken) {
      setStoredAuth(payload, currentToken);
    }
    setUser(payload);
    return payload;
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
        device_name: 'web',
        token: true,
      });
      const payload = response.data?.data ?? response.data;
      if (payload?.token && payload?.user) {
        syncAuth(payload.user, payload.token);
        return true;
      }
    } catch (error) {
      console.error('Error in login:', error);
    }
    return false;
  }, [syncAuth]);

  const register = useCallback(
    async (name, email, password, passwordConfirmation) => {
      try {
        const response = await api.post('/register', {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          device_name: 'web',
          token: true,
        });
        const payload = response.data?.data ?? response.data;
        if (payload?.token && payload?.user) {
          syncAuth(payload.user, payload.token);
          return true;
        }
      } catch (error) {
        console.error('Error in register:', error);
      }
      return false;
    },
    [syncAuth],
  );

  const logout = useCallback(async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      clearStoredAuth();
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setIsInitializing(false);
        return;
      }

      setToken(storedToken);

      try {
        await fetchMe();
      } catch (error) {
        clearStoredAuth();
        setToken(null);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [fetchMe]);

  const value = useMemo(
    () => ({
      token,
      user,
      role,
      isAuthenticated,
      isInitializing,
      getUser,
      getToken,
      hasRole,
      login,
      register,
      logout,
      fetchMe,
    }),
    [
      token,
      user,
      role,
      isAuthenticated,
      isInitializing,
      getUser,
      getToken,
      hasRole,
      login,
      register,
      logout,
      fetchMe,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
