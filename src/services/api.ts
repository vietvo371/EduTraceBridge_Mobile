import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getToken, saveToken } from "./TokenManager";

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const baseUrl = 'https://vietchain.dzfullstack.edu.vn/api';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
      'Content-Type': 'application/json',
  },
  timeout: 30000, // Increase timeout to 30 seconds
  timeoutErrorMessage: 'Request timeout - Please check your internet connection',
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log('Token:', token);
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 

// Add retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as any;
    
    // If there's no config or we've reached max retries, reject the promise
    if (!config || !config.retry || config._retry >= config.retry) {
      if (error.message.includes('timeout')) {
        return Promise.reject({
          ...error,
          message: 'Request timed out. Please check your internet connection and try again.'
        });
      }
      return Promise.reject(error);
    }

    // Increment retry count
    config._retry = config._retry || 0;
    config._retry++;

    // Create new promise with delay
    const delayRetry = new Promise((resolve) => {
      setTimeout(() => {
        resolve(api(config));
      }, config.retryDelay || 1000);
    });

    return delayRetry;
  }
);

export default api;