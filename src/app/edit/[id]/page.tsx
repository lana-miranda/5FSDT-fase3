'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { postsService } from '@/services/api';
import Header from '@/components/Header';
import PostForm from '@/components/PostForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Post, PostFormData } from '@/types';

export default function EditPostPage() {
  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();
  const { updatePost } = usePosts();
  
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const fetchedPost = await postsService.getPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, router]);

  const handleSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    
    try {
      const success = await updatePost(postId, data);
      
      if (success) {
        router.push(`/posts/${postId}`);
      }
      
      return success;
    } catch (error) {
      console.error('Error updating post:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/posts/${postId}`);
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" text="Carregando post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Post Não Encontrado</h2>
                <p style={{ color: 'var(--text-muted)' }}>O post que você está tentando editar não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <>
        <Header />
        <main className="main">
          <div className="container">
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text)' }}>
                Editar Post
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Atualize seu post do blog
              </p>
            </div>

            <PostForm
              initialData={post}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        </main>
      </>
    </ProtectedRoute>
  );
}
