import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Định nghĩa interface cho response
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Tạo instance của axios
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Thay đổi URL API của bạn
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Xử lý lỗi authentication
      localStorage.removeItem('token');
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Các hàm helper để gọi API
export const apiService = {
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 