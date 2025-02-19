"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSlide } from "../../slices/slidingSlice";
import { apiRequest } from "@/middleware/errorInterceptor";
import { setSelectedChat, setChats } from "../../slices/chatSlice";
import { Button } from "@/components/ui/button";

const ChatButton = ({ userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);

    const handleaccesschat = async (userId) => {
      try {
        const data = await apiRequest(`/api/chat/${userId}`, {
          method: "POST",
        });
        console.log("ISSE BHI CHECK KAR ", data);
  
        if (!chats.find((c) => c._id === data._id)) {
          dispatch(setChats([data.data, ...chats]));
        }
        dispatch(setSelectedChat(data.data));
        dispatch(setSlide());

        router.push("/store/dashboard/chats");
      } catch (error) {
        console.log(error);
        console.log("Could not create access chat ");
      }
    };
  
  return (
    <Button type="submit" className="lg:w-32 h-12"
      onClick={() => {
        handleaccesschat(userId);
        console.log('Chat button clicked with userId:', userId);
      }
    }>
      Chat
    </Button>
  );
};

export default ChatButton;
