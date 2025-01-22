import { Notification } from "@/types/types"

interface NotificationCardsProps {
  notification: Notification;
  index: number;
  handleRead: () => void;
}

const NotificationCards: React.FC<NotificationCardsProps> = ({
  notification,
  index,
  handleRead,
}) => {
  return (
    <div
      key={index}
      className={`p-4 rounded-md ${
        notification.read ? "bg-gray-200" : "bg-gray-100"
      }`}
      onClick={handleRead}
    >
      <div className="flex items-center">
        <img
          src={notification.profileImg}
          alt={notification.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">{notification.name}</p>
          <p>{notification.notif}</p>
          <span className="text-sm text-gray-500">{notification.timeNotified}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCards;
