import React from "react";
import { MdNotifications, MdMessage, MdExitToApp } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] h-16 pl-64 pr-6 w-full shadow-md z-10">
      <div className="flex justify-end items-center h-full space-x-4">
        <button className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]">
          <MdMessage size={24} />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]">
          <MdNotifications size={24} />
        </button>
        <Link href="/seller/dashboard/profile" className="flex items-center justify-center w-10 h-10">
          <Image
            src="/profile-pic.png" // Ensure this path is correct and the image is in the public directory
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
        <button className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]">
          <MdExitToApp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
