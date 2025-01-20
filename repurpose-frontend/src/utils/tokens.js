// src/utils/tokens.js
export function getAccessToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('accessToken');
  }
  return null; // Return null when localStorage is unavailable
}

export function setAccessToken(token) {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('accessToken', token);
  }
}

export function getRefreshToken() {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    const refreshTokenCookie = cookies.find(row => row.startsWith('refreshToken='));
    return refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null;
  }
  return null;
}

export function setRefreshToken(token) {
  if (typeof document !== 'undefined') {
    document.cookie = `refreshToken=${token}; secure; HttpOnly; path=/;`;
  }
}
