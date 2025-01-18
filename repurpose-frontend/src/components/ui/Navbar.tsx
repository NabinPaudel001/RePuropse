"use client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);

 

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 backdrop-blur border-b z-10">
      {/* Logo */}
      <div className="flex h-15">
        <a href="/">
          <img src="logo.png" alt="Logo" className="w-18 h-12" />
        </a>
      </div>

      {/* Cart Icon and Dialog */}
      <div className="relative">
      <div className="hidden md:flex space-x-7 text-gray-800">
        <Link href="/login">
        <Button>Login</Button>
        </Link>
        <Link href="/signup">
        <Button className="border border-primary text-primary" variant="outline">Join Us</Button>
        </Link>
        <button className="hover:text-gray-600" title="User Profile">
          <i className="fas fa-user"></i>
        </button>

      </div>
      </div>
    </nav>
  );
};

export default Navbar;