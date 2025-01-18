"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdList, MdPerson, MdSettings, MdBarChart, MdNotifications, MdMessage, MdAdd, MdEdit, MdHome } from "react-icons/md";

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
    <div className="w-64 bg-white text-gray-800 h-screen p-6 fixed shadow-lg">
      <div className="mb-6 flex justify-center">
        <Image src="/logo.png" alt="Logo" width={150} height={50} />
      </div>
      <div>
        <h3 className="text-gray-500 text-xs uppercase mb-2">Dashboard</h3>
        <ul className="space-y-2">
        <li>
            <Link href="/seller/dashboard/home" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/profile" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdPerson className="mr-2" /> Profile
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/listings" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdList className="mr-2" /> My Listings
            </Link>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-600 hover:text-blue-500"
              onClick={() => toggleMenu("ManageItems")}
            >
              <span className="flex items-center">
                <MdEdit className="mr-2" /> Manage Items
              </span>
              <span>{openMenu === "ManageItems" ? "-" : "+"}</span>
            </button>
            {openMenu === "ManageItems" && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/seller/dashboard/add-items" className="flex items-center text-gray-600 hover:text-blue-500">
                    <MdAdd className="mr-2" /> Add Items
                  </Link>
                </li>
                <li>
                  <Link href="/seller/dashboard/modify-items" className="flex items-center text-gray-600 hover:text-blue-500">
                    <MdEdit className="mr-2" /> Modify Items
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/seller/dashboard/notifications" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdNotifications className="mr-2" /> Notifications
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/messages" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdMessage className="mr-2" /> Messages
            </Link>
          </li>
          <li>
            <Link href="/seller/dashboard/settings" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdSettings className="mr-2" /> Settings
            </Link>
          </li>
        </ul>

        <h3 className="text-gray-500 text-xs uppercase mt-6 mb-2">Others</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/seller/dashboard/analytics" className="flex items-center text-gray-600 hover:text-blue-500">
              <MdBarChart className="mr-2" /> Product Analytics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
