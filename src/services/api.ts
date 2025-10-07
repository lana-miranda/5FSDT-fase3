import { Post, User, LoginCredentials, Comment } from '@/types';
const BASE = '/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const res = await fetch(`${BASE}/auth`, { method: 'POST', body: JSON.stringify(credentials) });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async getCurrentUser(token: string): Promise<User> {
    const res = await fetch(`${BASE}/auth`, { headers: { Authorization: token } });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  async logout(): Promise<void> {
    return;
  },
};

export const postsService = {
  async getAllPosts(): Promise<Post[]> {
    const res = await fetch(`${BASE}/posts`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load posts');
    return res.json();
  },

  async getPostById(id: number): Promise<Post> {
    const res = await fetch(`${BASE}/posts/${id}`);
    if (!res.ok) throw new Error('Post not found');
    return res.json();
  },

  async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    const res = await fetch(`${BASE}/posts`, { method: 'POST', body: JSON.stringify(postData) });
    if (!res.ok) throw new Error('Failed to create post');
    return res.json();
  },

  async updatePost(id: number, postData: Partial<Post>): Promise<Post> {
    const res = await fetch(`${BASE}/posts/${id}`, { method: 'PATCH', body: JSON.stringify(postData) });
    if (!res.ok) throw new Error('Failed to update post');
    return res.json();
  },

  async deletePost(id: number): Promise<void> {
    const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete post');
  },

  async searchPosts(filters: { keyword: string; author?: string; published?: boolean }): Promise<Post[]> {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.author) params.set('author', filters.author);
    if (filters.published !== undefined) params.set('published', String(filters.published));
    const res = await fetch(`${BASE}/posts?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to search posts');
    return res.json();
  },
};

export const commentsService = {
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const res = await fetch(`${BASE}/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Failed to load comments');
    return res.json();
  },

  async createComment(postId: number, commentData: { author: string; content: string }): Promise<Comment> {
    const res = await fetch(`${BASE}/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(commentData) });
    if (!res.ok) throw new Error('Failed to create comment');
    return res.json();
  },

  async deleteComment(commentId: number): Promise<void> {
    const res = await fetch(`${BASE}/comments/${commentId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete comment');
  },
};
