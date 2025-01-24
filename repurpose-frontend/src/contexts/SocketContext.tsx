"use client";

import { createContext, useState, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  sendMessage?: (roomId: string, message: string) => void;
  joinRoom?: (roomId: string) => void;
  messages?: { roomId: string; messages: string[] }[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// SocketProvider component to manage socket connections and provide context values
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const [messages, setMessages] = useState<{ roomId: string; messages: string[] }[]>([]);

  // Effect to manage socket connection
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const newSocket = io("http://localhost:5000", {
          query: { token },
        });

        newSocket.on("connect", () => {
          setIsConnected(true);
          console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
          setIsConnected(false);
          console.log("Socket disconnected");
        });

        // Listener for receiving chat messages
        newSocket.on("message", ({ roomId, message }: { roomId: string; message: string }) => {
          console.log("New message received:", message);
          setMessages((prev) => {
            const room = prev.find((r) => r.roomId === roomId);
            if (room) {
              return prev.map((r) =>
                r.roomId === roomId ? { ...r, messages: [...r.messages, message] } : r
              );
            }
            return [...prev, { roomId, messages: [message] }];
          });
        });

        // Listener for chat updates (optional)
        newSocket.on("chat-update", (update) => {
          console.log("Chat update:", update);
        });

        setSocket(newSocket);

        // Cleanup socket on unmount or logout
        return () => {
          newSocket.disconnect();
        };
      }
    }
  }, [isLoggedIn]);

  // Function to send a message
  const sendMessage = (roomId: string, message: string) => {
    if (socket) {
      socket.emit("send-message", { roomId, message });
    }
  };

  // Function to join a room
  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join-room", roomId);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        isLoggedIn,
        setIsLoggedIn,
        sendMessage,
        joinRoom,
        messages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
