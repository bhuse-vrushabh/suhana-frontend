import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthDataState] = useState({
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    role: Cookies.get('role') || null,
  });

  const setAuthData = (data) => {
    const { accessToken, refreshToken, role } = data;

    // Set tokens and role in cookies
    Cookies.set('accessToken', accessToken, { expires: 7 }); // Expires in 7 days
    Cookies.set('refreshToken', refreshToken, { expires: 7 });
    Cookies.set('role', role, { expires: 7 });

    // Update state
    setAuthDataState(data);
  };

  const clearAuthData = () => {
    // Clear cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('role');

    // Clear state
    setAuthDataState({ accessToken: null, refreshToken: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

