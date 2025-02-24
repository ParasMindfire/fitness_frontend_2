import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { UserInterface } from '../interfaces/UserInterface';

const UserContext = createContext<UserInterface | undefined>(undefined);

// UserProvider component that wraps children components and provides the user context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context values
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
