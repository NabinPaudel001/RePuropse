"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setSelectedChat } from "../../slices/chatSlice";
import { getSender } from "../../services/getSender";
// import apiConnector from '../../services/apiconnector';
import { apiRequest } from "@/middleware/errorInterceptor";
import { useUser } from "@/contexts/UserContext";

const People = ({ fetchchatsagain }) => {
  const { chats, selectedChat } = useSelector((state) => state.chat);
  const token = useSelector((state) => state.user.token);
  // const user = useSelector((state) => state.user.user);
  const { user, setUser } = useUser();
  const dispatch = useDispatch();
  console.log("Redux value", chats);
  console.log("Redux value selected", selectedChat);

  const fetchChat = async () => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${token}`, // Ensure token is valid and not expired
      // };

      // // Use the apiConnector for the API call
      const data = await apiRequest(`/api/chat`, "GET");

      console.log("checking gari haal hai yesma ni", data.data);

      dispatch(setChats(data.data));
    } catch (error) {
      console.log(error);
      console.log("Could not find all chat ");
    }
  };

  useEffect(() => {
    fetchChat();
  }, [dispatch, fetchchatsagain]);
  console.log("Redux value of chats herr hai", chats);

  return (
    <div className="h-[100%] w-full flex flex-col items-center bg-white rounded-2xl shadow-md shadow-blue-300 overflow-y-scroll no-scrollbar py-2">
      {chats.length > 0 ? (
        chats.map((chat, index) => {
          return (
            <div
              key={index}
              className={`w-full flex items-center h-min-[70px] hover:bg-violet-700 hover:rounded-md hover:text-white  border-b-2 cursor-pointer transition-colors  duration-100 ease-in-out  p-2 ${
                selectedChat == chat ? " bg-gray-300 text-white rounded-md" : ""
              }`}
              onClick={(e) => dispatch(setSelectedChat(chat))}
            >
              {/* {!chat.isGroupChat ? ( */}
              {chat?.users[0]._id === user?.id ? (
                <div className="flex items-center gap-x-5 max-lg:gap-x-3">
                  <div className="w-[40px] h-[40px] max-lg:w-[35px] max-lg:h-[35px] rounded-full">
                    <img
                      src={chat?.users[1]?.profilePicture}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg max-lg:text-base font-semibold px-3 md:">
                      {chat.users[1]?.firstName} {chat.users[1]?.lastName}
                    </div>
                    <div className="text-sm max-lg:text-xs text-gray-600 overflow-hidden px-3 mb-2 md:px-3">
                      {chat?.latestMessage?.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-x-5 max-lg:gap-x-3">
                  <div className="w-[40px] h-[40px] max-lg:w-[35px] max-lg:h-[35px] rounded-full">
                    <img
                      src={chat?.users[0]?.profilePicture}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-lg max-lg:text-base font-semibold">
                      {chat?.users[0]?.firstName} {chat?.users[0]?.lastName}
                    </div>
                    <div className="text-sm max-lg:text-xs text-gray-600">
                      {chat?.latestMessage?.content}
                    </div>
                  </div>
                </div>
              )}
              {/* // ) : ( */}
              {/* //   <div className="flex items-center gap-x-5 max-lg:gap-x-3"> */}
              {/* //     <div className="w-[40px] h-[40px] max-lg:w-[35px] max-lg:h-[35px] rounded-full"> */}
              {/* //       <img */}
              {/* //         src={`https://ui-avatars.com/api/?name=G`}
              //         className="w-full h-full rounded-full object-cover"
              //       />
              //     </div> */}
              {/* //     <div className="flex flex-col ">
              //       <div className="text-lg max-lg:text-base font-semibold">
              //         {chat.chatName}
              //       </div>
              //       <div className="text-sm max-lg:text-xs text-gray-600">
              //         {chat?.latestMessage?.content}
              //       </div>
              //     </div>
              //   </div> */}
              {/* // )} */}
            </div>
          );
        })
      ) : (
        <div className="text-xl font-semibold text-gray-600">No Chats Yet</div>
      )}
    </div>
  );
};

export default People;
