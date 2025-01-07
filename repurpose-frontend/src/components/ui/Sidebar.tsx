"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * A React functional component that represents the sidebar of the dashboard.
 * 
 * @returns {JSX.Element} A JSX element containing the sidebar navigation.
 */
const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6 fixed">
      <div className="mb-6">
        <Image src="/logo.png" alt="Logo" width={150} height={50} />
      </div>
      <div>
        <h3 className="text-gray-500 text-xs uppercase mb-2">Menu</h3>
        <ul className="space-y-2">
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu("Dashboard")}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Dashboard
              </span>
              <span>{openMenu === "Dashboard" ? "-" : "+"}</span>
            </button>
            {openMenu === "Dashboard" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/seller/dashboard/analytics" className="text-gray-300 hover:text-white">
                    Product Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard/notifications" className="text-gray-300 hover:text-white">
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard/messages" className="text-gray-300 hover:text-white">
                    Messages
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/seller/dashboard/listings" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> My Listings
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/profile" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Profile
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu("ManageItems")}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Manage Items
              </span>
              <span>{openMenu === "ManageItems" ? "-" : "+"}</span>
            </button>
            {openMenu === "ManageItems" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/seller/dashboard/add-items" className="text-gray-300 hover:text-white">
                    Add Items
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard/modify-items" className="text-gray-300 hover:text-white">
                    Modify Items
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/seller/dashboard/tables" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Tables
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/settings" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Settings
            </Link>
          </li>
        </ul>

        <h3 className="text-gray-500 text-xs uppercase mt-6 mb-2">Others</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/seller/dashboard/charts" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Chart
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu("Authentication")}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Sign Out
              </span>
            </button>
            {openMenu === "Authentication" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-300 hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
