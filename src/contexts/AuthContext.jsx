import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock login function
  function login(email, password) {
    // For demo purposes, always "log in" successfully
    const demoUser = {
      uid: 'demo123',
      email: email,
      displayName: 'Demo User'
    };
    setCurrentUser(demoUser);
    return Promise.resolve();
  }

  // Mock logout function
  function logout() {
    setCurrentUser(null);
    return Promise.resolve();
  }

  useEffect(() => {
    // Simulate checking for a user
    const demoUser = {
      uid: 'demo123',
      email: 'demo@example.com',
      displayName: 'Demo User'
    };
    setCurrentUser(demoUser);
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
