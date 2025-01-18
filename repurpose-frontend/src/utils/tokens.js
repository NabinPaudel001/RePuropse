// src/utils/tokens.js
export function getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  
  export function setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }
  
  export function getRefreshToken() {
    const cookies = document.cookie.split('; ');
    const refreshTokenCookie = cookies.find(row => row.startsWith('refreshToken='));
    return refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null;
  }
  
  export function setRefreshToken(token) {
    document.cookie = `refreshToken=${token}; secure; HttpOnly; path=/;`;
  }
  