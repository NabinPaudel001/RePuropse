"use client";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 backdrop-blur border-b z-10">
      {/* Logo */}
      <div className="flex h-15">
        <a href="/">
          <img src="/head_logo.png" alt="Logo" className="w-18 h-12" />
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-10 text-gray-800 font-medium justify-center">
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Home
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Sell
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          About
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Donate
        </li>
        <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
          Contact
        </li>
      </ul>

      {/* Login and Signup Buttons */}
      <div className="hidden md:flex space-x-7 text-gray-800">
        <Button>Login</Button>
        <Button variant="outline">Join Us</Button>
        <button className="hover:text-gray-600">
          <i className="fas fa-user"></i>
        </button>
        <button className="hover:text-gray-600">
          <i className="fas fa-heart"></i>
        </button>
        <button className="hover:text-gray-600">
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>

      {/* Responsive Menu Button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <i className="fas fa-bars hover:text-gray-600"></i>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <ul className="space-y-4 text-gray-800 font-medium">
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Home
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Sell
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    About
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Donate
                  </li>
                  <li className="hover:text-primary cursor-pointer hover:underline transition duration-300">
                    Contact
                  </li>
                </ul>
                <div className="mt-4 space-y-2">
                  <Button className="w-full">Login</Button>
                  <Button className="w-full">Signup</Button>
                  <div className="flex justify-around mt-2">
                    <button className="hover:text-gray-600">
                      <i className="fas fa-user"></i>
                    </button>
                    <button className="hover:text-gray-600">
                      <i className="fas fa-search"></i>
                    </button>
                    <button className="hover:text-gray-600">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="hover:text-gray-600">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
