"use client";

import React, { useEffect } from "react";
import { MdNotifications, MdMessage, MdExitToApp } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSocket } from "../../contexts/SocketContext";
import { logoutUser } from "../../utils/auth";
import { useNotification } from "../../contexts/NotificationContext";

const Header = () => {
  const { socket } = useSocket();
  const { notifications, unreadCount, addNotification } = useNotification();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data: { message: string; productId: string }) => {
      addNotification({
        id: Date.now(),
        name: "New Notification", // Assuming the name is static, modify as needed
        profileImg: "/profile-pic.png", // Assuming a default profile image, modify as needed
        timeNotified: new Date().toLocaleTimeString(), // Current time
        event: { message: data.message, product: data.productId }, // Assuming event has product and message fields
        notif: data.message, // Notification text
        read: false, // Mark as unread initially
      });

      console.log("ley herr",notifications);
    };

    // Listen for notifications
    socket.on("receiveNotification", handleNotification);

    // Cleanup on unmount
    return () => {
      socket.off("receiveNotification", handleNotification);
    };
  }, [socket, addNotification]);

  // console.log(notifications);

  return (
    <div className="fixed top-0 left-0 right-0 text-[hsl(var(--primary-foreground))] h-16 pl-64 pr-6 w-full shadow-md z-10">
      <div className="flex justify-end items-center h-full space-x-4">
        <button
          type="button"
          title="Messages"
          aria-label="Messages"
          className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]"
        >
          <MdMessage size={24} />
        </button>
        <Link href="/notifications">
          <button
            type="button"
            title="Notifications"
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]"
          >
            <MdNotifications size={24} />
            {unreadCount > 0 && (
              <div
                className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"
                aria-live="polite"
                aria-label={`${unreadCount} unread notifications`}
              ></div>
            )}
          </button>
        </Link>
        <Link
          href="/seller/dashboard/profile"
          className="flex items-center justify-center w-10 h-10"
          title="Profile"
          aria-label="Profile"
        >
          <Image
            src="/profile-pic.png"
            alt="Profile Picture"
            width={32}
            height={32}
            className="rounded-full"
          />
        </Link>
        <button
          type="button"
          title="Logout"
          aria-label="Logout"
          onClick={logoutUser}
          className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]"
        >
          <MdExitToApp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
