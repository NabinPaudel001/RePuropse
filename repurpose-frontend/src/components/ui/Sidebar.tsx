"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdMenu,
  MdClose,
  MdList,
  MdEdit,
  MdPerson,
  MdSettings,
  MdNotifications,
  MdMessage,
  MdAdd,
  MdHome,
  MdSupportAgent,
} from "react-icons/md";

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default open for desktop
  const [isMobile, setIsMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState("");

  useEffect(() => {
    setMounted(true);

    // Function to update mobile/desktop state and set sidebar default accordingly.
    const updateSidebarState = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsSidebarOpen(false); // mobile: closed
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true); // desktop: open
      }
    };

    // Set initial state
    updateSidebarState();

    // Listen to resize events
    window.addEventListener("resize", updateSidebarState);
    return () => window.removeEventListener("resize", updateSidebarState);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button (visible only on mobile) */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-blue-600 text-white p-4 shadow-lg
          flex flex-col justify-between z-30 transition-transform duration-300
          overflow-y-auto 
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        `}
      >
        <div>
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Link href="/">
              <Image src="/logo-white.png" alt="Logo" width={150} height={50} />
            </Link>
          </div>

          {/* Navigation Items */}
          <div>
            <h3 className="text-white text-xs uppercase mb-4 tracking-wider">
              Dashboard
            </h3>
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
                <button
                  className="flex items-center justify-between w-full text-lg font-semibold hover:text-gray-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu("ManageItems");
                  }}
                >
                  <span className="flex items-center">
                    <MdEdit className="mr-3" /> Manage Items
                  </span>
                  <span>{openMenu === "ManageItems" ? "-" : "+"}</span>
                </button>
                {openMenu === "ManageItems" && (
                  <ul className="ml-6 mt-2 space-y-2 text-base">
                    <li>
                      <Link
                        href="/seller/dashboard/add-items"
                        className="flex items-center hover:text-gray-200 transition-colors duration-200"
                      >
                        <MdAdd className="mr-2" /> Add Items
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/seller/dashboard/modify-items"
                        className="flex items-center hover:text-gray-200 transition-colors duration-200"
                      >
                        <MdEdit className="mr-2" /> Modify Items
                      </Link>
                    </li>
                  </ul>
                )}
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
                  href="/seller/dashboard/chats"
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
      </div>
    </>
  );
};

export default Sidebar;
