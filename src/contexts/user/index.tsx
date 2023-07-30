import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../../utils/useAuth';

interface UserContextType {
  user: { username: string } | null;
  login: (username: string | undefined) => void;
  logout: () => void;
}

interface User {
  username: string;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { authToken, login, logout } = useAuth();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (authToken) {
      const dummyUser: User = { username: 'user' };
      setUser(dummyUser);
    }
  }, [authToken]);

  const handleLogin = (username: string | undefined) => {
    const dummyAuthToken = 'dummy-auth-token';
    login(dummyAuthToken);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
