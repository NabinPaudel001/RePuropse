"use client";
import React from "react";
import { MdNotifications, MdMessage, MdExitToApp } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";


const Header = () => {
  return (
    <div className="flex justify-end items-center bg-white text-gray-800 h-16 pl-64 pr-6 w-full shadow-md z-10">
      <div className="flex items-center space-x-4">
        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-gray-600 hover:text-blue-500">
          <MdMessage size={24} />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-gray-600 hover:text-blue-500">
          <MdNotifications size={24} />
        </button>
        <Link href="/seller/dashboard/profile" className="flex items-center justify-center w-10 h-10">
          
            <Image
              src="/profile-pic.png" // Ensure this path is correct and the image is in the public directory
              alt="Pp"
              width={32}
              height={32}
              className="rounded-full"
            />
        </Link>
        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-gray-600 hover:text-blue-500">
          <MdExitToApp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
