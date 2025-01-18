// src/services/api.js
import { getAccessToken, setAccessToken, getRefreshToken } from '../utils/tokens';
import refreshAccessToken from './auth'; // Auth utility

export async function customFetch(url, options = {}) {
  const accessToken = getAccessToken();

  // Add Authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Access token expired, try refreshing
    const newTokens = await refreshAccessToken();
    if (newTokens) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newTokens.accessToken}`,
        },
      });
    }
  }

  return response.ok ? response.json() : Promise.reject(await response.json());
}
