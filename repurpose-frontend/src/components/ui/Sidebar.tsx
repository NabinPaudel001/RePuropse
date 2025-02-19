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
  MdAdd,
  MdEdit,
  MdHome,
  MdSupportAgent
} from "react-icons/md";

const Sidebar = () => {
  // Store open/closed state in localStorage
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("sidebarOpen") === "true"
      : false
  );
  // Which sub-menu is open (e.g., ManageItems)
  const [openMenu, setOpenMenu] = useState("");
  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  // Detect window size for mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update localStorage and dispatch event whenever sidebar toggles
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isSidebarOpen.toString());
    window.dispatchEvent(new Event("sidebarToggle"));
  }, [isSidebarOpen]);

  // Toggle entire sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile when clicking the sidebar area
  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Toggle sub-menu (e.g., Manage Items)
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div >
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-blue-600 text-[hsl(var(--primary-foreground))] p-4 shadow-lg 
          flex flex-col justify-between z-30 transition-all duration-300 overflow-hidden
          ${isMobile ? "absolute" : "relative"}
          ${isSidebarOpen ? "w-64" : "hidden"}
          ${isMobile && !isSidebarOpen ? "hidden" : ""}
        `}
        onClick={closeSidebar}
      >
        {/* Only render the sidebar’s content if open */}
        {isSidebarOpen && (
          <div>
            <div className="mb-6 flex justify-center">
              <Link href="/">
                <Image src="/logo-white.png" alt="Logo" width={150} height={50} />
              </Link>
            </div>
            <div>
              <h3 className="text-[hsl(var(--secondary-foreground))] text-xs uppercase mb-4 tracking-wider">
                Dashboard
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/seller/dashboard/home"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdHome className="mr-3" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/profile"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdPerson className="mr-3" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/listings"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdList className="mr-3" /> My Listings
                  </Link>
                </li>

                {/* Manage Items sub-menu */}
                <li>
                  <button
                    className="flex items-center justify-between w-full text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                    onClick={(e) => {
                      // Prevent the sidebar from closing when clicking the button
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
                          className="flex items-center hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                        >
                          <MdAdd className="mr-2" /> Add Items
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/seller/dashboard/modify-items"
                          className="flex items-center hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
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
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdNotifications className="mr-3" /> Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chats"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdMessage className="mr-3" /> Chats
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/settings"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                  >
                    <MdSettings className="mr-3" /> Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/dashboard/report"
                    className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
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
