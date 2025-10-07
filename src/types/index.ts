export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface PostFormData {
  title: string;
  content: string;
  author: string;
  description: string;
  published: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SearchFilters {
  keyword: string;
  author?: string;
  published?: boolean;
}
