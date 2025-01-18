import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 backdrop-blur border-b z-10">
      <div className="flex h-15">
        <a href="/">
          <img src="logo.png" alt="Logo" className="w-18 h-12" />
        </a>
      </div>
      <div className="relative">
        <div className="hidden md:flex space-x-7 text-gray-800">
          <Button onClick={onLoginClick}>Login</Button>
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
