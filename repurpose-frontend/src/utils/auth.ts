import { apiRequest } from "@/middleware/errorInterceptor";
// utils/auth.ts
export const logoutUser = async () => {
  try {
    // Send API request to logout endpoint
    const response = await apiRequest("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/json", // Specify that the body is JSON
      },
    });

    if (response.success) {
      // Clear user-related data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login page
      window.location.href = "/";
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
