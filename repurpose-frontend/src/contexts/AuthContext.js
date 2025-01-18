// src/contexts/AuthContext.js
"use client"
import { createContext, useState, useEffect } from 'react';
import { getAccessToken, setAccessToken } from '../utils/tokens';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setToken] = useState(getAccessToken());

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
