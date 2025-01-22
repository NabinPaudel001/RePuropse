"use client";
import { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status

  // Effect to reconnect socket when login happens
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const newSocket = io('http://localhost:5000', {
          query: { token },
        });

        newSocket.on('connect', () => {
          setIsConnected(true);
          console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
          setIsConnected(false);
          console.log('Socket disconnected');
        });

        setSocket(newSocket);

        // Cleanup socket on component unmount or when login changes
        return () => {
          newSocket.disconnect();
        };
      }
    }
  }, [isLoggedIn]); // Trigger when isLoggedIn changes

  return (
    <SocketContext.Provider value={{ socket, isConnected, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SocketContext.Provider>
  );
};
