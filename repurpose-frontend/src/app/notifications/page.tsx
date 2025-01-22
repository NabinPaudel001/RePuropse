"use client";

import { useNotification } from "@/contexts/NotificationContext";
import NotificationCards from "@/components/ui/NotificationCards";
import NotificationHeader from "@/components/ui/NotificationHeader";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotification();

  return (
    <main className="flex w-full h-full justify-center bg-gray-100 md:py-8">
      <div className="bg-white w-full max-w-[650px] min-h-screen mx-auto md:rounded-xl p-4">
        <NotificationHeader unreadCount={unreadCount} onMarkAllAsRead={markAllAsRead} />

        <div className="w-full h-full py-5 space-y-4 lg:space-y-2">
          {notifications.map((notification, index) => (
            <NotificationCards
              key={notification.id}
              index={index}
              notification={notification}
              handleRead={() => markAsRead(notification.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
