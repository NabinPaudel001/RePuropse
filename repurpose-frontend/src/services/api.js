"use client";

import { getAccessToken } from "../utils/tokens";
import refreshAccessToken from "./auth"; // Auth utility

const BASE_URL =  "http://localhost:5000"
// const BASE_URL = "https://project-repurpose-backend.onrender.com";

export async function customFetch(url, options = {}) {
  const accessToken = getAccessToken();

  // Add Authorization and default Content-Type headers
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const fullUrl = `${BASE_URL}${url}`;

  try {
    // Make the initial API request
    let response = await fetch(fullUrl, { ...options, headers });

    if (response.status === 401) {
      console.warn("Access token expired. Attempting to refresh token...");
      const newTokens = await refreshAccessToken();

      if (newTokens) {
        // Retry the request with the refreshed token
        response = await fetch(fullUrl, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${newTokens.accessToken}`,
          },
        });
      } else {
        throw new Error("Token refresh failed. Please log in again.");
      }
    }

    // Handle non-successful responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Fallback for non-JSON responses
      throw {
        status: response.status,
        message: errorData?.message || "An error occurred while processing the request.",
        data: errorData,
      };
    }

    // Return the successful response as JSON
    return await response.json();
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    console.error("CustomFetch Error:", error);

    const defaultMessage = "A network or server error occurred. Please try again later.";
    throw {
      status: error?.status || "unknown",
      message: error?.message || defaultMessage,
      data: error?.data || null,
    };
  }
}
