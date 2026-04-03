// App Context - Global State Management

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, Environment, Ticket } from '../types';
import { mockUsers, mockTickets } from '../data/mock-data';
import { TicketService } from '../services/ticket-service';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  canSwitchRoles: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  refreshTickets: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] = useState<Environment>('Demo');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Default to first citizen
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  // Initialize ticket service
  useEffect(() => {
    TicketService.initialize(mockTickets);
  }, []);

  // Check authentication from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  const refreshTickets = () => {
    setTickets(TicketService.getAllTickets());
  };

  // Can switch roles only in Demo mode
  const canSwitchRoles = environment === 'Demo';

  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        environment, 
        setEnvironment, 
        canSwitchRoles,
        isAuthenticated,
        login,
        logout,
        tickets,
        addTicket,
        refreshTickets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}