'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { postsService, commentsService } from '@/services/api';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Calendar, User, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Comment } from '@/types';

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params.id);
  const { getPostById } = usePosts();
  
  const [post, setPost] = useState(getPostById(postId));
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(!post);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!post) {
        try {
          setIsLoading(true);
          const fetchedPost = await postsService.getPostById(postId);
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPost();
  }, [post, postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoadingComments(true);
        const fetchedComments = await commentsService.getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    };

    if (post) {
      fetchComments();
    }
  }, [post, postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.content.trim()) {
      return;
    }

    try {
      setIsSubmittingComment(true);
      const comment = await commentsService.createComment(postId, newComment);
      setComments(prev => [...prev, comment]);
      setNewComment({ author: '', content: '' });
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" text="Loading post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Post Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>The post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <button className="btn btn-primary">Go Back Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
        <main className="main">
          <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--primary)' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                <ArrowLeft size={16} />
                <span>Back to Posts</span>
              </div>
            </Link>
          </div>

          <div className="card" style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: 'var(--text)',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="muted">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="muted">{formatDate(post.createdAt)}</span>
                </div>
                {!post.published && (
                  <span className="badge badge-draft">
                    Draft
                  </span>
                )}
              </div>

              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text)', 
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                {post.description}
              </p>
            </div>

            <div style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              color: 'var(--text)',
              whiteSpace: 'pre-wrap'
            }}>
              {post.content}
            </div>
          </div>

          {/* Comments Section */}
          <div className="card">
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: 'var(--text)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MessageCircle size={20} />
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <label htmlFor="comment-author" className="form-label">Your Name</label>
                <input
                  id="comment-author"
                  value={newComment.author}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Enter your name"
                  disabled={isSubmittingComment}
                  className="input focus-ring"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="comment-content" className="form-label">Your Comment</label>
                <textarea
                  id="comment-content"
                  value={newComment.content}
                  onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your comment here..."
                  disabled={isSubmittingComment}
                  className="textarea focus-ring"
                  style={{ minHeight: '100px' }}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={isSubmittingComment || !newComment.author.trim() || !newComment.content.trim()}>
                {isSubmittingComment ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner" style={{ width: '16px', height: '16px' }} />
                    Posting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={16} />
                    Post Comment
                  </div>
                )}
              </button>
            </form>

            {/* Comments List */}
            {isLoadingComments ? (
              <LoadingSpinner text="Loading comments..." />
            ) : comments.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                color: 'var(--text-muted)'
              }}>
                <MessageCircle size={32} style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }} />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div 
                    key={comment.id}
                    className="card"
                    style={{
                      backgroundColor: 'var(--surface-alt)',
                    }}
                  >
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                      <strong className="title" style={{ fontSize: '0.9rem' }}>{comment.author}</strong>
                      <span className="text-sm muted">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
