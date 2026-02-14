import React, { createContext, useState, useEffect } from 'react';
import { saveUser, getUser, removeUser } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const savedUser = await getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    // Mock login - in real app, call API
    const userData = { email, name: email.split('@')[0] };
    await saveUser(userData);
    setUser(userData);
    return { success: true };
  };

  const signup = async (name, email, password) => {
    // Mock signup - in real app, call API
    const userData = { email, name };
    await saveUser(userData);
    setUser(userData);
    return { success: true };
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
