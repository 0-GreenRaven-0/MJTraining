// context/AuthContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Initialize from sessionStorage on first load
    const savedData = sessionStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : { email: '', name: '', phone: '' };
  });

  const [tokens, setTokens] = useState(() => {
    const savedTokens = sessionStorage.getItem('userTokens');
    return savedTokens ? JSON.parse(savedTokens) : {
      subscribed: null,
      takeSurvey: null,
      surveyComplete: null,
      qualified: null,
      unqualified: null,
      booked: null,
    };
  });

  // Function to generate a random token
  const generateToken = useCallback(() => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }, []);

  // Update user data
  const updateUserData = useCallback((name, email, phone = '') => {
    const newData = { name, email, phone };
    setUserData(newData);
    sessionStorage.setItem('userData', JSON.stringify(newData));
  }, []);

  // Set a specific token
  const setToken = useCallback((tokenName, tokenValue = null) => {
    const value = tokenValue || generateToken();
    setTokens(prev => {
      const newTokens = { ...prev, [tokenName]: value };
      sessionStorage.setItem('userTokens', JSON.stringify(newTokens));
      return newTokens;
    });
    return value;
  }, [generateToken]);

  // Check if a specific token exists and matches
  const validateToken = useCallback((tokenName, tokenToCheck) => {
    return tokens[tokenName] === tokenToCheck;
  }, [tokens]);

  // Check if user has completed a specific step
  const hasToken = useCallback((tokenName) => {
    return !!tokens[tokenName];
  }, [tokens]);

  // Clear all data (logout/reset)
  const clearData = useCallback(() => {
    setUserData({ email: '', name: '', phone: '' });
    setTokens({
      subscribed: null,
      takeSurvey: null,
      surveyComplete: null,
      qualified: null,
      unqualified: null,
      booked: null,
    });
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('userTokens');
  }, []);

  const value = {
    userData,
    tokens,
    updateUserData,
    setToken,
    validateToken,
    hasToken,
    clearData,
    generateToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};