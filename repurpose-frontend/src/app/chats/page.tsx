"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/contexts/SocketContext";  // Custom hook to access socket
import { apiRequest } from "@/middleware/errorInterceptor";

const ChatsIndexPage = () => {
  const [chats, setChats] = useState<any[]>([]);
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    // Fetch all chat rooms (Replace this with your API call or data source)
    const fetchChats = async () => {
      const response = await apiRequest(`/api/chat/`, 'GET');
      console.log("response in chat", response);
      setChats(response.data);  // Set the fetched chats
    };

    fetchChats();

    // Optional: Listen for new chats via socket
    socket?.on("newChat", (chat: any) => {
      setChats((prevChats) => [chat, ...prevChats]);  // Add new chat to the top of the list
    });

    return () => {
      socket?.off("newChat");
    };
  }, [socket]);

  const handleSelectChat = (chatId: string) => {
    // Navigate to the chat page for the selected chat
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex flex-col w-full h-screen mx-auto border mt-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Chats</h2>
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => handleSelectChat(chat.id)}
            className="p-4 border-b cursor-pointer hover:bg-gray-100"
          >
            <p className="font-medium">{chat.name}</p>
            <p className="text-sm text-gray-500">{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatsIndexPage;
