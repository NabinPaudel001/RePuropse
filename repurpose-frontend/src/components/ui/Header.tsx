"use client";

import React, { useEffect, useRef } from "react";
import { MdNotifications, MdMessage, MdExitToApp } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useSocket } from "../../contexts/SocketContext";
import { logoutUser } from "../../utils/auth";
import { useNotification } from "../../contexts/NotificationContext";
import { useUser } from "@/contexts/UserContext";

const Header = () => {
  const { socket } = useSocket();
  const listenerAdded = useRef(false);
  const previousProducts = useRef(new Set<string>()); // To track existing products
  const { notifications, unreadCount, addNotification } = useNotification();
  const { user } = useUser();

  useEffect(() => {
    if (!socket || listenerAdded.current) return;

    const handleNotification = (data: { message: string; productId: string; firstName: string; lastName: string; profilePicture:string }) => {
      console.log("New productId received:", data.productId);

      // Check if the productId already exists in previousProducts
      if (previousProducts.current.has(data.productId)) {
        console.log("Duplicate productId detected, skipping:", data.productId);
        return;
      }

      // Add to previousProducts to avoid future duplicates
      previousProducts.current.add(data.productId);

      // Add new notification
      addNotification({
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        profileImg: `${data?.profilePicture || null}`,
        timeNotified: new Date().toLocaleTimeString(),
        event: { message: data.message, product: data.productId },
        notif: data.message,
        read: false,
      });
    };

    socket.on("receiveNotification", handleNotification);
    listenerAdded.current = true;

    return () => {
      socket.off("receiveNotification", handleNotification);
      listenerAdded.current = false;
    };
  }, [socket, addNotification]);

  useEffect(() => {
    console.log("Updated notifications:", notifications);
  }, [notifications]);

  return (
    <div className="fixed top-0 left-0 right-0 text-[hsl(var(--primary-foreground))] h-16 pl-64 pr-6 w-full shadow-md z-20 bg-white">
      <div className="flex justify-end items-center h-full space-x-4">
        <button
          type="button"
          title="Messages"
          aria-label="Messages"
          className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]"
        >
          <MdMessage size={24} />
        </button>
        <Link href={`/${user?.role}/dashboard/notifications`}>
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
          href={`/${user?.role}/dashboard/profile`}
          className="flex items-center justify-center w-10 h-10 bg-[hsl(var(--secondary))] rounded-full text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--primary-foreground))]"
          title="Profile"
          aria-label="Profile"
        >
          {user?.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt="Profile Picture"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <span className="text-xl font-semibold">
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
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
