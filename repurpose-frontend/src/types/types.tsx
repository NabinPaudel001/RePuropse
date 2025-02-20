import exp from "constants";
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

export interface Store {
  _id: string;
  userID: string;
  storeName: string;
  ownerName: string;
  email: string;
  storeAddress: string;
  phoneNumber: string;
  storeNumber: string;
  storeFrontImage: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: string;
  discount: number;
  partName: string;
  materialName: string;
  ecoFriendly: string;
}
