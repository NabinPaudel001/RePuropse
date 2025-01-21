"use client";

import { getAccessToken } from "../utils/tokens";
import refreshAccessToken from "./auth"; // Auth utility

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://project-repurpose-backend.onrender.com";

export async function customFetch(url, options = {}) {
  const accessToken = getAccessToken();

  // Add Authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // Prepend the base URL
  const fullUrl = `${BASE_URL}${url}`;

  try {
    // Initial fetch request
    let response = await fetch(fullUrl, { ...options, headers });

    if (response.status === 401) {
      // Access token expired, try refreshing
      const newTokens = await refreshAccessToken();
      if (newTokens) {
        // Retry the request with the new access token
        response = await fetch(fullUrl, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newTokens.accessToken}`,
          },
        });
      }
    }

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject({
        status: response.status,
        message: errorData.message || "Request failed",
      });
    }

    return await response.json(); // Parse and return JSON response
  } catch (error) {
    // Catch network errors or other unexpected errors
    console.error("Network or server error:", error.message);
    return Promise.reject({
      message:
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Please try again later."
          : error.message,
    });
  }
}
