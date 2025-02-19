"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMenu, MdClose, MdList, MdPerson, MdSettings, MdNotifications, MdMessage, MdSupportAgent, MdHome, MdShoppingBasket } from "react-icons/md";

const Sidebar_store = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-40 p-2 bg-[hsl(var(--primary))] text-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] h-screen p-4 fixed shadow-lg flex flex-col justify-between z-30 transition-all duration-300 overflow-hidden`}
      >
        {isSidebarOpen && (
          <div>
            <div className="mb-6 flex justify-center">
              <Image src="/logo-white.png" alt="Logo" width={150} height={50} />
            </div>
            <div>
              <h3 className="text-[hsl(var(--secondary-foreground))] text-xs uppercase mb-4 tracking-wider">Dashboard</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/store/dashboard/home" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdHome className="mr-3" /> Home
                  </Link>
                </li>
                <li>
                  <Link href="/store/dashboard/profile" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdPerson className="mr-3" /> Profile
                  </Link>
                </li>
                <li>
                  <Link href="/store/dashboard/listings" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdShoppingBasket className="mr-3" /> Available Items
                  </Link>
                </li>
                <li>
                  <Link href="/store/dashboard/my-items" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdList className="mr-3" /> My Items
                  </Link>
                </li>
                <li>
                  <Link href="/store/dashboard/notifications" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdNotifications className="mr-3" /> Notifications
                  </Link>
                </li>
                <li>
                  <Link href="/chats" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdMessage className="mr-3" /> Chats
                  </Link>
                </li>
                <li>
                  <Link href="/store/dashboard/settings" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdSettings className="mr-3" /> Settings
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard/report" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                    <MdSupportAgent className="mr-3" /> Report
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar_store;
