import { StaticImageData } from "next/image";

export interface Event {
  post?: string;
  group?: string;
  message?: string;
  photo?: StaticImageData;
  product?: string;
}

export interface Notification {
  id: number;
  name: string;
  profileImg: string;
  timeNotified: string;
  event: Event;
  notif: string;
  read: boolean;
}
