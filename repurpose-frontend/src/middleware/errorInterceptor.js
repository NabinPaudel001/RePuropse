// src/middleware/errorInterceptor.js
import { customFetch } from '../services/api';

export async function apiRequest(url, options) {
  try {
    return await customFetch(url, options);
  } catch (error) {
    if (error.status === 401) {
      console.error('Unauthorized, please log in again.');
      // Redirect to login if refresh fails
    } else {
      console.error('API Error:', error);
    }
    throw error;
  }
}
