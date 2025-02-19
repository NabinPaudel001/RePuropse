"use client"; // Ensure this is a Client Component

import { Provider } from "react-redux";
import { store } from "@/store/store"; // Correct import path

export default function Providers({ children }) {
  if (!store) {
    console.error("Redux store is not initialized.");
    return children;
  }

  return <Provider store={store}>{children}</Provider>;
}
