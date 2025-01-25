// src/services/auth.js
import { setAccessToken, setRefreshToken, getRefreshToken } from '../utils/tokens';

export default async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { accessToken, refreshToken: newRefreshToken } = await response.json();

      // Update tokens
      setAccessToken(accessToken);
      setRefreshToken(newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
  } catch (error) {
    console.log('Failed to refresh access token:', error);
  }

  return null;
}
