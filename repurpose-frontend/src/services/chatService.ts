// import axios from 'axios';
import { apiRequest } from "@/middleware/errorInterceptor";

const chatService = {
  getMessages: async (chatId: string) => {
    const { data } = await apiRequest(`/api/chat/${chatId}`, 'GET');
    return data.messages;
  },

  sendMessage: async (message: any) => {
      await apiRequest(`/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message)
    });
  },
};

export default chatService;