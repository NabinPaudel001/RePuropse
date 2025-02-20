"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdMenu,
  MdClose,
  MdList,
  MdPerson,
  MdSettings,
  MdNotifications,
  MdMessage,
  MdHome,
  MdSupportAgent
} from "react-icons/md";

const Sidebar = () => {
  // Track if component is mounted to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set mounted flag and update state from localStorage after mount
  useEffect(() => {
    setMounted(true);
    setIsSidebarOpen(localStorage.getItem("sidebarOpen") === "true");

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update localStorage and dispatch an event when sidebar state changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebarOpen", isSidebarOpen.toString());
      window.dispatchEvent(new Event("sidebarToggle"));
    }
  }, [isSidebarOpen, mounted]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Don't render until mounted to ensure client and server markup match
  if (!mounted) return null;

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${
            isSidebarOpen ? "w-64" : "w-0"
          }
          fixed top-0 left-0 h-screen bg-blue-600 text-white p-4 shadow-lg 
          flex flex-col justify-between z-30 transition-all duration-300 overflow-hidden
          ${isMobile ? "absolute" : "relative"}
          ${isSidebarOpen ? "w-64" : "hidden"}
          ${isMobile && !isSidebarOpen ? "hidden" : ""}
        `}
        onClick={closeSidebar}
      >
        {isSidebarOpen && (
          <div>
            <div className="mb-6 flex justify-center">
              <Link href="/">
                <Image src="/logo-white.png" alt="Logo" width={150} height={50} />
              </Link>
            </div>
            <div>
              <h3 className="text-white text-xs uppercase mb-4 tracking-wider">Dashboard</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/seller/dashboard/home"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdHome className="mr-3" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/profile"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdPerson className="mr-3" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/listings"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdList className="mr-3" /> My Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/notifications"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdNotifications className="mr-3" /> Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chats"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdMessage className="mr-3" /> Chats
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/settings"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
                    <MdSettings className="mr-3" /> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/report"
                    className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  >
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

export default Sidebar;
