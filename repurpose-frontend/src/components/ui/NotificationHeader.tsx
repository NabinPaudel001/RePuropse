import React from "react";
import { motion } from "framer-motion";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: (event: React.SyntheticEvent) => void; // Updated to accept SyntheticEvent
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === "Enter" && unreadCount > 0) {
      onMarkAllAsRead(e); // Pass the keyboard event safely
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center gap-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <h1 className="text-xl font-black text-gray-900">
        Notifications
        <span
          className="bg-blue-900 text-white rounded ms-2 px-3 py-1"
          aria-label={`You have ${unreadCount} unread notifications`}
        >
          {unreadCount}
        </span>
      </h1>
      <p
        onClick={unreadCount > 0 ? onMarkAllAsRead : undefined}
        className={`text-gray-500 ${
          unreadCount === 0
            ? "text-green-600 me-3"
            : "animate-bounce hover:font-semibold cursor-pointer"
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown} // Use the keyboard handler
        aria-disabled={unreadCount === 0}
      >
        {unreadCount === 0 ? "Well Done!" : "Mark all as read"}
      </p>
    </motion.div>
  );
};

export default NotificationHeader;
