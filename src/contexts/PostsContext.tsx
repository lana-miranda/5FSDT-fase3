'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Post, SearchFilters } from '@/types';
import { postsService } from '@/services/api';

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updatePost: (id: number, post: Partial<Post>) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
  setSearchFilters: (filters: SearchFilters) => void;
  getPostById: (id: number) => Post | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

type PostsAction =
  | { type: 'FETCH_POSTS_START' }
  | { type: 'FETCH_POSTS_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_POSTS_FAILURE'; payload: string }
  | { type: 'CREATE_POST_SUCCESS'; payload: Post }
  | { type: 'UPDATE_POST_SUCCESS'; payload: Post }
  | { type: 'DELETE_POST_SUCCESS'; payload: number }
  | { type: 'SET_SEARCH_FILTERS'; payload: SearchFilters }
  | { type: 'CLEAR_ERROR' };

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
}

const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'FETCH_POSTS_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_POSTS_SUCCESS':
      return { ...state, posts: action.payload, isLoading: false, error: null };
    case 'FETCH_POSTS_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'CREATE_POST_SUCCESS':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case 'SET_SEARCH_FILTERS':
      return { ...state, searchFilters: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  searchFilters: { keyword: '' },
};

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    dispatch({ type: 'FETCH_POSTS_START' });
    try {
      const posts = await postsService.getAllPosts();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: 'Failed to fetch posts' });
    }
  };

  const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    try {
      const newPost = await postsService.createPost(postData);
      dispatch({ type: 'CREATE_POST_SUCCESS', payload: newPost });
      return true;
    } catch {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: 'Failed to create post' });
      return false;
    }
  };

  const updatePost = async (id: number, postData: Partial<Post>): Promise<boolean> => {
    try {
      const updatedPost = await postsService.updatePost(id, postData);
      dispatch({ type: 'UPDATE_POST_SUCCESS', payload: updatedPost });
      return true;
    } catch {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: 'Failed to update post' });
      return false;
    }
  };

  const deletePost = async (id: number): Promise<boolean> => {
    try {
      await postsService.deletePost(id);
      dispatch({ type: 'DELETE_POST_SUCCESS', payload: id });
      return true;
    } catch {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: 'Failed to delete post' });
      return false;
    }
  };

  const setSearchFilters = (filters: SearchFilters) => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
  };

  const getPostById = (id: number): Post | undefined => {
    return state.posts.find(post => post.id === id);
  };

  const value: PostsContextType = {
    ...state,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    setSearchFilters,
    getPostById,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
