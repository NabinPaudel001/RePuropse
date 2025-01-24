"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/contexts/SocketContext";  // Using the custom hook
import ChatBox from "@/components/ui/ChatBox";
import ChatInput from "@/components/ui/ChatInput";

const ChatPage = () => {
  const { chatId } = useParams();
  const { socket, messages, sendMessage } = useSocket();  // Using useSocket to access socket context
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Join the chat room when the page loads
    if (chatId && socket) {
      socket.emit("join-room", chatId);
    }

    // Listen for new messages from the socket
    socket?.on(
      "newMessage",
      (newMessage: { roomId: string; message: string | string[] }) => {
        if (newMessage && newMessage.roomId === chatId) {
          // Ensure newMessage is valid before calling sendMessage
          if (sendMessage) {
            // If newMessage.message is an array, we can join them into a single string
            const messageToSend = Array.isArray(newMessage.message)
              ? newMessage.message.join(" ") // Join array into a single string
              : newMessage.message;  // If it's already a string, just use it

            sendMessage(newMessage.roomId, messageToSend);  // Send message via socket context
          }
        }
      }
    );

    return () => {
      socket?.off("newMessage");
    };
  }, [chatId, socket, sendMessage]);

  const handleSendMessage = () => {
    if (message.trim() && chatId && sendMessage) {
      // Ensure message is a string before sending
      const messageToSend = Array.isArray(message) ? message.join(' ') : message.trim();  // Ensure it's a string
      sendMessage(chatId as string, messageToSend);  // Send message via socket context
      setMessage("");  // Clear the message input after sending
    }
  };
  

  return (
    <div className="flex flex-col w-full h-screen mx-auto border mt-4 rounded-lg">
      <ChatBox messages={messages?.filter((msg) => msg.roomId === chatId)?.[0]?.messages || []} />
      <ChatInput value={message} onChange={setMessage} onSend={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
