"use client";

export function getAccessToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null; // Return null if accessed during SSR
}

export function setAccessToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
}

export function getRefreshToken() {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const refreshTokenCookie = cookies.find((row) =>
      row.startsWith("refreshToken=")
    );
    return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
  }
  return null; // Return null if accessed during SSR
}

export function setRefreshToken(token) {
  if (typeof document !== "undefined") {
    document.cookie = `refreshToken=${token}; secure; HttpOnly; path=/;`;
  }
}
