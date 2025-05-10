import { BaseService } from './base.service';

// Define your API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Define your API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  // Add more endpoint groups as needed
};

export class ApiService extends BaseService {
  private static instance: ApiService;

  private constructor() {
    // Replace with your actual API base URL
    super(process.env.REACT_APP_API_URL || 'http://localhost:3000/api');
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Auth methods
  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<ApiResponse<{ token: string }>> {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  // User methods
  async getUserProfile(): Promise<ApiResponse<any>> {
    return this.get(API_ENDPOINTS.USER.PROFILE);
  }

  async updateUserProfile(userData: any): Promise<ApiResponse<any>> {
    return this.put(API_ENDPOINTS.USER.UPDATE, userData);
  }

  // Add more API methods as needed
} 