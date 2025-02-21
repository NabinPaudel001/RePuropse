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
  MdSupportAgent,
  MdHome,
  MdShoppingBasket,
} from "react-icons/md";

const Sidebar_store = () => {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default for desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateSidebarState = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      // On mobile, force closed; on desktop, open.
      if (mobileView) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    updateSidebarState();
    window.addEventListener("resize", updateSidebarState);
    return () => window.removeEventListener("resize", updateSidebarState);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button: Visible on mobile only */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-40 p-2 bg-[hsl(var(--primary))] text-white rounded-md shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-4 shadow-lg
          flex flex-col justify-between z-30 transition-transform duration-300 overflow-y-auto
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
            <h3 className="text-[hsl(var(--secondary-foreground))] text-xs uppercase mb-4 tracking-wider">
              Dashboard
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/store/dashboard/home"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdHome className="mr-3" /> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/profile"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdPerson className="mr-3" /> Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/listings"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdShoppingBasket className="mr-3" /> Available Items
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/my-items"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdList className="mr-3" /> My Items
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/notifications"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdNotifications className="mr-3" /> Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/chats"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdMessage className="mr-3" /> Chats
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/settings"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
                >
                  <MdSettings className="mr-3" /> Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/store/dashboard/report"
                  className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200"
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

export default Sidebar_store;
