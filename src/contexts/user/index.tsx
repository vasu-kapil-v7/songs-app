import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  user: { username: string } | null;
  login: (username: string) => void;
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
  const [user, setUser] = useState<{ username: string } | null>(null);

  const login = (username: string) => {
    const newUser: User = { username };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
