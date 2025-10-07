'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { PostFormData } from '@/types';

export default function CreatePostPage() {
  const { createPost } = usePosts();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    
    try {
      const success = await createPost({
        ...data,
        author: user?.username || data.author,
      });
      
      if (success) {
        router.push('/');
      }
      
      return success;
    } catch (error) {
      console.error('Error creating post:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="main">
          <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text)' }}>
              Criar Novo Post
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Escreva e publique um novo post do blog
            </p>
          </div>

            <PostForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
}
