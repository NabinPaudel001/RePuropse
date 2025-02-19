"use client";
import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSlide } from "../../slices/slidingSlice";
import { apiRequest } from "@/middleware/errorInterceptor";
// import apiConnector from "../../services/apiconnector"
import { setSelectedChat, setChats } from "../../slices/chatSlice";

const Slidingdrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);

  const handleaccesschat = async (userId) => {
    try {

      console.log("user id", userId);

      // Use the apiConnector for the API call
      // const data = await apiRequest(
      //   "POST",
      //   `http://localhost:5000/api/chat`,
      //   { userId }, // No body data for GET request
      //   headers, // Pass headers correctly
      //   { search } // Use query params
      // );
      const data = await apiRequest(`/api/chat/${userId}`, {
        method: "POST",
        // body: { userId },
      });
      console.log("ISSE BHI CHECK KAR ", data);

      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data.data, ...chats]));
      }
      dispatch(setSelectedChat(data.data));
      dispatch(setSlide());
    } catch (error) {
      console.log(error);
      console.log("Could not create access chat ");
    }
  };

  const handlesearch = async (e) => {
    try {

      // Use the apiConnector for the API call
      const data = await apiRequest(`/api/user?search=${search}`, {
        method: "GET",
        // query: { search },
      });
      console.log("yo data herta yak choti", data);

      setSearchresult(data.data);
    } catch (error) {
      console.log(error);
      console.log("Could not fetch all user");
    }
  };

  console.log("SEarch result ma ho hai yo", searchResult);

  useEffect(() => {}, [handleaccesschat]);

  return (
    <div className="w-[300px] h-screen flex flex-col px-4 py-2 gap-y-3 items-center bg-blue-400">
      <div
        className="w-full flex justify-end"
        onClick={() => dispatch(setSlide())}
      >
        <IoCloseSharp fontSize="40px" color="white" />
      </div>
      <div className="flex gap-2 items-center w-full justify-between">
        <input
          type="text"
          value={search}
          placeholder="Search Person"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md w-[80%]"
        />

        <div onClick={handlesearch}>
          <MdOutlineSearch fontSize="40px" color="white" />
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-1">
        {searchResult.length > 0 ? (
          searchResult.map((user, index) => (
            <div
              key={index}
              onClick={() => handleaccesschat(user._id)}
              className="bg-white rounded-md p-2 w-[70%] cursor-pointer hover:bg-green-400 hover:text-white"
            >
              {user.firstName} {user.lastName}
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Slidingdrawer;
