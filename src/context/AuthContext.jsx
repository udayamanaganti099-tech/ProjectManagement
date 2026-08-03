import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return null; // Unauthenticated by default so user sees Login / Sign Up screen immediately!
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const login = async (username, password) => {
    const response = await apiService.login(username, password);

    // Auth error from backend (wrong password, user not found)
    if (response && response.authError) {
      return { success: false, error: response.message };
    }

    // Success — got a real JWT token
    if (response && response.token) {
      const userProfile = {
        id:          response.id,
        username:    response.username,
        email:       response.email,
        fullName:    response.fullName,
        role:        response.role,
        designation: response.designation,
        avatarUrl:   response.avatarUrl
      };
      setUser(userProfile);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
      return { success: true, token: response.token, user: userProfile };
    }

    return { success: false, error: 'Login failed. Please try again.' };
  };

  const register = async (userData) => {
    // Step 1: Call POST /api/v1/auth/register → saves user to MySQL
    const savedUser = await apiService.register(userData);

    // Registration error (username/email taken, validation failed)
    if (savedUser && savedUser.regError) {
      return { success: false, error: savedUser.message };
    }
    if (!savedUser) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }

    // Step 2: Auto-login after successful registration
    const loginRes = await apiService.login(userData.username, userData.password);
    if (loginRes && loginRes.token) {
      const userProfile = {
        id:          loginRes.id,
        username:    loginRes.username,
        email:       loginRes.email,
        fullName:    loginRes.fullName,
        role:        loginRes.role,
        designation: loginRes.designation,
        avatarUrl:   loginRes.avatarUrl
      };
      setUser(userProfile);
      setToken(loginRes.token);
      localStorage.setItem('token', loginRes.token);
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
      return { success: true, user: userProfile };
    }

    return { success: false, error: 'Account created! Please sign in.' };
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
