const VITE_API_URL = import.meta.env.VITE_API_URL;

// Helper function to get access token
const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Refresh token function
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch(`${VITE_API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
      credentials: 'include',
    });

    if (!response.ok) {
      // Refresh token is invalid, clear storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      throw new Error('Failed to refresh token');
    }

    const result = await response.json();

    if (result.access) {
      localStorage.setItem('access_token', result.access);
    }

    return result.access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

// Setup automatic token refresh
let refreshInterval: any = null;
let isRefreshing = false;

export const startTokenRefresh = () => {
  // Clear any existing interval
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }

  // Refresh token every 4 minutes (adjust based on token expiry, e.g., 5 minutes)
  refreshInterval = setInterval(async () => {
    if (isRefreshing) return; // Prevent concurrent refreshes
    isRefreshing = true;

    try {
      const token = getAccessToken();
      if (token) {
        await refreshAccessToken();
        console.log('Token refreshed successfully');
      }
    } catch (error) {
      console.error('Auto token refresh failed:', error);
      stopTokenRefresh();
      // Notify the app to handle logout or redirect (avoid direct window.location.href)
      window.dispatchEvent(new CustomEvent('tokenRefreshFailed'));
    } finally {
      isRefreshing = false;
    }
  }, 4 * 60 * 1000); // 4 minutes in milliseconds
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

// Enhanced fetch wrapper with automatic token refresh on 401
const fetchWithTokenRefresh = async (url: any, options: any) => {
  let response = await fetch(url, options);

  // If we get 401, try to refresh token and retry
  if (response.status === 401) {
    if (isRefreshing) {
      // Wait for ongoing refresh to complete
      await new Promise((resolve) => {
        const checkRefresh = setInterval(() => {
          if (!isRefreshing) {
            clearInterval(checkRefresh);
            resolve(null);
          }
        }, 100);
      });
    } else {
      try {
        isRefreshing = true;
        await refreshAccessToken();
      } catch (error) {
        // Refresh failed, clear tokens and notify app
        stopTokenRefresh();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('tokenRefreshFailed'));
        throw error;
      } finally {
        isRefreshing = false;
      }
    }

    // Retry the original request with new token
    const newHeaders = getAuthHeaders();
    response = await fetch(url, {
      ...options,
      headers: { ...options.headers, ...newHeaders },
    });
  }

  return response;
};

export const api = {
  auth: {
    user: async () => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/auth/user/`, {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to get user data');
      return response.json();
    },
    register: async (data: any) => {
      const response = await fetch(`${VITE_API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include"
      });
      const result = await response.json().catch(() => null); // safely parse JSON  
      if (!response.ok) {
        const errorMessage =
          result?.detail || result?.error || JSON.stringify(result) || 'Failed to register new user';
        throw new Error(errorMessage);
      }
      return response.ok;
    },
    login: async (data: any) => {
      const response = await fetch(`${VITE_API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to login');
      const result = await response.json();

      // Store tokens in localStorage
      if (result.access) {
        localStorage.setItem('access_token', result.access);
        if (result.refresh) {
          localStorage.setItem('refresh_token', result.refresh);
        }

        // Start automatic token refresh
        startTokenRefresh();
      }

      return result;
    },
    logout: async () => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/auth/logout/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          refresh: getRefreshToken()
        }),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to logout user');

      // Stop token refresh and clear tokens
      stopTokenRefresh();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      return response.ok;
    }
  },
  activities: {
    list: async () => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/api/activities/list/`, {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to list activities');
      return response.json();
    },
    create: async (data: any) => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/api/activities/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to create activity');
      return response.json();
    },
    update: async (id: any, data: any) => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/api/activities/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to update activity');
      return response.json();
    },
    delete: async (id: any) => {
      const response = await fetchWithTokenRefresh(`${VITE_API_URL}/api/activities/${id}/delete/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) throw new Error('Failed to delete activity');
      return response.ok;
    },
  }
};