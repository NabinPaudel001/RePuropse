"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdList, MdPerson, MdSettings, MdBarChart, MdNotifications, MdMessage, MdAdd, MdEdit, MdHome, MdShoppingBasket } from "react-icons/md";

const Sidebar_store = () => {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="w-64 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] h-screen p-4 fixed shadow-lg flex flex-col justify-between z-30">
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
              <Link href="/store/dashboard/messages" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                <MdMessage className="mr-3" /> Messages
              </Link>
            </li>
            <li>
              <Link href="/store/dashboard/settings" className="flex items-center text-lg font-semibold hover:text-[hsl(var(--primary-foreground))] transition-colors duration-200">
                <MdSettings className="mr-3" /> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar_store;