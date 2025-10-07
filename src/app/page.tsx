'use client';

import React, { useState, useMemo } from 'react';
import { usePosts } from '@/contexts/PostsContext';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const { posts, isLoading, error } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyPublished, setShowOnlyPublished] = useState(true);

  const isAdmin = user?.role === 'admin';

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    
    if (showOnlyPublished) {
      filtered = filtered.filter(post => post.published);
    }

    return filtered;
  }, [posts, searchQuery, showOnlyPublished]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" text="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Error Loading Posts</h2>
          <p style={{ color: 'var(--text-muted)' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main className="main">
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <div className="flex flex-col gap-4" style={{ marginBottom: '1rem' }}>
              <div>
                <h1 className="title" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
                  Blog Posts
                </h1>
                <p className="subtitle" style={{ marginBottom: 0 }}>
                  Discover and explore our latest content
                </p>
              </div>
              {isAdmin && <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published-only"
                    checked={showOnlyPublished}
                    onChange={(e) => setShowOnlyPublished(e.target.checked)}
                  />
                  <label htmlFor="published-only" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>
                    Published only
                  </label>
                </div>
              </div>}
            </div>
            
            {searchQuery && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="card accent-border" style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem',
            }}>
              <div className="primary-bg" style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                boxShadow: '0 4px 12px rgba(20, 93, 145, 0.2)'
              }}>
                <Search size={32} />
              </div>
              <h3 className="title" style={{ marginBottom: '0.5rem' }}>
                {searchQuery ? 'No posts found' : 'No posts available'}
              </h3>
              <p className="muted">
                {searchQuery 
                  ? 'Try adjusting your search terms or filters'
                  : 'Check back later for new content'
                }
              </p>
            </div>
          ) : (
            <div className="grid" style={{ gap: '1.5rem' }}>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
