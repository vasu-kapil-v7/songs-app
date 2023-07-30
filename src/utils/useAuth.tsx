import React, {  useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const AUTH_COOKIE_NAME = 'authToken';
  
    useEffect(() => {
      const token = Cookies.get(AUTH_COOKIE_NAME);
      setAuthToken(token || null);
    }, []);
  
    const login = (token: string) => {
      Cookies.set(AUTH_COOKIE_NAME, token, { expires: 1 }); 
      setAuthToken(token);
    };
  
    const logout = () => {
      Cookies.remove(AUTH_COOKIE_NAME);
      setAuthToken(null);
    };
  
    return { authToken, login, logout };
  };