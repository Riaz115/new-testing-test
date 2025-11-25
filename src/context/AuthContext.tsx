import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ME } from '../services/queries';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  flagged: boolean;
}

interface AuthContextType {
  employee: Employee | null;
  token: string | null;
  login: (token: string, employee: Employee) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [getMe] = useLazyQuery(GET_ME);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const { data } = await getMe();
          if (data?.me) {
            setEmployee(data.me);
            setToken(storedToken);
          } else {
            localStorage.removeItem('authToken');
            setToken(null);
          }
        } catch {
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [getMe]);

  const login = (newToken: string, newEmployee: Employee) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setEmployee(newEmployee);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setEmployee(null);
  };

  return (
    <AuthContext.Provider value={{ employee, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
