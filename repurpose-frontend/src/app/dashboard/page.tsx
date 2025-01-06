"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6">
      <div className="mb-6">
        <Image src="/logo.png" alt="Logo" width={150} height={50} /> {/* Ensure the logo path is correct */}
      </div>
      <div>
        <h3 className="text-gray-500 text-xs uppercase mb-2">Menu</h3>
        <ul className="space-y-2">
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu('Dashboard')}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Dashboard
              </span>
              <span>{openMenu === 'Dashboard' ? '-' : '+'}</span>
            </button>
            {openMenu === 'Dashboard' && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Product Analytics</a></li>
                
                <li><a href="#" className="text-gray-300 hover:text-white">Notification</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Messages</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span>My Listings
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Profile
            </a>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu('Forms')}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Manage Items
              </span>
              <span>{openMenu === 'Forms' ? '-' : '+'}</span>
            </button>
            {openMenu === 'Forms' && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Add Items</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Modify Item</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Tables
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Settings
            </a>
          </li>
        </ul>

        <h3 className="text-gray-500 text-xs uppercase mt-6 mb-2">Others</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <span className="material-icons mr-2"></span> Chart
            </a>
          </li>
          <li>
            {openMenu === 'UI Elements' && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Buttons</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Modals</a></li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full text-gray-300 hover:text-white"
              onClick={() => toggleMenu('Authentication')}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2"></span> Sign Out
              </span>
            </button>
            {openMenu === 'Authentication' && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Login</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Register</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6 bg-gray-100">
      {/* Add dashboard content here */}
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
    </div>
  </div>
);

export default function Home() {
  return <Dashboard />;
}
